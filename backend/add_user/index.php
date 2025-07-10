<?php


$_SESSION['protect'] = false;
require_once('../_inc/init.php');
require_once('../vendor/autoload.php');
require_once('../_inc/jwt.php');

$data = json_decode(file_get_contents("php://input"), true);

check_request_method($request_method, 'POST');

$required_fields = ['name', 'passwrd'];

if(!check_required_fields_in_json($data, $required_fields)) {
    $res->response_all('', 'error', 'Missing Fields');
    check_integration_key_json($data);
}

check_integration_key_json($data);

$params = [
    ':nome' => $data['name']
];

$results = $db->execute_query('SELECT name FROM users WHERE name = :nome', $params);


if ($results && $results->affected_rows != 0) {
    $res->response_all('', 'error', 'This name is already in the database');
}


$params = [
    ':nome' => $data['name'],
    ':pass' => password_hash($data['passwrd'], PASSWORD_DEFAULT)
];

$result = $db->execute_non_query("INSERT INTO users VALUES (0, :nome, :pass)", $params);

$user_id = $result->last_id;

$params = [
    ':id' => $result->last_id
];

$results = $db->execute_query("SELECT * FROM users WHERE ID_user = :id", $params);

$user = [
    'id' => $user_id,  
    'username' => $data['name'],
    'name' => $data['name'],
    'role' => 'user'
];

$jwtAuth = new JwtAuth();
$token = $jwtAuth->generate_token_usuario($user);  


$res->response_all(['token' => $token, 'user' => $user], 'success', 'User added successfully');
