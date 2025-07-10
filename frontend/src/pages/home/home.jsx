import { CardProjetos } from "../../components/cardprojects";
import { Cabecalho } from "../../components/header";
import { Footer } from "../../components/footer";

const Home = () => {
  return (
    <div className="page-container">
      <main className="content-wrap">
        <Cabecalho />
        <CardProjetos />
      </main>
      <Footer />
    </div>
  );
};

export { Home };

