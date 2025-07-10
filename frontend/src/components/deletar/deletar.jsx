import { useParams } from 'react-router-dom'
import style from './deletar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { delete_project } from '../../api/api'

const Deletar = () => {
    const { id } = useParams()
    const idDecodificado = atob(id)
    const idUser = localStorage.getItem('id')


    const delete_projeto = (e) => {
        e.preventDefault();

        const BASE_URL = `http://localhost/Incubadora%20de%20ideias/backend/delete_project/?id=${idDecodificado}`

        const data = delete_project(BASE_URL)

        if(data){
            window.location.href = `/perfil/${btoa(idUser)}`
        }

    }

    return (
        <div className={`${style.div_btns} d-flex flex-column align-items-center mt-5 gap-3`}>
            <h1>Deseja excluir seu projeto?</h1>
            <div className="d-flex gap-3">
                <button className='btn btn-success' onClick={delete_projeto}>Sim</button>
                <button className='btn btn-danger'> <Link className={style.link_btn} to={`/perfil/${btoa(idUser)}`}>Não</Link></button>
            </div>
        </div>


    )
}

export { Deletar }