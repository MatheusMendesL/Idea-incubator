<?php

require_once('../vendor/autoload.php');
require_once('../_inc/jwt.php');

function check_request_method($method, $expected_method)
{
    if (strtoupper($method) !== strtoupper($expected_method)) {
        global $res;
        $res->set_status('error');
        $res->set_error_message('Invalid request method. Expected: ' . strtoupper($expected_method));
        $res->response();
    }
}

function check_integration_key_get()
{
    if (isset($_GET['key'])) {
        global $res;
        $res->set_integration_key($_GET['key']);
    }
}

function check_integration_key_json($data)
{
    if (key_exists('integration_key', $data)) {
        global $res;
        $res->set_integration_key($data['integration_key']);
    }
}

function missing_request_param($param)
{
    global $res;
    $res->response_all("", 'error', "The parameter '" . $param . "' does not exist.");
}

function check_required_fields_in_json($data, $fields)
{
    foreach ($fields as $key) {
        if (!key_exists($key, $data)) {
            return false;
        }
    }

    return true;
}

function encrypt($value)
{
    return bin2hex(openssl_encrypt($value, 'aes-256-cbc', OPENSSL_KEY, OPENSSL_RAW_DATA, OPENSSL_IV));
}

function decrypt($value)
{
    if (strlen($value) % 2 != 0) {
        return false;
    }

    return openssl_decrypt(hex2bin($value), 'aes-256-cbc', OPENSSL_KEY, OPENSSL_RAW_DATA, OPENSSL_IV);
}

