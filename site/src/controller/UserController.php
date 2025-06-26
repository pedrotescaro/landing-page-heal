<?php
namespace src\controller;

use src\service\UserService;
use config\connection;

class UserController {
    private UserService $service;

    public function __construct() {
        $this->service = new UserService();
    }

    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);
        try {
            $this->service->register($data['name'], $data['email'], $data['password'], $data['confirm_password']);
            echo json_encode(["message" => "Usuário cadastrado com sucesso"]);
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    public function list() {
        echo json_encode($this->service->getAll());
    }

    public function delete($id) {
        if ($this->service->delete($id)) {
            echo json_encode(["message" => "Usuário deletado"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Usuário não encontrado"]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        try {
            $this->service->update($id, $data['name'], $data['email'], $data['password']);
            echo json_encode(["message" => "Usuário atualizado"]);
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
        try {
            $user = $this->service->login($data['email'], $data['password']);
            echo json_encode(["message" => "Login realizado com sucesso", "user" => $user->getName()]);
        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
