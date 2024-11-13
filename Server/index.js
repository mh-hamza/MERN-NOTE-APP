import express from 'express';
import connectToMongoDB from './db/connection.js'
import dotenv from 'dotenv';
import cors from 'cors'

// rotes
import authRouter from "./routes/auth.js"
import noteRouter from "./routes/note.js"

const app = express();
dotenv.config();
app.use(cors());

// envirement variable
const PORT = process.env.PORT



connectToMongoDB()
app.use(express.json())


app.get('/', (req, res) => {
  res.send("Welcome")
})

app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter)


app.listen(PORT, () => {
  connectToMongoDB()
  console.log("Server is running on port" + PORT);
})