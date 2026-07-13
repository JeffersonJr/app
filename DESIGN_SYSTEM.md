# Evolves - Design System e Documentação Técnica

O projeto **Evolves** baseia-se em um Design System (DS) leve, flexível e orientado a produtividade para a gestão imobiliária. A base da interface é projetada para o ambiente mobile/tablet (PWA first) com foco em navegação ágil.

## Estrutura de Cores e Estilos Globais
Os estilos globais e definições do tema estão em `app/globals.css`, geridos pelo **Tailwind CSS**.
- **Cores Principais:** Tons de Teal (`teal-light`, `teal-mid`, `teal-deep`) são usados para reforçar a identidade visual.
- **Tons Neutros:** Usamos classes customizadas (`background`, `card`, `muted`, `foreground`, `border`) baseadas em variáveis CSS para dar suporte nativo a temas claros/escuros.
- **Destaques Visuais:** Cores semânticas como `amber` (para "Quente" ou pendências), `red-500` (para atrasos) e verde (`primary`) para ações de sucesso.

## Componentes Principais
Os componentes residem em `components/app/` e são orquestrados por `app/crm/page.tsx` através de um Tab System.

### 1. Navegação Base (`TabBar`)
A barra inferior coordena o roteamento falso do App (Single Page Architecture). As abas disponíveis são:
- `hoje`: Visão consolidada das métricas, agenda diária (estrita a hoje), leads prioritários e seletor de Imobiliária Ativa.
- `negocios`: Gestão visual do pipeline de vendas, permitindo mover leads entre etapas.
- `atividades`: Visualização da agenda completa com o **Navegador de Datas**.
- `imoveis`: Catálogo e buscador de imóveis e empreendimentos.
- `clientes`: Banco de dados de perfis de contatos.

### 2. Seletor Multi-Tenant (Estilo Nubank)
- **Localização:** Home (`ScreenHoje`).
- **Comportamento:** Permite trocar a imobiliária parceira ativa através de um bottom sheet rápido. Atualiza a carteira de imóveis em tempo de execução sem exigir login/logout.

### 3. Modo Roleta (Insane/Hercules Mode)
- **Gatilho:** Exibido se o corretor acumular mais de 3 atividades pendentes/atrasadas.
- **Visual:** Visão em tela cheia com cartões empilhados (Stack Card). Ao concluir a tarefa com feedback por voz (editável), o cartão sofre uma transição fluida de slide ("Frup"). Finaliza com tela cheia de celebração de confetes ao zerar a pilha.

### 4. Gravador e Transcritor de Áudio Universal
- **Comportamento:** Sempre que um áudio é gravado (Conclusão de tarefas, Modo Roleta, Avaliação de Imóvel Visitado, Negócio Ganho/Perdido), o Albert IA transcreve o áudio em tempo real e insere em um campo de texto (`textarea`) completamente editável. O usuário pode validar e corrigir a transcrição antes de salvar no banco.

## Gerenciamento de Estado (Mock)
A fonte da verdade é `lib/app-data.ts`.
- **Comunicação de Atualização:** Notificação global via `CustomEvent` através de `window.dispatchEvent(new CustomEvent('app-data-updated'))`.
- **Helpers Importantes:**
  - `isAtividadeAtrasada(dataStr, horaStr)`: Utilizado universalmente no sistema para calcular se um agendamento já passou.
