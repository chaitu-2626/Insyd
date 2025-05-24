// server.ts
import app from './app';
import { env } from '@config';

const PORT = env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
