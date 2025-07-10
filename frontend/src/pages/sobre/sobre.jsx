import { Cabecalho } from "../../components/header";
import { Footer } from '../../components/footer'

const Sobre = () => {
    return (
        <div className="page-container">
            <main className="content-wrap">
                <Cabecalho />

                <h1>Sobre a NIDUS</h1>
            </main>
            <Footer />

        </div>
    )
}

export { Sobre }