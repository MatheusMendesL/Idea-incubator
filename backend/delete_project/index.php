<?php

$_SESSION['protect'] = true;

require_once('../_inc/init.php');

check_request_method($request_method, 'DELETE');

if(!isset($_GET['id']))
{
    missing_request_param('id');
}

$params = [
    ':id' => $_GET['id']
];

$results = $db->execute_non_query("DELETE FROM projetos WHERE ID_project = :id", $params);

$res->response_all();

