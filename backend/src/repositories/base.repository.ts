import { PgTable, PgColumn } from 'drizzle-orm/pg-core';
import { eq, InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { db } from '@config';

/**
 * Abstract base repository providing common CRUD operations for Drizzle ORM.
 * @template TSchema The Drizzle ORM schema table type.
 * @template TSelect The inferred select model type for the entity.
 * @template TInsert The inferred insert model type for the entity.
 */
abstract class BaseRepository<
    TSchema extends PgTable,
    TSelect extends InferSelectModel<TSchema>,
    TInsert extends InferInsertModel<TSchema>
> {
    protected table: TSchema;
    protected idColumn: PgColumn;

    constructor(table: TSchema, idColumn: PgColumn) {
        this.table = table;
        this.idColumn = idColumn;
    }

    /**
     * Retrieves an entity by its ID.
     * @param id The ID of the entity to retrieve.
     * @returns The retrieved entity or undefined if not found.
     */
    public async getById(id: string): Promise<TSelect[]> {
        const me = this;

        try {

            const result = await db
                .select()
                .from(me.table as PgTable)
                .where(eq(me.idColumn, id))

            return result as TSelect[];
        } catch (error) {
            console.error(`Error getting entity by ID ${id} from table ${me.table._.name}:`, error);
            throw error;
        }
    }

    /**
     * Retrieves all entities from the table.
     * @returns An array of all entities.
     */
    public async getAll(): Promise<TSelect[]> {
        const me = this;

        try {
            return await db.select().from(me.table as PgTable) as TSelect[];
        } catch (error) {
            console.error(`Error getting all entities from table ${me.table._.name}:`, error);
            throw error;
        }
    }

    /**
     * Creates a new entity.
     * @param data The data for the new entity.
     * @returns The created entity.
     */
    public async create(data: TInsert): Promise<TSelect | undefined> {
        const me = this;

        try {
            const result = await db.insert(me.table).values(data).returning();
            return result ? result[0] as TSelect : undefined;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Updates an existing entity by its ID.
     * @param id The ID of the entity to update.
     * @param data The data to update the entity with.
     * @returns The updated entity or undefined if not found.
     */
    public async update(id: string, data: Partial<TInsert>): Promise<TSelect | undefined> {
        const me = this;

        try {
            const result = await db
                .update(me.table)
                .set(data)
                .where(eq(me.idColumn, id))
                .returning();

            // Use Array.isArray() to ensure safe access
            return Array.isArray(result) && result.length > 0 ? result[0] as TSelect : undefined;
        } catch (error) {
            console.error(
                `Error updating entity with ID ${id} in table ${me.table._.name}:`,
                error
            );
            throw error;
        }
    }

    /**
     * Deletes an entity by its ID.
     * @param id The ID of the entity to delete.
     * @returns The deleted entity or undefined if not found.
     */
    public async delete(id: string): Promise<TSelect | undefined> {
        const me = this;

        try {
            const result = await db
                .delete(me.table)
                .where(eq(me.idColumn, id))
                .returning();

            return Array.isArray(result) && result.length > 0 ? result[0] as TSelect : undefined;
        } catch (error) {
            console.error(`Error deleting entity with ID ${id} from table ${me.table._.name}:`, error);
            throw error;
        }
    }
}

export default BaseRepository;