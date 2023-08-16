import app from './app.js';
import { connectDB } from './db/mongoose.js';
import { PORT } from './config.js';

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
