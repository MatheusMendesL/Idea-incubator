import { useState } from 'react'
import { Login } from '../../api/api'
import logo from '../../assets/logo.png'
import style from './formlogin.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const FormLogin = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !pass) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const BASE_URL = 'http://localhost/Incubadora%20de%20ideias/backend/login_user/'
    const data = await Login(name, pass, BASE_URL);
    console.log(data)

    if (data && data.data.token) {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('id', data.data.user.id)
      localStorage.setItem('name', data.data.user.name)
      localStorage.setItem('role', data.data.user.role)
      localStorage.setItem('user', data.data.user)
      window.location.href = '/home';
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <>
      <div className={`${style.container_form}`}>
        <img src={logo} className={`${style.img} mt-4`} />
        <form onSubmit={handleSubmit} className={`${style.form_style}`}>
          <h2>Fazer login</h2>
          <label htmlFor="name" className={`${style.label_style}`}>Email</label>
          <input
            type="email"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${style.input_style}`}
          />
          <label htmlFor="passwrd" className={`${style.label_style}`}>Senha</label>
          <input
            type="password"
            name="passwrd"
            id="passwrd"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={`${style.input_style}`}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className={`btn btn-secondary`}>Login</button>
        </form>
        <h5 className={`mt-4`}>Ainda não tem conta? <Link className={style.link} to={"/cadastro"}>
          Clique aqui!
        </Link></h5>
      </div>
    </>
  );
};

export { FormLogin };
