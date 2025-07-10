import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';  
import { Projeto } from './pages/projeto';  
import { Sobre } from './pages/sobre'
import { Login } from './pages/login';
import { Cadastro } from './pages/cadastro';
import { Perfil } from './pages/perfil';
import { ProjetoPlus } from './pages/criacao_projetos';
import { Editproject } from './pages/edicao_projetos';
import { Delete } from './pages/excluir_projeto';

const Approutes = () => {
    return (
        <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="projeto/:id" element={<Projeto />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil/:id" element={<Perfil />} />
            <Route path="/criacao_projetos/:id" element={<ProjetoPlus />} />
            <Route path="/edicao_projetos/:id" element={<Editproject />} />
            <Route path="/excluir_projeto/:id" element={<Delete />} />
        </Routes>
    );
};

export { Approutes };
