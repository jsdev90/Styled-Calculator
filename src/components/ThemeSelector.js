import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`

export default function ThemeSelector(props) {
  const { onChange, themes } = props
  return (
    <Container>
      <button className="theme_btn theme1" onClick={() => onChange(themes.data.Theme1)}>Theme1</button>
      <button className="theme_btn theme2" onClick={() => onChange(themes.data.Theme2)}>Theme2</button>
    </Container>
  )
}

ThemeSelector.propTypes = {
  onChange: PropTypes.func,
  themes: PropTypes.object
}
