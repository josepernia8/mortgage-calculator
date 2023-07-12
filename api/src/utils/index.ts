import Joi, { ErrorReport } from "joi";
import { MortgageInput } from "../types";
import { PaymentFrequency } from "../types/mortgage";

function validateAmortizationPeriodRange(value: number, helpers: Joi.CustomHelpers): number | ErrorReport {
  if (value < 5 || value > 30 || (value - 5) % 5 !== 0) {
    return helpers.error('number.amortizationPeriod');
  }

  return value;
}

const mortgageInputSchema = Joi.object<MortgageInput>({
  propertyPrice: Joi
    .number()
    .positive()
    .required()
    .messages({
      'number.base': 'Property price must be a number.',
      'number.positive': 'Property price must be a positive number.',
    }),
  downPayment: Joi
    .number()
    .positive()
    .less(Joi.ref('propertyPrice'))
    .required()
    .messages({
      'number.base': 'Down payment must be a number.',
      'number.positive': 'Down payment must be a positive number.',
      'number.less': 'Down payment cannot be greater than the property price.',
      'any.required': 'Down payment is required.',
    }),
  annualInterestRate: Joi
    .number()
    .positive()
    .less(20)
    .required()
    .messages({
      'number.base': 'Annual interest rate  must be a number.',
      'number.positive': 'Annual interest rate must be a positive number.',
      'number.less': 'Annual interest rate cannot be greater than 20%.',
      'any.required': 'Annual interest rate is required.',
    }),
  amortizationPeriod: Joi
    .number()
    .positive()
    .custom(validateAmortizationPeriodRange)
    .required()
    .messages({
      'number.base': 'Amortization period must be a number.',
      'number.positive': 'Amortization period must be a positive number.',
      'number.amortizationPeriod': 'Amortization period must be in 5-year increments between 5 and 30.',
      'any.required': 'Amortization period is required.',
    }),
  paymentFrequency: Joi
    .string()
    .valid(...Object.values(PaymentFrequency))
    .required()
    .messages({
      'any.only': 'Payment frequency must be one of: "accelerated bi-weekly", "bi-weekly", or "monthly".',
      'any.required': 'Payment frequency is required.',
    }),
})


export default (input: MortgageInput): Joi.ValidationResult<MortgageInput> => mortgageInputSchema.validate(input)
