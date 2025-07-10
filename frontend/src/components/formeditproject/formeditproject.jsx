import { useState } from "react"
import { useParams } from "react-router-dom"
import style from './formeditproject.module.css'
import { edit_project } from "../../api/api"

const FormEditProject = () => {
    const { id } = useParams()
    const idDecodificado = atob(id)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [error, setError] = useState('')
    const id_user = localStorage.getItem('id')


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !desc) {
            setError('Por favor, preencha todos os campos');
            return;
        }

        const BASE_URL = 'http://localhost/Incubadora%20de%20ideias/backend/update_project/'
        const data = await edit_project(BASE_URL, idDecodificado, id_user, name, desc);

        if (data) {
            window.location.href = `/perfil/${btoa(id_user)}`
            console.log(data)
        }
    }

    return (
        <>
            <h1 className="text-center mt-3">Editar Projeto</h1>
            <form onSubmit={handleSubmit} className={`${style.form_style}`}>
                <label htmlFor="name" className={`${style.label_style}`}>Nome do projeto</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${style.input_style}`}
                />

                <label htmlFor="desc" className={`${style.label_style}`}>Descrição do projeto</label>
                <textarea name="desc" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className={`${style.input_style}`}></textarea>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className={`btn btn-secondary px-4 mt-2`}>Editar</button>
            </form>
        </>
    )
}

export { FormEditProject }