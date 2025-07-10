import { useEffect, useState } from "react";
import { getProjetos } from '../../api/api';

const ProjetoList = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    getProjetos('http://localhost/Incubadora%20de%20ideias/backend/get_all_projects/').then(setProjetos).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Projetos</h2>
      <ul>
        {projetos.map((p) => (
          <li key={p.ID_project}>{p.Name_project}</li>
        ))}
      </ul>
    </div>
  );
}

export  { ProjetoList };
