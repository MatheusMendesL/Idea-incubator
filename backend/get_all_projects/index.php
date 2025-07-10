<?php

$_SESSION['protect'] = false;
require_once('../_inc/init.php');


check_request_method($request_method, 'GET');

$results = $db->execute_query('SELECT * FROM projetos');

$res->set_aditional_fields('total_projetos', $results->affected_rows);

$res->response_all($results->results);