<?php

$_SESSION['protect'] = true;
require_once('../_inc/init.php');

$data = json_decode(file_get_contents("php://input"), true);
check_request_method($request_method, 'POST');

$required_fields = ['ID_project', 'type'];
if (!check_required_fields_in_json($data, $required_fields)) {
    $res->response_all('', 'error', 'Missing Fields');
    check_integration_key_json($data);
}

if($data['ID_user'] == null and $data['ID_aluno'] == null){
    $res->response_all('', 'error', 'You need to be logged in');
    check_integration_key_json($data);
}

check_integration_key_json($data);


$params_check = [
    ':id' => $data['ID_project'],
    ':id_user' => !empty($data['ID_user']) ? $data['ID_user'] : null,
    ':id_aluno' => !empty($data['ID_aluno']) ? $data['ID_aluno'] : null
];

$result_check = $db->execute_query(
    'SELECT * FROM interacoes WHERE ID_project = :id AND (ID_user = :id_user OR Aluno_ID = :id_aluno)',
    $params_check
);


$results_insert = null;
$results_delete = null;
$action = '';

if ($result_check->affected_rows >= 1) {
    $tipo_existente = $result_check->results[0]->tipo;

    if (strtolower($tipo_existente) === strtolower($data['type'])) {
        $params_delete = [
            ':id' => $data['ID_project'],
            ':id_user' => !empty($data['ID_user']) ? $data['ID_user'] : null,
            ':id_aluno' => !empty($data['ID_aluno']) ? $data['ID_aluno'] : null
        ];

        $results_delete = $db->execute_non_query(
            'DELETE FROM interacoes WHERE ID_project = :id AND (ID_user = :id_user OR Aluno_ID = :id_aluno)',
            $params_delete
        );

        $action = 'deleted';
    } else {
        $params_update = [
            ':id' => $data['ID_project'],
            ':id_user' => !empty($data['ID_user']) ? $data['ID_user'] : null,
            ':id_aluno' => !empty($data['ID_aluno']) ? $data['ID_aluno'] : null,
            ':type_interaction' => $data['type']
        ];

        $results_insert = $db->execute_non_query(
            'UPDATE interacoes SET tipo = :type_interaction WHERE ID_project = :id AND (ID_user = :id_user OR Aluno_ID = :id_aluno)',
            $params_update
        );

        $action = 'updated';
    }
} else {
    $params_insert = [
        ':id' => $data['ID_project'],
        ':id_user' => !empty($data['ID_user']) ? $data['ID_user'] : null,
        ':type_interaction' => $data['type'],
        ':id_aluno' => !empty($data['ID_aluno']) ? $data['ID_aluno'] : null
    ];

    $results_insert = $db->execute_non_query(
        "INSERT INTO interacoes (ID_interacao, ID_project, ID_user, tipo, Aluno_ID) VALUES (0, :id, :id_user, :type_interaction, :id_aluno)",
        $params_insert
    );

    $action = 'inserted';
}

$res->response_all([
    'success' => true,
    'action' => $action,
    'results_insert' => $results_insert,
    'results_delete' => $results_delete
]);
