import { Cabecalho } from "../../components/header";
import { Projectid } from "../../components/projectid";
import { Footer } from '../../components/footer'

const Projeto = () => {
    return (
        <div className="page-container">
            <main className="content-wrap">
                <Cabecalho />

                <Projectid />

            </main>
            <Footer />
        </div>
    )
}

export { Projeto }