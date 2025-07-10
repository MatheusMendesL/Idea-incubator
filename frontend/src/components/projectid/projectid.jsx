import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjetos } from '../../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './projectid.module.css'
import { getcomentsinproject } from '../../api/api'
import { Formcomentario } from "../formcomentario";
import { Likes } from "../likes/likes";

const Projectid = () => {
    const [projetos, setProjetos] = useState(null);
    const [coments, setcoments] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        const idDecodificado = atob(id);
        getProjetos(`http://localhost/Incubadora%20de%20ideias/backend/get_project_by_id/?id=${idDecodificado}`)
            .then((data) => {
                if (data && data.length > 0) {
                    setProjetos(data);
                } else {
                    setProjetos([]);
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
            });
    }, [id])


    useEffect(() => {
        const idDecodificado = atob(id);
        getcomentsinproject(`http://localhost/Incubadora%20de%20ideias/backend/get_coment_by_project/?id=${idDecodificado}`)
            .then((data) => {
                if (data) {
                    setcoments(data.results);
                } else {
                    setcoments([]);
                    console.log('aa')
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
            });
    }, [id])

    if (coments === null || projetos == null) {
        return <p>Carregando...</p>;
    }
    return (
        <>
            <div>

                <div className={style.div_project}>
                    <div className={style.div_project_infos}>
                        <h1 className={`${style.name_project} mt-3`}>{projetos[0].Name_project}</h1>
                        <p className={`${style.desc_project} mt-3`}>{projetos[0].description}</p>
                        <p>Feito por: {projetos[0].name}</p>
                    </div>

                    <div className={style.div_coments}>
                        <div className={style.comentarios_container}>
                            <h3>Comentários</h3>
                            <div className={style.comentarios_scroll}>
                                <div className={style.comentario}>
                                    {coments.map((e) => (
                                        <div key={e.ID_comentario}>
                                            <p className={style.coment_user}>{e.tipo_autor === "aluno" ? e.nome_aluno : e.nome_user}, {e.data_comentario}</p>

                                            <p className={style.coment}>{e.comentario}</p>
                                            <hr className={style.coment} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Formcomentario />
                        </div>

                        <div>
                            <Likes />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export { Projectid };
