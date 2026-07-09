export type TourType = 'general' | 'imoveis' | 'clientes' | 'albert';

export interface TourStep {
  title: string;
  text: string;
  targetId: string;
  finalActionLabel?: string;
  autoClickElementId?: string; // ID of element to simulate click when entering step
  clickOnNext?: string; // ID of element to simulate click when clicking Next
}

export const ONBOARDING_TOURS: Record<TourType, TourStep[]> = {
  general: [
    {
      title: 'Tudo começa aqui!',
      text: 'Este é o coração do aplicativo. Adicione rapidamente novos imóveis, clientes, atividades e negócios com poucos toques.',
      targetId: 'tour-target-quickadd-menu',
      autoClickElementId: 'tour-target-add-fab',
      clickOnNext: 'tour-target-quickadd-backdrop',
    },
    {
      title: 'Acompanhe seu progresso',
      text: 'Suas metas mensais, definidas pela gestão da imobiliária, e sua agenda do dia ficam aqui. Saiba exatamente o que fazer hoje.',
      targetId: 'tour-target-goals',
    },
    {
      title: 'Não deixe negócios esfriarem',
      text: 'Acompanhe todas as etapas das suas negociações em tempo real. Movimente seus leads e feche mais vendas.',
      targetId: 'secao-leads',
    },
    {
      title: 'Domine o aplicativo',
      text: 'Quer virar um especialista? Acesse seu perfil e conheça a **Trilha do Sucesso** para aprender dicas avançadas e otimizar seus cadastros.',
      targetId: 'tour-target-profile-btn',
      finalActionLabel: 'Começar a usar',
    },
  ],
  imoveis: [
    {
      title: 'Ação Rápida',
      text: 'No botão de ação rápida você encontra atalhos. Vamos captar um imóvel.',
      targetId: 'tour-target-add-fab',
      autoClickElementId: 'tour-target-add-fab',
    },
    {
      title: 'Captar Imóvel',
      text: 'Selecione esta opção para começar a adicionar um novo imóvel.',
      targetId: 'tour-target-quickadd-imovel',
      clickOnNext: 'tour-target-quickadd-imovel',
    },
    {
      title: 'Cadastro com Inteligência Artificial',
      text: 'Sem tempo para digitar? Suba as fotos do imóvel e nossa IA faz o trabalho pesado de preencher os dados para você!',
      targetId: 'tour-target-imoveis-ia',
    },
    {
      title: 'Preenchimento Manual',
      text: 'Se preferir, você pode preencher os dados do seu jeito.',
      targetId: 'tour-target-preencher-manualmente',
      clickOnNext: 'tour-target-preencher-manualmente',
    },
    {
      title: 'Cadastro Fast',
      text: 'Está na rua e precisa de agilidade? Use o Cadastro Fast para salvar as informações básicas e não perder a captação.',
      targetId: 'tour-target-imoveis-fast',
    },
    {
      title: 'Cadastro Completo',
      text: 'Para publicar e vender, use o Cadastro Completo. Preencha metragem, proprietário e todos os detalhes web diretamente pelo app.',
      targetId: 'tour-target-imoveis-completo',
    },
  ],
  clientes: [
    {
      title: 'Categorização',
      text: 'Aqui você organiza sua base de contatos. Cadastre e filtre entre Proprietários, Locatários e Compradores em potencial.',
      targetId: 'tour-target-clientes-filter',
      autoClickElementId: 'tab-clientes',
    },
    {
      title: 'Histórico e Atividades',
      text: 'Clique em qualquer cliente para registrar ligações, visitas ou enviar novos contatos direto da sua agenda.',
      targetId: 'tour-target-clientes-list',
    },
  ],
  albert: [
    {
      title: 'Seu Assistente Pessoal',
      text: 'Conheça o Albert. Ele qualifica seus leads automaticamente enquanto você foca no que importa: fechar negócios.',
      targetId: 'tour-target-albert-intro',
    },
    {
      title: 'Interação em Tempo Real',
      text: 'Veja o histórico das conversas do Albert com os leads e assuma o controle da negociação no momento perfeito.',
      targetId: 'tour-target-albert-chat',
    },
  ],
};
