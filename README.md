# Food Now

Food Now é uma aplicação web para pedidos de comida, construída com Angular.

## Tecnologias Utilizadas

- **Frontend**: Angular, TypeScript, RxJS
- **Estilos**: SCSS, Bootstrap, Sweet Alert 2
- **Gerenciamento de Pacotes**: pnpm
- **Testes**: Jest
- **Ícones**: Bootstrap Icons

## Funcionalidades

- **Cadastro de Endereço**: Permite ao usuário cadastrar e salvar o endereço de entrega.
- **Carrinho de Compras**: Adicione, remova e visualize itens no carrinho de compras.
- **Finalização de Pedido**: Página para revisar e confirmar o pedido.
- **Lista de Alimentos**: Visualize uma lista de alimentos disponíveis para pedido, com filtros por categoria.
- **Confirmação de Pedido**: Página de confirmação de pedido com status de entrega.
- **Formulário de Pagamento**: Selecione e salve o método de pagamento preferido.
- **Busca por CEP**: Busca automática de endereço com base no CEP informado.

## Estrutura de Componentes

- **Address Form**: Formulário para inserção do endereço de entrega.
- **Cart**: Componente de carrinho de compras.
- **Checkout**: Página de finalização de pedido.
- **Food List**: Lista de alimentos disponíveis para pedido.
- **Header**: Componente de cabeçalho com logo e botão de carrinho.
- **Order Confirmation**: Página de confirmação de pedido.
- **Payment Form**: Formulário para seleção do método de pagamento.

## Serviços

- **CartService**: Gerencia itens do carrinho.
- **CheckoutService**: Gerencia métodos de pagamento e endereço.
- **CepService**: Busca dados de endereço com base no CEP.
- **FoodService**: Obtém dados dos alimentos disponíveis para pedido.

## Convencional Commits

Este projeto segue a especificação de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## CI/CD

Este projeto utiliza GitHub Actions para CI/CD. O pipeline está configurado para executar os testes unitários com Jest e os testes end-to-end com Playwright. Após a execução dos testes, o projeto é implantado automaticamente no Vercel.

O arquivo de configuração do GitHub Actions pode ser encontrado em `.github/workflows/ci.yml`.

## Instalação

Para instalar e executar o projeto localmente, siga estas etapas:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/food-now.git
   cd food-now

   ```

2. Instale as dependências:

   ```bash
   npm install -g pnpm
   pnpm install

   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm start

   ```

4. Abra o navegador e navegue para `http://localhost:4200/`.

## Configuração de Testes

Os testes são configurados usando Jest. Para rodar os testes, use:

```bash
pnpm test
```
![Captura de tela de 2024-12-27 12-56-17](https://github.com/user-attachments/assets/eaf540cb-b82c-4500-9b17-9627c4803803)

