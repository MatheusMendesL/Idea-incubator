<?php

$_SESSION['protect'] = false;
require_once('../_inc/init.php');

check_request_method($request_method, 'GET');


if(!isset($_GET['id']))
{
    missing_request_param('id');
}

$params = [
    ':id' => $_GET['id']
];

$results = $db->execute_query('SELECT ID_project, ID_aluno FROM projetos WHERE ID_project = :id', $params);

if($results-> affected_rows == 0)
{
    $res->response_all(null,  'error', "This project not exists");
}

$params = [
    ':id' => $_GET['id'],
    ':id_aluno' => $results->results[0]->ID_aluno
];

$results = $db->execute_query('SELECT 
    p.ID_project, 
    p.Name_project, 
    p.description, 
    p.data_criacao, 
    a.name 
FROM 
    projetos p
JOIN 
    alunos a ON p.ID_aluno = a.ID_cliente
WHERE 
    p.ID_project = :id 
    AND p.ID_aluno = :id_aluno
', $params);

$res->response_all($results->results);

