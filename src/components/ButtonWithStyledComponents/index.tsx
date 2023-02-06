import { Button, type ButtonVariant } from './styles'

interface ButtonProps {
  variant?: ButtonVariant
}

export const ButtonWithStyledComponents: React.FC = ({ variant = 'regular' }: ButtonProps) => {
  return (
    <Button variant={variant}>Enviar</Button>
  )
}
