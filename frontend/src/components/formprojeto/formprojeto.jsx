import { useState } from "react"
import { useParams } from "react-router-dom"
import style from './formprojeto.module.css'
import { add_project } from "../../api/api"

const FormProjeto = () => {
    const { id } = useParams()
    const idDecodificado = atob(id)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !desc) {
            setError('Por favor, preencha todos os campos');
            return;
        }

        const BASE_URL = 'http://localhost/Incubadora%20de%20ideias/backend/add_project/'
        const data = await add_project(BASE_URL, name, desc, idDecodificado);

        if(data){
            window.location.href = `/perfil/${id}`
            console.log(data)
        }
    }

    return (
        <>
            <h1 className="text-center mt-3">Criação do projeto</h1>
            <form onSubmit={handleSubmit} className={`${style.form_style}`}>
                <label htmlFor="name" className={`${style.label_style}`}>Nome do projeto</label>
                <input
                    type="name"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${style.input_style}`}
                />

                <label htmlFor="desc" className={`${style.label_style}`}>Descrição do projeto</label>
                <textarea name="desc" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className={`${style.input_style}`}></textarea>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className={`btn btn-secondary px-4 mt-2`}>Criar</button>
            </form>
        </>
    )
}

export { FormProjeto }