import { HeaderContainer } from './styles'
import LogoIgniteTimer from '../../assets/logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
   <HeaderContainer>
    <img src={LogoIgniteTimer} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
   </HeaderContainer>
  )
}
