import styled, { css } from 'styled-components'

export type ButtonVariant = 'regular' | 'warning' | 'danger'

interface ButtonProps {
  variant: ButtonVariant
}

const buttonVariants = {
  regular: 'green',
  warning: 'red',
  danger: 'yellow'
}

export const Button = styled.button<ButtonProps>`
    width: 200px;
    height: 200px;

    ${props => {
        // console.log('props xxx', props);
        return css`background-color: ${buttonVariants[props.variant]}`
    }};

    color: ${props => props.theme['gray-500']}; // utilizando o tema 
`
