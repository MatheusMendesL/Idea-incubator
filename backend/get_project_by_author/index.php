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

$results = $db->execute_query('SELECT * FROM projetos WHERE ID_aluno = :id', $params);

$res->response_all($results->results);