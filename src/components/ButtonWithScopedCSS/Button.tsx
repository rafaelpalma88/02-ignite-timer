import styles from './styles.module.css'

interface IProps {
  color?: 'regular' | 'danger' | 'warning'
}

export const ButtonWithScopedCSS: React.FC = ({ color = 'regular' }: IProps) => {
  return <button className={styles[color]}>Enviar</button>
}
