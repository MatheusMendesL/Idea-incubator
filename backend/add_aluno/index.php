<?php

$_SESSION['protect'] = false;
require_once('../_inc/init.php');
require_once('../vendor/autoload.php');
require_once('../_inc/jwt.php');

$data = json_decode(file_get_contents("php://input"), true);

check_request_method($request_method, 'POST');


$required_fields = ['name', 'nasc', 'escola', 'passwrd'];

if(!check_required_fields_in_json($data, $required_fields))
{
    $res->response_all('', 'error', 'Missing Fields');
    check_integration_key_json($data);
}

check_integration_key_json($data);

$params = [
    ':nome' => $data['name']
];

$results = $db->execute_query('SELECT name FROM alunos WHERE name = :nome', $params);

if($results->affected_rows != 0)
{
    $res->response_all('', 'error', 'This name is already in the database');
}

$params = [
    ':nome' => $data['name'],
    ':nasc' => $data['nasc'],
    ':escola' => $data['escola'],
    ':pass' => password_hash($data['passwrd'], PASSWORD_DEFAULT)
];

$result = $db->execute_non_query("INSERT INTO alunos VALUES (0, :nome, :nasc, :escola, :pass)", $params);

$user_id = $result->last_id;

$params = [
    ':id' => $result->last_id
];

$results = $db->execute_query("SELECT * FROM alunos WHERE ID_cliente = :id", $params);

$user = [
    'id' => $user_id,  
    'username' => $data['name'],
    'name' => $data['name'],
    'role' => 'aluno'
];

$jwtAuth = new JwtAuth();
$token = $jwtAuth->generate_token_usuario($user);  


$res->response_all(['token' => $token, 'user' => $user], 'success', 'User added successfully');
