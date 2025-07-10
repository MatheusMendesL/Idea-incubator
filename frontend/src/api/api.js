const TOKEN = import.meta.env.VITE_JWT_TOKEN;

export async function getProjetos(BASE_URL) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

export async function getprojetosbyid(BASE_URL) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

export async function Login(name, pass, BASE_URL) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, passwrd: pass }),
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null;
  }
}

export async function cadastro(name, pass, BASE_URL, nasc = null, school = null) {
  const body = { name: name, passwrd: pass };
  if (nasc && school) {
    body.nasc = nasc;
    body.escola = school;
  }

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null;
  }
}

export async function add_coment(BASE_URL, comment, ID_project, ID_usuario = null, ID_aluno = null) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
      body: JSON.stringify({
        comentario: comment,
        ID_project: ID_project,
        ID_user: ID_usuario,
        ID_aluno: ID_aluno
      }),
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao fazer comentário:', error);
    return null;
  }
}

export async function getcomentsinproject(BASE_URL) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
  }
}

export async function get_likes_dislikes(BASE_URL) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar likes/dislikes:', error);
    return null;
  }
}

export async function add_like_dislike(BASE_URL, ID_project, tipo, ID_usuario = null, ID_aluno = null) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
      body: JSON.stringify({
        ID_project: ID_project,
        type: tipo,
        ID_user: ID_usuario,
        ID_aluno: ID_aluno
      }),
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao registrar like/dislike:', error);
    return null;
  }
}

export async function get_projects_by_author(BASE_URL) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar projetos por autor:', error);
    return null;
  }
}

export async function add_project(BASE_URL, name, desc, ID_aluno) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
      body: JSON.stringify({ name, desc, ID_aluno }),
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao adicionar projeto:', error);
    return null;
  }
}

export async function edit_project(BASE_URL, ID_project, ID_aluno, name = null, desc = null) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
      body: JSON.stringify({ ID_project, ID_aluno, att: true, name, desc }),
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao editar projeto:', error);
    return null;
  }
}

export async function delete_project(BASE_URL) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return null;
  }
}
