import { useParams } from "react-router-dom";
import { useState } from "react";
import style from './formcomentario.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { add_coment } from "../../api/api";

const Formcomentario = () => {


    const [coment, setComent] = useState('');
    const { id } = useParams();
    const [ error, setError] = useState('')
    const idDecodificado = atob(id);
    const id_usuario = localStorage.getItem('id')
    const role_user = localStorage.getItem('role')

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const BASE_URL = `http://localhost/Incubadora%20de%20ideias/backend/add_coments/?${idDecodificado}`
        
        if(coment.length == 0){
            setError('O comentário está vazio')
            return
        }

        if(role_user == "aluno"){
            var data = await add_coment(BASE_URL, coment, idDecodificado, null, id_usuario);
        } else {
            var data = await add_coment(BASE_URL, coment, idDecodificado, id_usuario, null);
        }
        

        if (data.status == 'success') {
            window.location.href = `/projeto/${btoa(idDecodificado)}`;
            console.log(data)
        } else {
            setError('Você precisa estar logado');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="coment"
                    id="coment"
                    value={coment}
                    onChange={(e) => setComent(e.target.value)}
                    className={`${style.input_style}`}
                />

                <button type="submit" className={`btn btn-secondary`}>comentar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </>
    )
}

export { Formcomentario }