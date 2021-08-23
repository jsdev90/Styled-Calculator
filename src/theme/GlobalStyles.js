import { createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  .calculator {
    width: 100%;
    height: 100%;
    max-width: 320px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  }

  .calculator-display {
    color: white;
    background: ${({ theme }) => theme.colors.base};
    line-height: 100px;
    font-size: 4em;
    text-align: right;
    flex: 1;
    padding: 10px;
  }

  .calculator-keypad {
    height: 400px;
    display: flex;
  }

  .calculator .input-keys {
    width: 240px;
  }

  .calculator .function-keys {
    display: flex;
  }

  .calculator .digit-keys {
    display: flex;
    flex-wrap: wrap-reverse;
  }

  .calculator-key {
    width: 80px;
    height: 80px;
    border-top: 1px solid #777;
    border-right: 1px solid #666;  
    text-align: center;
    line-height: 80px;
    font-size: 1.5em;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }

  .calculator .function-keys .calculator-key {
    background: ${({ theme }) => theme.colors.secondary.background};
    &:active {
      background: ${({ theme }) => theme.colors.secondary.active};
    }
  }

  .calculator .digit-keys .calculator-key {
    background: ${({ theme }) => theme.colors.button.background};
    &:active {
      background: ${({ theme }) => theme.colors.button.active};
    }
  }

  .calculator .operator-keys .calculator-key {
    background: ${({ theme }) => theme.colors.accept.background};
  }

  .calculator-key.key-0 {
    width: 160px;
  }

  .theme_btn {
    padding: 10px 20px;
    font-size: 1em;
    margin: 10px;
    border-radius: 4px;
  }

  .theme_btn.theme1 {
    background: rgba(50, 30, 0, 0.8);
    color: white;
  }

  .theme_btn.theme2 {
    background: rgba(0, 0, 0, 0.5);
    color: black;
  }
`
