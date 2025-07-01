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

    public function getByEmail(string $email): ?User {
        return $this->repository->findByEmail($email);
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

    public function updateProfile(int $id, array $profileData): bool {
        // Buscar usuário existente
        $existingUser = $this->repository->findById($id);
        if (!$existingUser) {
            throw new \Exception("Usuário não encontrado.");
        }

        // Validar dados obrigatórios
        if (empty($profileData['name'])) {
            throw new \Exception("Nome é obrigatório.");
        }

        if (empty($profileData['email'])) {
            throw new \Exception("Email é obrigatório.");
        }

        // Verificar se o email já existe para outro usuário
        $userWithEmail = $this->repository->findByEmail($profileData['email']);
        if ($userWithEmail && $userWithEmail->getId() !== $id) {
            throw new \Exception("Este email já está sendo usado por outro usuário.");
        }

        // Validar formato do email
        if (!filter_var($profileData['email'], FILTER_VALIDATE_EMAIL)) {
            throw new \Exception("Formato de email inválido.");
        }

        // Validar telefone (se fornecido)
        if (!empty($profileData['phone'])) {
            $phone = preg_replace('/[^0-9]/', '', $profileData['phone']);
            if (strlen($phone) < 10 || strlen($phone) > 11) {
                throw new \Exception("Telefone deve ter 10 ou 11 dígitos.");
            }
        }

        // Validar data de nascimento (se fornecida)
        if (!empty($profileData['dateOfBirth'])) {
            $date = \DateTime::createFromFormat('Y-m-d', $profileData['dateOfBirth']);
            if (!$date || $date->format('Y-m-d') !== $profileData['dateOfBirth']) {
                throw new \Exception("Data de nascimento inválida.");
            }
            
            // Verificar se a data não é no futuro
            $today = new \DateTime();
            if ($date > $today) {
                throw new \Exception("Data de nascimento não pode ser no futuro.");
            }
        }

        // Criar objeto User com dados atualizados
        $user = new User(
            $profileData['name'],
            $profileData['email'],
            $existingUser->getPassword(), // Manter senha atual
            $profileData['phone'] ?? null,
            $profileData['dateOfBirth'] ?? null,
            $profileData['profession'] ?? null,
            $profileData['maritalStatus'] ?? null,
            $profileData['coren'] ?? null,
            $profileData['avatarUrl'] ?? null,
            $id
        );

        return $this->repository->updateProfile($user);
    }

    public function updateAvatar(int $id, string $avatarUrl): bool {
        $existingUser = $this->repository->findById($id);
        if (!$existingUser) {
            throw new \Exception("Usuário não encontrado.");
        }

        $user = new User(
            $existingUser->getName(),
            $existingUser->getEmail(),
            $existingUser->getPassword(),
            $existingUser->getPhone(),
            $existingUser->getDateOfBirth(),
            $existingUser->getProfession(),
            $existingUser->getMaritalStatus(),
            $existingUser->getCoren(),
            $avatarUrl,
            $id
        );

        return $this->repository->updateProfile($user);
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

    public function getLastAnamneseDate(int $userId): ?string {
        // Este método seria implementado se houver uma tabela de anamnese
        // Por enquanto, retorna null
        return null;
    }

    public function logout(): void {
        // Inicia a sessão se ainda não estiver iniciada
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        // Destrói todas as variáveis de sessão
        $_SESSION = array();
        
        // Se desejar destruir a sessão completamente, apague também o cookie de sessão
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        
        // Finalmente, destrói a sessão
        session_destroy();
    }
}
