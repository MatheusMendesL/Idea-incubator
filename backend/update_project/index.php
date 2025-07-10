<?php

$_SESSION['protect'] = true;
require_once('../_inc/init.php');

$data = json_decode(file_get_contents("php://input"), true);

check_request_method($request_method, 'PUT');

$required_fields = ['ID_project', 'ID_aluno', 'att'];

if (!check_required_fields_in_json($data, $required_fields)) {
    $res->response_all('', 'error', 'Missing Fields');
    check_integration_key_json($data);
}

$params = [
    ':id' => $data['ID_project']
];

$results = $db->execute_query('SELECT * FROM projetos WHERE ID_project = :id', $params);

if ($results->results[0]->ID_aluno != $data['ID_aluno']) {
    $res->response_all($results, 'error', 'The ID is different at the ID at the project');
    check_integration_key_json($data);
}

check_integration_key_json($data);

$params = [
    ':id' => $data['ID_project'],
    ':nome' => !isset($data['name']) ? $results->results[0]->Name_project : $data['name'],
    ':desc' => !isset($data['desc']) ? $results->results[0]->description : $data['desc']
];


$result = $db->execute_non_query("UPDATE projetos SET Name_project = :nome, description = :desc WHERE ID_project = :id", $params);

$res->response_all();
