<?php


use bng\System\Database;

header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


require_once('config.php');
require_once('Database.php');
require_once('response.php');
require_once('helper.php');

date_default_timezone_set('America/Sao_Paulo');




$res = new Response();

if (!API_ACTIVE) {
    $res->set_status('error');
    $res->set_response_data(API_MESSAGE);
    $res->response();
}

$request_method = $_SERVER['REQUEST_METHOD'];

$mysql_config = [
    'server' => MYSQL_HOST,
    'dbname' => MYSQL_DBNAME,
    'user' => MYSQL_USER,
    'pass' => MYSQL_PASS
];

$db = new Database($mysql_config);

if ($_SESSION['protect']) {
    $headers = apache_request_headers();
    $authHeader = $headers['Authorization'] ?? '';

    if (!str_starts_with($authHeader, 'Bearer ')) {
        $res->set_status('error');
        $res->set_error_message("Missing or invalid Authorization header.");
        $res->response();
    }

    $token = trim(str_replace('Bearer ', '', $authHeader));

    if ($token !== 'H0SDRQzIGqclX2kbTQD2Ak9xspdn9U5f3Wa') {
        $res->set_status('error');
        $res->set_error_message("Invalid token.");
        $res->response();
    }
}
