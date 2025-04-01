# Nexo Drive

Um aplicativo de armazenamento e compartilhamento de arquivos construído com React, Vite e Supabase.

## 🚨 Resolvendo o Erro de Conexão com Supabase

Se você estiver vendo o erro "Supabase environment variables are missing", siga estas etapas para resolver:

### 1. Conectar ao Supabase

1. Clique no botão "Connect to Supabase" no canto superior direito do WebContainer
2. Faça login com sua conta Supabase ou crie uma nova
3. Selecione um projeto existente ou crie um novo
4. Aguarde a configuração automática

### 2. Verificar Variáveis de Ambiente

As seguintes variáveis de ambiente serão automaticamente adicionadas ao arquivo `.env`:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 3. Configuração do Banco de Dados

O schema do banco de dados será automaticamente criado com:

- Tabela `users` para informações dos usuários
- Tabela `files` para metadados dos arquivos
- Tabela `folders` para estrutura de diretórios
- Políticas de RLS (Row Level Security) para controle de acesso
- Bucket de storage para armazenamento de arquivos

### 4. Reiniciar o Servidor

Se necessário, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🔧 Solução de Problemas

### O erro persiste após conectar?

1. Verifique se o arquivo `.env` existe e contém as variáveis corretas
2. Certifique-se de que as variáveis começam com `VITE_`
3. Confirme que não há espaços ou caracteres especiais nos valores

### Erro de autenticação?

1. Verifique se a chave anônima (ANON_KEY) está correta
2. Confirme se o projeto Supabase está ativo
3. Verifique se o Email Auth está habilitado no Supabase Dashboard

### Erro de permissão no banco de dados?

1. Verifique se as políticas RLS estão ativas
2. Confirme se as migrations foram executadas corretamente
3. Verifique se o usuário tem as permissões necessárias

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de Autenticação](https://supabase.com/docs/guides/auth)
- [Documentação do Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Emanuel Luis** - *Trabalho inicial* - [GitHub](https://github.com/seunome)

## 🙏 Agradecimentos

- Equipe Supabase pelo excelente serviço
- Comunidade React
- Contribuidores do projeto