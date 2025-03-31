# Configuração do Supabase para o Formulário de Contato

Este documento contém instruções para configurar o Supabase como back-end exclusivo para o formulário de contato do seu portfólio.

## Passo 1: Criar uma conta no Supabase

1. Acesse [Supabase](https://supabase.com/) e crie uma conta ou faça login
2. Crie um novo projeto
3. Anote a URL do projeto e a chave anônima (você precisará desses dados depois)

## Passo 2: Criar tabela para as mensagens de contato

1. No painel do Supabase, vá para a seção **Table Editor**
2. Clique em **New Table**
3. Configure a tabela com os seguintes campos:

| Nome da coluna | Tipo de dado | Padrão | Configurações |
|---------------|-------------|--------|--------------|
| id            | uuid        | uuid_generate_v4() | primary key |
| created_at    | timestamp with time zone | now() | |
| name          | text        | | not null |
| email         | text        | | not null |
| subject       | text        | | not null |
| message       | text        | | not null |
| read          | boolean     | false | |
| source        | text        | 'portfolio_website' | |
| user_agent    | text        | | |

4. Clique em **Save** para criar a tabela

## Passo 3: Configurar políticas de segurança (RLS)

1. Na seção **Authentication** > **Policies**, encontre a tabela que você criou
2. Clique em **New Policy**
3. Para permitir inserções públicas (necessário para o formulário de contato):
   - Selecione o template **Insert only**
   - Dê um nome como "Allow public inserts"
   - Na condição, use `true` para permitir todas as inserções
   - Em **WITH CHECK**, use `true` também
   - Clique em **Save policy**

## Status atual

✅ O formulário agora está configurado para enviar mensagens diretamente para o Supabase.
✅ Não há mais dependência de serviços de terceiros como FormSubmit.
✅ Todas as mensagens são armazenadas no banco de dados e podem ser acessadas pelo painel administrativo.

## Como acessar as mensagens enviadas

Você pode ver todas as mensagens enviadas de duas formas:

1. **Diretamente no painel do Supabase**:
   - Vá para o painel do Supabase > **Table Editor** > **contacts**
   - Você verá todas as mensagens enviadas com data e hora

2. **Através do painel admin personalizado**:
   - Acesse admin.html (requer autenticação)
   - As credenciais padrão são:
     - Email: admin@example.com
     - Senha: senha123
   - Recomenda-se alterar essas credenciais em um ambiente de produção

## Para desenvolvedores

Se precisar modificar como as mensagens são enviadas, você pode editar o código em:

- `js/script.js` - função `setupContactForm()`
- `js/supabase-config.js` - configuração da conexão com o Supabase

## Recursos adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Exemplos de JavaScript](https://supabase.com/docs/reference/javascript/introduction) 