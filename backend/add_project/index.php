<?php
$_SESSION['protect'] = true;
require_once('../_inc/init.php');

$data = json_decode(file_get_contents("php://input"), true);

check_request_method($request_method, 'POST');

$required_fields = ['name', 'desc', 'ID_aluno'];

if(!check_required_fields_in_json($data, $required_fields))
{
    $res->response_all('', 'error', 'Missing Fields');
    check_integration_key_json($data);
}

check_integration_key_json($data);

$params = [
    ':nome' => $data['name'],
    ':desc' => $data['desc'],
    ':ID_aluno' => $data['ID_aluno'],
];

$result = $db->execute_non_query("INSERT INTO projetos (Name_project,description, ID_aluno, data_criacao) VALUES (:nome, :desc, :ID_aluno, NOW())", $params);

$res->response_all();