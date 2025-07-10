<?php

use \Firebase\JWT\JWT;

class JwtAuth {
    private $secret_key = 'H0SDRQzIGqclX2kbTQD2Ak9xspdn9U5f3Wa';  
    private $issuer = 'http://localhost/'; 
    private $audience = 'app'; 

    
    public function generate_token_aluno($aluno_data) {
        $issued_at = time();
        $expiration_time = $issued_at + 3600; 

        $payload = [
            'iat' => $issued_at,
            'exp' => $expiration_time,
            'iss' => $this->issuer,
            'aud' => $this->audience,
            'role' => 'aluno',  
            'id' => $aluno_data['id'],  
            'username' => $aluno_data['username'],  
            'name' => $aluno_data['name'],  
        ];

        return JWT::encode($payload, $this->secret_key, 'HS256');
    }

    
    public function generate_token_usuario($usuario_data) {
        $issued_at = time();
        $expiration_time = $issued_at + 3600;  

        $payload = [
            'iat' => $issued_at,
            'exp' => $expiration_time,
            'iss' => $this->issuer,
            'aud' => $this->audience,
            'role' => 'user',  
            'id' => $usuario_data['id'],  
            'username' => $usuario_data['username'],  
            'name' => $usuario_data['name'],  
        ];

        return JWT::encode($payload, $this->secret_key, 'HS256');
    }

    
    public function validate_token($jwt) {
        try {
            $decoded = JWT::decode($jwt, $this->secret_key);
            return (array) $decoded;
        } catch (Exception $e) {
            return false;  
        }
    }
}
?>
