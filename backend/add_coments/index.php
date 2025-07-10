<?php

$_SESSION['protect'] = true;
require_once('../_inc/init.php');

$data = json_decode(file_get_contents("php://input"), true);

check_request_method($request_method, 'POST');

$required_fields = ['comentario', 'ID_project'];

if(!check_required_fields_in_json($data, $required_fields))
{
    $res->response_all('', 'error', 'Missing Fields');
    check_integration_key_json($data);
}

if($data['ID_user'] == null and $data['ID_aluno'] == null){
    $res->response_all('', 'error', 'You need to be logged in');
    check_integration_key_json($data);
}

check_integration_key_json($data);

$params = [
    ':id' => $data['ID_project'],
    ':id_user' => !empty($data['ID_user']) ? $data['ID_user'] : null,
    ':id_aluno' => !empty($data['ID_aluno']) ? $data['ID_aluno'] : null,
    ':comentarios' => $data['comentario']
];

$result = $db->execute_non_query("INSERT INTO comentarios VALUES (0, :id, NOW(), :id_user, :id_aluno, :comentarios)", $params);

$res->response_all();