# CRUD de Perfil de Usuário - Sistema Heal

Este documento descreve a implementação do CRUD (Create, Read, Update, Delete) para o perfil de usuário no sistema Heal, seguindo o padrão MVC.

## 📋 Estrutura Implementada

### 1. Model (Modelo)
- **User.php**: Entidade expandida com todos os campos do perfil
- **UserRepository.php**: Repositório com métodos CRUD completos

### 2. View (Visão)
- **profile.html**: Interface do usuário com integração à API

### 3. Controller (Controlador)
- **UserController.php**: Controlador com endpoints para gerenciar o perfil

### 4. Service (Serviço)
- **UserService.php**: Lógica de negócio com validações

## 🗄️ Banco de Dados

### Tabela `users` Atualizada
```sql
ALTER TABLE users 
ADD COLUMN user_phone VARCHAR(20) NULL,
ADD COLUMN user_date_of_birth DATE NULL,
ADD COLUMN user_profession VARCHAR(100) NULL,
ADD COLUMN user_marital_status VARCHAR(50) NULL,
ADD COLUMN user_coren VARCHAR(100) NULL,
ADD COLUMN user_avatar_url TEXT NULL;
```

### Usuário Padrão
- **Nome**: Profissional da Saúde
- **Email**: profissional@clinica.com
- **Senha**: password (hash: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi)
- **Telefone**: (11) 98765-4321
- **Data de Nascimento**: 15/05/1985
- **Profissão**: Enfermeiro(a)
- **Estado Civil**: Casado(a)
- **COREN/CRM**: COREN-SP 123456

## 🚀 Configuração

### 1. Executar Script SQL
Execute o arquivo `update_users_table.sql` no seu banco de dados MySQL:

```bash
mysql -u seu_usuario -p seu_banco < update_users_table.sql
```

### 2. Verificar Rotas
As rotas já estão configuradas no `public/index.php`:

```php
// Rotas do perfil do usuário
$router->add('GET', '/site/public/api/profile/{id}', [new UserController($userService), 'getProfile']);
$router->add('PUT', '/site/public/api/profile/{id}', [new UserController($userService), 'updateProfile']);
$router->add('PUT', '/site/public/api/profile/{id}/avatar', [new UserController($userService), 'updateAvatar']);
```

## 📡 Endpoints da API

### 1. Obter Perfil
```http
GET /site/public/api/profile/{id}
```

**Resposta:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Profissional da Saúde",
    "email": "profissional@clinica.com",
    "phone": "(11) 98765-4321",
    "dateOfBirth": "1985-05-15",
    "profession": "Enfermeiro(a)",
    "maritalStatus": "Casado(a)",
    "coren": "COREN-SP 123456",
    "avatarUrl": null,
    "createdAt": "2024-01-01 00:00:00"
  }
}
```

### 2. Atualizar Perfil
```http
PUT /site/public/api/profile/{id}
Content-Type: application/json

{
  "name": "Novo Nome",
  "email": "novo@email.com",
  "phone": "(11) 99999-9999",
  "dateOfBirth": "1990-01-01",
  "profession": "Médico(a)",
  "maritalStatus": "Solteiro(a)",
  "coren": "CRM-SP 654321"
}
```

### 3. Atualizar Avatar
```http
PUT /site/public/api/profile/{id}/avatar
Content-Type: application/json

{
  "avatarUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

## 🔧 Funcionalidades Implementadas

### ✅ Funcionalidades Completas
- [x] **Read**: Carregar dados do perfil da API
- [x] **Update**: Atualizar dados do perfil
- [x] **Avatar**: Upload e remoção de foto de perfil
- [x] **Validações**: Email, telefone, data de nascimento
- [x] **Fallback**: Dados padrão se API falhar
- [x] **Logout**: Integração com API de logout

### 🔄 Funcionalidades Pendentes
- [ ] **Create**: Cadastro de novos usuários com perfil completo
- [ ] **Delete**: Exclusão de usuários
- [ ] **Modal de Edição**: Interface para editar perfil
- [ ] **Sessão**: Sistema de autenticação completo

## 🎯 Como Usar

### 1. Acessar o Perfil
Navegue para `profile.html` - os dados serão carregados automaticamente da API.

### 2. Alterar Foto
- Clique no ícone de câmera no avatar
- Selecione uma imagem
- A foto será salva no localStorage e na API

### 3. Remover Foto
- Clique no botão "Remover foto" que aparece quando há uma foto

### 4. Logout
- Clique no botão "Sair" para encerrar a sessão

## 🛠️ Desenvolvimento

### Adicionar Novos Campos
1. Atualizar `User.php` com novos getters/setters
2. Modificar `UserRepository.php` para incluir novos campos
3. Atualizar `UserService.php` com validações
4. Adicionar campos no banco de dados
5. Atualizar `profile.html` para exibir novos campos

### Implementar Modal de Edição
```javascript
// Exemplo de implementação futura
editProfileBtn.addEventListener('click', () => {
    // Abrir modal com formulário de edição
    const modal = document.getElementById('edit-profile-modal');
    modal.style.display = 'block';
    
    // Preencher formulário com dados atuais
    document.getElementById('edit-name').value = profileName.textContent;
    // ... outros campos
});
```

## 🔒 Segurança

- Validação de entrada em todos os campos
- Sanitização de dados
- Verificação de email único
- Validação de formato de data
- Verificação de telefone

## 📝 Notas Importantes

1. **ID do Usuário**: Atualmente fixo como `1` para o usuário padrão
2. **Sessão**: Sistema de sessão básico implementado
3. **CORS**: Configurado para permitir requisições cross-origin
4. **Fallback**: Se a API falhar, usa dados padrão do localStorage

## 🐛 Troubleshooting

### Erro 404 na API
- Verifique se o servidor web está rodando
- Confirme se as rotas estão configuradas corretamente
- Verifique o arquivo `.htaccess` se estiver usando Apache

### Erro de Conexão com Banco
- Verifique as credenciais em `Connection.php`
- Confirme se o banco está rodando
- Execute o script SQL de atualização

### Avatar não Carrega
- Verifique se o localStorage está funcionando
- Confirme se a API está retornando o avatarUrl
- Verifique o console do navegador para erros

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Console do navegador (F12)
2. Logs do servidor PHP
3. Logs do banco de dados MySQL 