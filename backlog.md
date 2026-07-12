# Backlog de Recursos Futuros (Product Backlog)

Este documento registra e estrutura os requisitos arquiteturais e de interface para as próximas implementações do aplicativo **Evolves CRM**.

---

## 1. Visualização de Leads Interessados no Imóvel
### Requisitos
* **Interface (Detalhe do Imóvel):** Criação de uma aba dedicada dentro da tela de detalhes do imóvel para listar todos os leads (clientes) que possuem esse imóvel atrelado ao seu histórico de interações, propostas ou visitas.
* **Ação em Massa por IA ("Albert, reaquecer leads"):**
  * Disparador de mensagens em lote alimentado pela LLM (Albert IA).
  * O corretor poderá acionar o Albert para redigir e estruturar mensagens personalizadas de follow-up adaptadas ao histórico individual do lead (ex: *"Ricardo, vi que você tinha gostado do imóvel X, mas a negociação não andou. Ele acabou de ter uma redução de preço de 5%..."*).

---

## 2. Publicação Omni-channel Automatizada
### Requisitos
* **Interface (Carteira de Imóveis):** Seletor múltiplo na listagem de imóveis com limite rígido de seleção de até **10 itens**.
* **Postagem Social:** Inclusão do botão "Publicar nas Redes Sociais" na barra de ações.
* **Integração de Mídia e APIs:** Conectar as APIs do Instagram, TikTok e YouTube para gerar e postar de forma automatizada carrosséis de imagens ou vídeos compilando as fichas técnicas e fotos dos imóveis selecionados na rua.

---

## 3. Arquitetura Multi-tenant para Corretores
### Requisitos
* **Autenticação unificada:** Vinculação da identidade do corretor ao seu identificador nacional de pessoa física (**CPF**) ou número do conselho regional (**CRECI**).
* **Alternância de Sessão (Tenant Switching):**
  * Permitir que o corretor alterne instantaneamente entre duas ou mais imobiliárias parceiras ( tenants ) sem a necessidade de realizar logout e login novamente.
  * O menu lateral ou perfil deve conter um seletor de tenant que altera o escopo dos leads, atividades e funis de venda do banco de dados em tempo de execução de forma isolada e segura.
