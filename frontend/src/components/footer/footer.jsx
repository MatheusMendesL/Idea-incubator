import style from './footer.module.css'

const Footer = () => {
const anoAtual = (new Date()).getFullYear()

    return (
        <footer>
            <div className={style.footer}>
                <strong><h4>&copy; {anoAtual} NIDUS - Incubadora de Ideias </h4> </strong>
            </div>
        </footer>
    )
}

export { Footer }