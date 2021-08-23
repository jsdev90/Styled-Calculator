import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import Calculator from './components/Calculator'
import ThemeSelector from './components/ThemeSelector'
import { GlobalStyles } from './theme/GlobalStyles'
import { setToLS, getFromLS } from './utils/storage';



function App() {
  const themes = getFromLS('all-themes')
  const [selectedTheme, setSelectedTheme] = useState(getFromLS('theme') || themes.data.Theme1)

  useEffect(() => {
    setToLS('theme', selectedTheme)
  }, [selectedTheme])

  return (
    <>
    {
      <ThemeProvider theme={ selectedTheme }>
        <GlobalStyles />
        <ThemeSelector themes={themes} onChange={ setSelectedTheme } />
        <Calculator />
      </ThemeProvider>
    }
    </>
  )
}

export default App
