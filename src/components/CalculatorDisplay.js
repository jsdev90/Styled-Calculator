import PropTypes from "prop-types"

import { MAX_LENGTH } from '../constants'

export default function CalculatorDisplay (props) {
  const { value } = props
  
  const language = navigator.language || 'en-US'
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  })
  
  // Add back missing .0 in e.g. 12.0
  const match = value.match(/\.\d*?(0*)$/)
  
  if (match)
    formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]

  if (value.length > MAX_LENGTH + 1)
    formattedValue = `${String(value)[0]}.${String(value).slice(1, MAX_LENGTH-1)}e${String(value).length}`
    
  return (
    <div className="calculator-display">
      {formattedValue}
    </div>
  )
}

CalculatorDisplay.propTypes = {
  value: PropTypes.string,
}
