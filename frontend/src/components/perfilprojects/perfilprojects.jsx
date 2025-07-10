import { useParams } from "react-router-dom"
import { get_projects_by_author } from "../../api/api"
import { useState, useEffect } from "react"
import style from './perfilprojects.module.css'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const PerfilProjects = () => {
    const { id } = useParams()
    const idDecodificado = atob(id)
    const [projetos, setProjetos] = useState([])
    const role_user = localStorage.getItem('role')

    useEffect(() => {
        if (role_user == "aluno") {

            get_projects_by_author(`http://localhost/Incubadora%20de%20ideias/backend/get_project_by_author/?id=${idDecodificado}`).then(setProjetos).catch(console.error);

        }
    }, []);


    return (
        <div className="d-flex flex-column align-items-center">

            {role_user != "aluno" ? (
                <p> Você não é aluno</p>
            ) : projetos !== undefined ? (
                <>
                    {projetos.map((e) => (
                        <div className={style.div_pai} key={e.ID_project}>
                            <div className={`${style.card_cg} card`}>
                                <div className={`${style.body_card} card-body`}>
                                    <h5 className="card-title text-start">Nome do projeto: <strong>{e.Name_project}</strong></h5>
                                    <div className=" d-flex gap-2">
                                        <Link to={`/edicao_projetos/${btoa(e.ID_project)}`} className="btn btn-light mt-3">
                                            Editar
                                        </Link>
                                        <Link to={`/excluir_projeto/${btoa(e.ID_project)}`} className="btn btn-danger mt-3">
                                            Excluir
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p className="mt-3">Você não tem projetos</p>
            )}

            <div>
                {role_user == "aluno" && (
                    <button className="btn btn-secondary px-3 mt-3 mb-3"><Link className={style.link} to={`/criacao_projetos/${id}`}>
                        Criar Projeto +
                    </Link></button>
                )}
            </div>


        </div>
    );

}

export { PerfilProjects }