import { Cabecalho } from "../../components/header";
import { Footer } from "../../components/footer"
import { PerfilProjects } from "../../components/perfilprojects/perfilprojects";

const Perfil = () => {
    return (
        <div className="page-container">
            <main className="content-wrap">
                <Cabecalho />

                <PerfilProjects />
            </main>
            <Footer />


        </div>
    )
}

export { Perfil }