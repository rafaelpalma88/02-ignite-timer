import styles from './styles.module.css';

interface IProps {
    color?: 'regular' | 'danger' | 'warning';
}

export function ButtonWithScopedCSS({ color = 'regular' }: IProps) {
    return <button className={styles[color]}>Enviar</button>
}