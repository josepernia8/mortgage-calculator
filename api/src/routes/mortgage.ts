import express, { Request, Response } from 'express'
import { MortgageInput } from '../types'
import { calculatePayment } from '../services'
import validateInput from "../utils"

const mortgageRouter = express.Router()

mortgageRouter.post('/', (req: Request, res: Response) => {
  try {
    const input: MortgageInput = req.body
    const { error } = validateInput(input)

    if (error) {
      res.status(400).json({ error: error.message })
    }

    // Extra validation that I couldn't figure out how to do with Joi
    if (input.downPayment < input.propertyPrice * 0.05) {
      res.status(400).json({ error: 'Down payment has to be at least 5% of the property price.' })
    }

    const mortgageOutput = calculatePayment(input)

    res.json(mortgageOutput)

  } catch (error: unknown) {
    const errorMessage = (error as Error).message

    res.status(400).json({ error: errorMessage })
  }
})

export default mortgageRouter
