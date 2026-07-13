# Evolves - App CRM

Este projeto é um protótipo funcional de um CRM Imobiliário focado em produtividade e relacionamento com clientes. A aplicação simula o fluxo completo de gestão de leads, atendimento (método FORD), pipeline (funil de vendas) e roteiros de visita.

## Tecnologias Utilizadas
- **Next.js (App Router)**
- **React**
- **Tailwind CSS** (para estilização e Design System)
- **Lucide React** (para ícones)
- **TypeScript**

## Como executar o projeto localmente

Instale as dependências:
```bash
bun install
```

Inicie o servidor de desenvolvimento:
```bash
bun run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Principais Funcionalidades
- **Gestão de Atendimentos:** Ficha detalhada do cliente com histórico (timeline), anotações, e-mails e método FORD.
- **Funil de Vendas (Negócios):** Gestão visual do pipeline de clientes com suporte à criação e edição dinâmica de etapas do funil.
- **Agenda de Atividades:** Planejamento e acompanhamento de tarefas e visitas, com sistema de navegação por datas e destaque automático para atividades em atraso.
- **Roteiros de Visita:** Atividades do tipo "visita" permitem anexar múltiplos imóveis, reordenar a rota, gerar termos de visita e navegar até o local via Google Maps.
- **Acesso Rápido:** Botão "+" global para inserir leads, tarefas e negócios rapidamente em qualquer tela.
- **Publicação Omni-channel:** Ferramenta integrada de postagem em lote para múltiplas redes sociais, alimentada por IA geradora de legendas e vídeos.
- **Meu Desempenho:** Dashboard em tempo real do progresso das metas com visualização interativa do funil de conversão.
- **Multi-Tenant Rápido:** Alternância instantânea de contexto de corretora ("estilo Nubank") na home do aplicativo.

## Estado Global
Os dados do aplicativo (clientes, imóveis, configurações de funil, atividades) estão localizados no arquivo `lib/app-data.ts`.
Como o protótipo não utiliza um backend real no momento, as atualizações de estado entre as diferentes abas da tela principal disparam e escutam eventos nativos do navegador (`window.dispatchEvent(new CustomEvent('app-data-updated'))`) para manter a reatividade da interface sempre sincronizada.
