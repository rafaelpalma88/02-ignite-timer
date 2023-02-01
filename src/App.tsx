import './App.css'
import { ButtonWithScopedCSS } from './components/ButtonWithScopedCSS/Button'
import { ButtonWithStyledComponents } from './components/ButtonWithStyledComponents'

export function App() {

  return (
    <div>
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

    </div>
    
    
  )
}


