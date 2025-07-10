import style from './cabecalho.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

const Cabecalho = () => {
    const user = localStorage.getItem('name')
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const dark = localStorage.getItem('modo_escuro') === 'true';
        setIsDark(dark);
        if (dark) document.body.classList.add('dark-mode');
    }, []);

    const toggleDarkMode = () => {
        const novoValor = !isDark;
        setIsDark(novoValor);
        localStorage.setItem('modo_escuro', novoValor);
        document.body.classList.toggle('dark-mode', novoValor)
    };

    return (
        <header>
            <div className={style.header}>
                <div className=''>
                    <img src={logo} className={`${style.img} mt-4`} />
                </div>
                <div className={style.div_links}>
                    <h1 className={style.text}> <Link className={style.link} to={"/home"}>
                        Início
                    </Link> </h1>
                    <h1 className={style.text}>|</h1>
                    <h1 className={style.text}> <Link className={style.link} to={"/home"}>
                        Projetos
                    </Link> </h1>
                    <h1 className={style.text}>|</h1>
                    <h1 className={style.text}><Link className={style.link} to={"/sobre"}>
                        Sobre
                    </Link></h1>
                </div>
                <div>
                    {token ? (
                        <>

                            <h1 className={`${style.text} mb-5 pt-3`}>
                                <div className="text-center w-100 d-flex gap-2">
                                    <button className={`btn btn-secondary px-3 ${style.btn_perfil}`}>
                                        <Link className={style.link_btn} to={`/perfil/${btoa(id)}`}>Perfil</Link>
                                    </button>

                                    <div class="form-check form-switch">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon mx-1" viewBox="0 0 16 16">
                                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                                        </svg>
                                        <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" checked={isDark}
                                            onChange={toggleDarkMode}
                                            title="Ativar modo escuro"
                                            style={{ width: '50px' }} />
                                    </div>
                                </div>
                            </h1>


                        </>
                    ) : (
                        <>
                            <div className={style.div_logins}>
                                <h1 className={style.text}>
                                    <Link className={`btn btn-secondary btn-login p-2 mb-3`} to={"/login"}>Login</Link>
                                </h1>

                                <h1 className={`${style.text} btn-cadastro`}>
                                    <Link className={`btn btn-light p-2 mb-3`} to={"/cadastro"}>Cadastro</Link>
                                </h1>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}


export { Cabecalho }