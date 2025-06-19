import express from 'express';
import cors from 'cors';
import sendEmailRouter from '../routes/sendEmailRoute';

const app = express(); // ✅ Move this to the top
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', sendEmailRouter); // ✅ Now it's after 'app' is declared

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
