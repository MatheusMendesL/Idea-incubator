import { Cabecalho } from "../../components/header";
import { Footer } from "../../components/footer"
import { FormEditProject } from "../../components/formeditproject/formeditproject";
import { useParams } from "react-router-dom";

const Editproject = () => {


    return (
        <div className="page-container">
            <main className="content-wrap">
                <Cabecalho />
                <FormEditProject />
            </main>
            <Footer />
        </div>

    )

}

export { Editproject }