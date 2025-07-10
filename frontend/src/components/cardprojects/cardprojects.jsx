import { useEffect, useState } from "react"
import { getProjetos } from '../../api/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from './cardprojects.module.css'
import { Link } from 'react-router-dom'

const CardProjetos = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    getProjetos('http://localhost/Incubadora%20de%20ideias/backend/get_all_projects/').then(setProjetos).catch(console.error);
  }, []);

  return (
    <div className={style.container_cards}>
      {
        projetos != null ? (
          projetos.map((p) => (
            <div className={style.div_pai} key={p.ID_project}>
              <div className={`${style.card_cg} card`}>
                <div className={`${style.body_card} card-body`}>
                  <div className="text-start">
                    <h5 className="card-title">{p.Name_project}</h5>
                  </div>
                  <Link to={`/projeto/${btoa(p.ID_project)}`} className="btn btn-light mt-3">
                    Saiba Mais
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">Nenhum projeto encontrado.</p>
        )
      }



    </div>
  );
}

export { CardProjetos };
