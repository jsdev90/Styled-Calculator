import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`

export default function ThemeSelector (props) {
  return (
    <Container>
      <button className="theme_btn theme1" onClick={() => props.onChange(props.themes.data.Theme1)}>Theme1</button>
      <button className="theme_btn theme2" onClick={() => props.onChange(props.themes.data.Theme2)}>Theme2</button>
    </Container>
  )
}
