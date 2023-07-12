import express from 'express'
import cors from 'cors'
import { mortgageRouter } from './routes'

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:4000' }))

app.use('/mortgage', mortgageRouter)

app.listen(PORT, () => {
  console.log(`⚡️Server is running on port ${PORT}`)
})
