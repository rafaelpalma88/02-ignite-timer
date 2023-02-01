import { Button, ButtonVariant } from './styles'

interface ButtonProps {
    variant?: ButtonVariant;
}

export function ButtonWithStyledComponents({ variant = 'regular' }: ButtonProps) {
  return (
    <Button variant={variant}>Enviar</Button>
  )
}
