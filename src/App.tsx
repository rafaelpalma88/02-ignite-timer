import { ButtonWithScopedCSS } from './components/ButtonWithScopedCSS/Button'
import { ButtonWithStyledComponents } from './components/ButtonWithStyledComponents'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
       
      <p>Scoped CSS</p>
      <div>
        <ButtonWithScopedCSS color="danger" />
        <ButtonWithScopedCSS color="regular" />
        <ButtonWithScopedCSS color="warning" />
        <ButtonWithScopedCSS />
      </div>

      <p>Styled Components</p>
      
      <div>
        <ButtonWithStyledComponents variant="danger" />
        <ButtonWithStyledComponents variant="regular" />
        <ButtonWithStyledComponents variant="warning" />
        <ButtonWithStyledComponents />
      </div>

      <GlobalStyle />
    </ThemeProvider>
  )
}


