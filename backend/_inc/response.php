<?php

class Response{
    private $status;
    private $error_message;
    private $response_data;
    private $integration_key;
    private $aditional_fields = [];

    public function __construct()
    {
        $this->status = 'success';
        $this->error_message = '';
        $this->response_data = null;
        $this->integration_key = null;
    }

    // Usado para alterar o status
    public function set_status($status = 'success')
    {
        $this->status = $status;
    }

    // Usado para alterar a mensagem de erro, já que ela vem vazia
    public function set_error_message($message)
    {
        $this->error_message = $message;
    }

    // Mandar o conteúdo da resposta
    public function set_response_data($data)
    {
        $this->response_data = $data;
    }

    public function set_integration_key($key)
    {
        $this->integration_key = $key;
    }

    // Para emitir as repostas, definindo os dados para ela
    public function response()
    {
        $tmp = [];
        $tmp['status'] = $this->status;
        // Se error_message estiver vazio essa chave não vai existir na resposta final
        if(!empty($this->error_message))
        {
            $tmp['error_message'] = $this->error_message;
        }

        if(!empty($this->response_data))
        {
            $tmp['data'] = $this->response_data;
        }
        
        if(!empty($this->aditional_fields))
        {
            foreach($this->aditional_fields as $key => $value)
            {
                $tmp[$key] = $value;
            }
        }

        if(!empty($this->integration_key))
        {
                $tmp['key'] = $this->integration_key;
        }

        

        $tmp['time_response'] = time();
        $tmp['api_version'] = API_VERSION;

        // Aqui faz um echo dos dados desse array temporário
        echo json_encode($tmp, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    public function set_aditional_fields($field_name, $field_value)
    {
        if(!key_exists($field_name, $this->aditional_fields))
        {
            $this->aditional_fields[$field_name] = $field_value;
        }
    }

    public function response_all($response_data = null, $status = 'success',  $error = null)
    {
        $this->set_status($status);
        $this->set_response_data($response_data);
        $this->set_error_message($error);

        $this->response();
    }


}