# Nexo Drive

Um aplicativo de armazenamento e compartilhamento de arquivos construído com React, Vite e Supabase.

## 🤖 Guia de Implementação para IAs

Este guia foi especialmente desenvolvido para auxiliar IAs na criação e configuração deste projeto Vite + React + Supabase.

### 1. Estrutura Inicial do Projeto

Primeiro, crie um novo projeto Vite com TypeScript e React:

```bash
npm create vite@latest nome-do-projeto -- --template react-ts
```

#### 1.1 Dependências Necessárias

Atualize o `package.json` com as seguintes dependências:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.7",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-toastify": "^10.0.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2"
  }
}
```

### 2. Configuração do Ambiente

#### 2.1 Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto. As variáveis serão preenchidas automaticamente após conectar ao Supabase:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

#### 2.2 Configuração do Vite

O `vite.config.ts` deve ser configurado para:
- Otimizar dependências
- Configurar o servidor de desenvolvimento
- Definir opções de build

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', '@supabase/supabase-js', 'react-toastify']
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'react-toastify'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  },
  server: {
    host: true,
    port: 6002,
    strictPort: true,
    hmr: {
      overlay: true
    },
    cors: true
  }
});
```

### 3. Configuração do Supabase

#### 3.1 Cliente Supabase

Crie o arquivo `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 3.2 Tratamento de Erros

Implemente um ErrorBoundary para capturar erros relacionados ao Supabase:

```typescript
// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const isSupabaseError = this.state.error?.message.includes('Supabase');
      
      return (
        <div className="error-container">
          {isSupabaseError ? (
            <p>Por favor, conecte-se ao Supabase usando o botão "Connect to Supabase"</p>
          ) : (
            <p>Ocorreu um erro inesperado. Por favor, tente novamente.</p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 4. Possíveis Erros e Soluções

#### 4.1 Erro: "Supabase environment variables are missing"

**Causa**: Variáveis de ambiente não configuradas ou não carregadas.

**Solução**:
1. Verifique se o botão "Connect to Supabase" está visível
2. Clique no botão e siga o processo de conexão
3. Confirme que o arquivo `.env` foi criado com as variáveis corretas
4. Reinicie o servidor de desenvolvimento

#### 4.2 Erro: "Failed to fetch" em chamadas Supabase

**Causa**: Problemas de conectividade ou configuração incorreta.

**Solução**:
1. Verifique se o projeto Supabase está ativo
2. Confirme se as variáveis de ambiente estão corretas
3. Verifique se o RLS está configurado corretamente
4. Teste a conexão usando o cliente Supabase

#### 4.3 Erro: "TypeError: Cannot read properties of undefined (reading 'supabase')"

**Causa**: Cliente Supabase não inicializado corretamente.

**Solução**:
1. Verifique se o arquivo `supabase.ts` está sendo importado corretamente
2. Confirme que o cliente está sendo exportado como esperado
3. Verifique se não há importações circulares

### 5. Boas Práticas

1. **Tipagem**:
   - Sempre use TypeScript
   - Defina interfaces para todos os modelos de dados
   - Use tipos estritos para as respostas do Supabase

2. **Segurança**:
   - Nunca exponha chaves secretas
   - Sempre use RLS
   - Implemente autenticação adequadamente

3. **Performance**:
   - Use lazy loading para componentes grandes
   - Implemente caching quando apropriado
   - Otimize queries do Supabase

### 6. Checklist de Implementação

- [ ] Projeto Vite criado com template React + TypeScript
- [ ] Dependências instaladas e configuradas
- [ ] Variáveis de ambiente configuradas
- [ ] Cliente Supabase inicializado
- [ ] ErrorBoundary implementado
- [ ] Autenticação configurada
- [ ] RLS configurado
- [ ] Testes implementados
- [ ] Build testado

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

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de Autenticação](https://supabase.com/docs/guides/auth)
- [Documentação do Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.