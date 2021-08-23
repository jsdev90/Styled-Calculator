import { useState, useEffect, useCallback } from 'react'

import CalculatorDisplay from './CalculatorDisplay'

import { MAX_LENGTH } from '../constants'

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

const ZERO = '0'
const KEYS = {
  DOT: '.',
  PERCENT: '%',
  BACKSPACE: 'Backspace',
  CLEAR: 'Clear'
}

const DIGIT_KEYS = ['0', '●', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const OPERATORS = ['÷', '*', '+', '-', '=']

function Calculator() {
  const [value, setValue] = useState(null)
  const [displayValue, setDisplayValue] = useState(ZERO)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const clearAll = useCallback(() => {
    setValue(null)
    setDisplayValue(ZERO)
    setOperator(null)
    setWaitingForOperand(false)
  }, [])

  const clearDisplay = useCallback(() => {
    setDisplayValue(ZERO)
  }, [])
  
  const clearLastChar = useCallback(() => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || ZERO)
  }, [displayValue])
  
  const toggleSign = useCallback(() => {
    const newValue = parseFloat(displayValue) * -1
    setDisplayValue(String(newValue))
  }, [displayValue])
  
  const inputPercent = useCallback(() => {
    const currentValue = parseFloat(displayValue)
    if (currentValue === 0) return
    
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100

    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)))
  }, [displayValue])
  
  const inputDot = useCallback(() => {
    if (!(/\./).test(displayValue)) {
      setDisplayValue(displayValue + '.')
      setWaitingForOperand(false)
    }
  }, [displayValue])
  
  const inputDigit = useCallback((digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit))
      setWaitingForOperand(false)
    } else {
      if (displayValue.length > MAX_LENGTH) return
      setDisplayValue(displayValue === ZERO ? String(digit) : `${displayValue}${digit}`)
    }
  }, [displayValue, waitingForOperand])
  
  const performOperation = useCallback((nextOperator) => {
    const inputValue = parseFloat(displayValue)
    
    if (value == null) {
      setValue(inputValue)
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
      setValue(newValue)
      setDisplayValue(String(newValue))
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }, [displayValue, operator, value])
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault()
      let { key } = event
      
      if (key === 'Enter') key = '='
      else if ((/\d/).test(key)) inputDigit(parseInt(key, 10))
      else if (key in CalculatorOperations) performOperation(key)
      else if (key === KEYS.DOT) inputDot()
      else if (key === KEYS.PERCENT) inputPercent()
      else if (key === KEYS.BACKSPACE) clearLastChar()
      else if (key === KEYS.CLEAR) {
        if (displayValue !== ZERO) {
          clearDisplay()
        } else {
          clearAll()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return document.removeEventListener('keydown', handleKeyDown)
  }, [
    inputDigit,
    performOperation,
    inputDot,
    inputPercent,
    clearLastChar,
    clearDisplay,
    clearAll,
    displayValue
  ])
  
  const isClearDisplay = displayValue !== ZERO
  const clearText = isClearDisplay ? 'C' : 'AC'
    
  return (
    <div className="calculator">
      <CalculatorDisplay value={displayValue}/>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button
              className="calculator-key"
              onClick={() => isClearDisplay ? clearDisplay() : clearAll()}
            >
              {clearText}
            </button>
            <button
              className="calculator-key"
              onClick={toggleSign}
            >
              ±
            </button>
            <button
              className="calculator-key"
              onClick={inputPercent}
            >
              %
            </button>
          </div>
          <div className="digit-keys">
          {
            DIGIT_KEYS.map((digit) => 
              <button
                className={`calculator-key key-${digit}`}
                onClick={() => digit === '●' ? inputDot() : inputDigit(parseInt(digit))}
                key={digit}
              >
                {digit}
              </button>
            )
          }
          </div>
        </div>
        <div className="operator-keys">
          {OPERATORS.map((operator) => 
            <button
              className="calculator-key"
              onClick={() => performOperation(operator === '÷' ? '/' : operator)}
              key={`operator_${operator}`}
            >
              {operator}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calculator
