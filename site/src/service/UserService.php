<?php
namespace src\service;

use src\model\repository\UserRepository;
use src\model\entity\User;

class UserService {
    private UserRepository $repository;

    public function __construct() {
        $this->repository = new UserRepository;
    }

    public function getAll(): array {
        return $this->repository->findAll();
    }

    public function getById(int $id): ?User {
        return $this->repository->findById($id);
    }

    public function register(string $name, string $email, string $password, string $passwordConfirm): bool {
    if ($password !== $passwordConfirm) {
        throw new \Exception("As senhas não coincidem.");
    }

    if ($this->repository->findByEmail($email)) {
        throw new \Exception("Usuário já existe.");
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $user = new User($name, $email, $hash);
    return $this->repository->save($user);
}

    public function update(int $id, string $name, string $email, string $password): bool {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($name, $email, $hash, $id);
        return $this->repository->update($user);
    }

    public function delete(int $id): bool {
        return $this->repository->delete($id);
    }

    public function login(string $email, string $password): User {
        $user = $this->repository->findByEmail($email);
        if (!$user || !password_verify($password, $user->getPassword())) {
            throw new \Exception("Login inválido.");
        }
        return $user;
    }
}
