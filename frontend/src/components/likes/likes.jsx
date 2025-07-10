import { useParams } from "react-router-dom";
import { add_like_dislike, get_likes_dislikes } from "../../api/api";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

const Likes = () => {
    const { id } = useParams();
    const idDecodificado = atob(id);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDisLikes] = useState([]);
    const [ error, setError] = useState('')
    const user_role = localStorage.getItem('role');
    const user_id = localStorage.getItem('id');

    const BASE_URL_LIKES = `http://localhost/Incubadora%20de%20ideias/backend/get_all_likes/?id=${idDecodificado}`;
    const BASE_URL_DISLIKES = `http://localhost/Incubadora%20de%20ideias/backend/get_all_dislikes/?id=${idDecodificado}`;

    useEffect(() => {
        get_likes_dislikes(BASE_URL_LIKES)
            .then((data) => {
                setLikes(data?.data ?? []);
            })
            .catch((error) => {
                console.error("Erro ao carregar likes:", error);
                setLikes([]);
            });
    }, [id]);

    useEffect(() => {
        get_likes_dislikes(BASE_URL_DISLIKES)
            .then((data) => {
                setDisLikes(data?.data ?? []);
            })
            .catch((error) => {
                console.error("Erro ao carregar dislikes:", error);
                setDisLikes([]);
            });
    }, [id]);

    if (likes === null || dislikes == null) {
        return <p>Carregando...</p>;
    }

    const add_interaction = async (TIPO) => {
        const BASE_URL = 'http://localhost/Incubadora%20de%20ideias/backend/update_likes/';
        try {
            let data;
            if (user_role == "aluno") {
                data = await add_like_dislike(BASE_URL, idDecodificado, TIPO, null, user_id);
            } else {
                data = await add_like_dislike(BASE_URL, idDecodificado, TIPO, user_id, null);
            }

            if (data.status == 'success') {
                window.location.href = `/projeto/${btoa(idDecodificado)}`;
            } else {
                setError("Precisa estar logado")
            }
        } catch (error) {
            console.error("Erro ao adicionar interação:", error);
        }
    };


    return (
        <>
            <div className="d-flex gap-3 mb-3 justify-content-center ">
                <button onClick={() => add_interaction('Like')} className="btn btn-success">
                    Likes {likes.length}
                </button>
                <button onClick={() => add_interaction('Dislike')} className="btn btn-danger">
                    Dislikes {dislikes.length}
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
}

export { Likes };
