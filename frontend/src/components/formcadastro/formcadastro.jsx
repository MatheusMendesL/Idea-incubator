import { useState } from 'react';
import { cadastro } from '../../api/api';
import style from './formcadastro.module.css'
import logo from '../../assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const FormCadastro = () => {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [nasc, setNasc] = useState('');
    const [school, setSchool] = useState('');
    const [isAluno, setIsAluno] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const BASE_URL = isAluno
            ? 'http://localhost/Incubadora%20de%20ideias/backend/add_aluno/'
            : 'http://localhost/Incubadora%20de%20ideias/backend/add_user/';

        const data = await cadastro(name, pass, BASE_URL, nasc, school);    

        if (data && data.status === 'success') {
            localStorage.setItem('token', data.data.token)
            localStorage.setItem('id', data.data.user.id)
            localStorage.setItem('name', data.data.user.name)
            localStorage.setItem('role', data.data.user.role)
            localStorage.setItem('user', data.data.user)
            window.location.href = '/home'
        } else {
            setMensagem('Erro ao cadastrar: ' + (data?.message || 'Desconhecido'));
        }
    };

    return (
        <div className={`${style.container_form}`}>
            <img src={logo} className={`${style.img} mt-4`} />
            <form onSubmit={handleSubmit} className={`${style.form_style}`}>
                <h2>Crie sua conta</h2>

                <label htmlFor="name" className={`${style.label_style}`}>Email</label>
                <input type="email" value={name} name='name' id='name' onChange={(e) => setName(e.target.value)} required className={`${style.input_style} form-control`} />



                <label>Senha:</label>
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required className={`${style.input_style} form-control`} />

                {isAluno && (
                    <>
                        <label>Data de Nascimento:</label>
                        <input type="date" value={nasc} onChange={(e) => setNasc(e.target.value)} className={`${style.input_style} form-control`} />

                        <label>Escola Atual:</label>
                        <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} className={`${style.input_style} form-control`} />
                    </>
                )}

                <div style={{ margin: '10px 0' }}>
                    <label>
                        <input type="checkbox" checked={isAluno} onChange={() => setIsAluno(!isAluno)} />
                        Aluno
                    </label>
                </div>

                <button type="submit" className={`btn btn-secondary`}>Cadastrar</button>
                <h5 className={`mt-2`}>Já tem conta? <Link className={style.link} to={"/login"}>
                    Clique aqui!
                </Link></h5>
            </form>
        </div>
    );
};

export { FormCadastro };
