import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { Router } from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './context/CyclesContext'

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  )
}
