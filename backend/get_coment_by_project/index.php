<?php

$_SESSION['protect'] = false;
require_once('../_inc/init.php');

check_request_method($request_method, 'GET');


$id_project = $_GET['id'];

if(!isset($_GET['id'])){
    missing_request_param('id');
}

$params = [
    ':id' => $_GET['id']
];

$results = $db->execute_query('SELECT 
  c.ID_comentario,
  c.ID_project,
  c.data_comentario,
  c.comentario,
  u.name AS nome_user,
  a.name AS nome_aluno,
  COALESCE(u.name, a.name) AS nome_autor,
  CASE
    WHEN u.ID_user IS NOT NULL THEN "usuario"
    WHEN a.ID_cliente IS NOT NULL THEN "aluno"
    ELSE "desconhecido"
  END AS tipo_autor
FROM comentarios c
LEFT JOIN users u ON c.ID_user = u.ID_user
LEFT JOIN alunos a ON c.ID_aluno = a.ID_cliente
LEFT JOIN projetos p ON c.ID_project = p.ID_project
WHERE c.ID_project = :id
ORDER BY c.data_comentario DESC

', $params);


$res->set_aditional_fields('role', 'teste ainda');

$res->response_all($results);

