import { Cabecalho } from "../../components/header";
import { Footer } from "../../components/footer"
import { FormProjeto } from "../../components/formprojeto";

const ProjetoPlus = () => {
    return (
        <div className="page-container">
            <main className="content-wrap">
                <Cabecalho />

                <FormProjeto />
            </main>
            <Footer />
        </div>

    )
}

export { ProjetoPlus }