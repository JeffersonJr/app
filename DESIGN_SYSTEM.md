# Evolves - Design System e Documentação Técnica

O projeto **Evolves** baseia-se em um Design System (DS) leve, flexível e orientado a produtividade para a gestão imobiliária. A base da interface é projetada para o ambiente mobile/tablet (PWA first) com foco em navegação ágil.

## Estrutura de Cores e Estilos Globais
Os estilos globais e definições do tema estão em `app/globals.css`, geridos pelo **Tailwind CSS**.
- **Cores Principais:** Tons de Teal (`teal-light`, `teal-mid`, `teal-deep`) são usados para reforçar a identidade visual.
- **Tons Neutros:** Usamos classes customizadas (`background`, `card`, `muted`, `foreground`, `border`) baseadas em variáveis CSS para dar suporte nativo a temas claros/escuros e facilitar a leitura.
- **Destaques Visuais:** Cores semânticas como `amber` (para "Quente" ou pendências), `red-500` (para atrasos) e verde (`primary`) para ações de sucesso.

## Componentes Principais
Os componentes residem em `components/app/` e são orquestrados por `app/crm/page.tsx` através de um Tab System.

### 1. Navegação Base (`TabBar`)
A barra inferior coordena o roteamento falso do App (Single Page Architecture). As abas disponíveis são:
- `hoje`: Visão consolidada das métricas, agenda diária (estrita a hoje) e leads prioritários.
- `negocios`: Gestão visual do pipeline de vendas, permitindo mover leads entre etapas, criar novas etapas e gerenciar funis.
- `atividades`: Visualização da agenda completa com o **Navegador de Datas**, permitindo consultar e criar tarefas para qualquer dia e editá-las inline.
- `imoveis`: Catálogo e buscador de imóveis, com gestão de roteiros e compartilhamento.
- `clientes`: Banco de dados de perfis de contatos.

### 2. Ações Rápidas (`QuickAddSheet`)
O "FAB" (Floating Action Button) de `+` abre uma Sheet com três abas que cobrem as principais necessidades do CRM: Novo Lead, Nova Atividade e Novo Negócio. Este componente coordena o estado e repassa os dados para os forms respectivos.

### 3. Formulários (`FormNovaAtividade`, etc)
Formulários otimizados que criam registros sem forçar recarregamentos, salvando diretamente na memória `app-data.ts`.
**Destaque Técnico:**
- `FormNovaAtividade` foi refatorado recentemente para suportar tanto a *criação* quanto a *edição* de atividades, verificando pelo id. Efetua a criação de forma local/desvinculada, gerando um "feedback toast" ao usuário se não houver cliente preenchido.

## Gerenciamento de Estado (Mock)
A fonte da verdade é `lib/app-data.ts`.
- **Comunicação de Atualização:** Como os componentes são irmãos na renderização global, a atualização do estado é feita escutando um `CustomEvent` via `window.dispatchEvent(new CustomEvent('app-data-updated'))`. Componentes chave possuem `useEffect` amarrados a este listener para redesenhar a tela assim que um CRUD é concluído.
- **Helpers Importantes:**
  - `isAtividadeAtrasada(dataStr, horaStr)`: Utilizado universalmente no sistema para calcular, com base em datas nos formatos `DD/MM/YYYY` e `YYYY-MM-DD`, e na hora atual, se um agendamento já passou. Quando isso ocorre, o card de atividade ganha um badge e texto vermelhos `ATRASADA` imediatamente.

## Novos Recursos (Implementações Recentes)
- **Navegador de Datas na Agenda:** A aba "Atividades" permite alternar entre dias livremente, enquanto a "Home" está restrita ao filtro global de `isHoje`.
- **Sincronização de Etapas no Funil:** A funcionalidade de gerenciar e criar novas etapas dentro do "Funil" reflete automaticamente no seletor de etapas do perfil de um `Atendimento`.
- **Feedbacks Visuais sem Bloqueio de Fluxo:** Se uma atividade for criada sem associação de negócio/cliente direto da raiz da agenda, o modal se fecha retornando um Toast sem forçar mudança de aba, melhorando a UX do corretor em momentos de registro rápido.
