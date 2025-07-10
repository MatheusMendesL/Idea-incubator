<?php

$_SESSION['protect'] = false;
require_once('../_inc/init.php');

$data = json_decode(file_get_contents("php://input"), true);

check_request_method($request_method, 'POST');

$required_fields = ['name', 'passwrd'];

if (!check_required_fields_in_json($data, $required_fields)) {
    $res->response_all('', 'error', 'Missing Fields');
    check_integration_key_json($data);
}

check_integration_key_json($data);

$params = [
    ':nome' => $data['name']
];

$result = $db->execute_query("SELECT * FROM alunos WHERE name = :nome", $params);


if ($result->affected_rows != 0) {
    if (password_verify($data['passwrd'], $result->results[0]->pass)) {
        $user = [
            'id' => $result->results[0]->ID_cliente,
            'username' => $data['name'],
            'name' => $data['name'],
            'role' => 'aluno'
        ];

        $jwtAuth = new JwtAuth();
        $token = $jwtAuth->generate_token_usuario($user);

        $res->response_all(['token' => $token, 'user' => $user]);
    }
}

$result_user = $db->execute_query("SELECT * FROM users WHERE name = :nome", $params);

if ($result_user->affected_rows != 0) {
    if (password_verify($data['passwrd'], $result_user->results[0]->passwrd)) {
        $user = [
            'id' => $result_user->results[0]->ID_user,
            'username' => $data['name'],
            'name' => $data['name'],
            'role' => 'user'
        ];

        $jwtAuth = new JwtAuth();
        $token = $jwtAuth->generate_token_usuario($user);

        $res->response_all(['token' => $token, 'user' => $user]);
    }
    $res->response_all($result_user, 'error', 'Incorrect pass');
}

$res->response_all($result_user, 'error', 'This user doesn`t exist on the database');
check_integration_key_json($data);