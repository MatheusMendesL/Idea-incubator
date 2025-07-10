import { Cabecalho } from "../../components/header";
import { Footer } from "../../components/footer"
import { Deletar } from "../../components/deletar/deletar";

const Delete = () => {
    return (
        <div className="page-container">
            <main className="content-wrap">
                <Cabecalho />
                <Deletar />
            </main>
            <Footer />
        </div>
    )
}

export { Delete }