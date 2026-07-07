module.exports = [
"[project]/lib/feature-flags.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Feature flags do sistema Microsistec
 * 
 * temIA: controla acesso às funcionalidades de Inteligência Artificial:
 *   - Cadastro de imóveis via análise de fotos (IA)
 *   - Albert — IA de atendimento, follow-up automático de leads
 *
 * Em produção, esse valor virá do perfil do usuário / plano contratado.
 * Para simular usuário SEM IA: false
 * Para simular usuário COM IA: true
 */ __turbopack_context__.s([
    "featureFlags",
    ()=>featureFlags
]);
const featureFlags = {
    temIA: false
};
}),
"[project]/lib/app-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "atendimentos",
    ()=>atendimentos,
    "atividadesHoje",
    ()=>atividadesHoje,
    "clientes",
    ()=>clientes,
    "etapaConfig",
    ()=>etapaConfig,
    "funil",
    ()=>funil,
    "funis",
    ()=>funis,
    "getFunil",
    ()=>getFunil,
    "imoveis",
    ()=>imoveis,
    "origemConfig",
    ()=>origemConfig,
    "perfilVazio",
    ()=>perfilVazio,
    "tempConfig",
    ()=>tempConfig,
    "tipoAtividadeConfig",
    ()=>tipoAtividadeConfig
]);
const funis = [
    {
        id: 'principal',
        nome: 'Principal',
        descricao: 'Funil padrão de vendas',
        cor: 'bg-primary text-primary-foreground'
    },
    {
        id: 'alto-padrao',
        nome: 'Alto Padrão',
        descricao: 'Imóveis acima de R$ 1,5M',
        cor: 'bg-amber text-ink'
    },
    {
        id: 'locacoes',
        nome: 'Locações',
        descricao: 'Contratos de locação',
        cor: 'bg-teal-mid text-white'
    }
];
const perfilVazio = {
    finalidade: '',
    tipoImovel: 'Apartamento',
    cidades: [
        'São Paulo'
    ],
    bairros: [],
    quartos: null,
    suites: null,
    vagas: null,
    areaMin: null,
    areaMax: null,
    valorMin: '',
    valorMax: '',
    andar: '',
    lazer: false,
    varanda: false,
    mobiliado: false,
    aceitaFinanciamento: false,
    prazoParaComprar: 'Imediato',
    observacoes: '',
    metodo4Q: {
        quem: '',
        oQue: '',
        quando: '',
        quanto: ''
    },
    metodoFORD: {
        familia: '',
        ocupacao: '',
        recreacao: '',
        sonhos: ''
    }
};
const atendimentos = [
    {
        id: 'l1',
        nome: 'Mariana Costa',
        iniciais: 'MC',
        email: 'mariana.costa@email.com',
        telefone: '(11) 98765-4321',
        etapa: 'agendado',
        temperatura: 'quente',
        status: 'aberto',
        origem: 'Portal ZAP',
        dataEntrada: '30/06/2026',
        ultimaInteracao: 'há 12 min',
        interesse: 'Apto 2 dorms · Jardins',
        valor: 'R$ 890.000',
        modo: 'venda',
        funilId: 'principal',
        perfil: {
            ...perfilVazio,
            finalidade: 'Venda',
            tipoImovel: 'Apartamento',
            cidades: [
                'São Paulo'
            ],
            bairros: [
                'Jardins',
                'Itaim Bibi'
            ],
            quartos: 2,
            suites: 1,
            vagas: 2,
            areaMin: 70,
            areaMax: 120,
            valorMin: 'R$ 700.000',
            valorMax: 'R$ 1.000.000',
            lazer: true,
            varanda: true,
            prazoParaComprar: '1-3 meses',
            observacoes: 'Prefere andar alto. Não quer térreo.',
            metodo4Q: {
                quem: 'Ela e o marido decidem',
                oQue: 'Apartamento com varanda gourmet, min 2 dorms',
                quando: 'Até o final do ano',
                quanto: 'Orçamento de até 1 milhão'
            },
            metodoFORD: {
                familia: 'Casada, um filho pequeno (3 anos)',
                ocupacao: 'Arquiteta em escritório próprio',
                recreacao: 'Gosta de receber amigos e churrasco no fds',
                sonhos: 'Morar perto do parque Ibirapuera'
            }
        },
        notas: [
            {
                id: 'n1',
                texto: 'Cliente muito animada, quer visitar no sábado pela manhã.',
                criadoEm: 'Hoje, 09:45'
            }
        ],
        atividades: [
            {
                id: 'a2',
                tipo: 'visita',
                titulo: 'Visita — Cobertura Vila Nova',
                descricao: 'Chegar 15 minutos antes para abrir as janelas e verificar se o proprietário já deixou as chaves na portaria conforme combinado.',
                data: 'Hoje',
                hora: '15:00',
                importante: true,
                concluida: false,
                criadoEm: 'Hoje, 09:32'
            }
        ],
        emails: [
            {
                id: 'e1',
                assunto: 'Imóvel MS-1042 — Apartamento Jardins',
                para: 'mariana.costa@email.com',
                corpo: 'Olá Mariana, segue a ficha do imóvel conforme combinado...',
                enviadoEm: 'Ontem, 16:10'
            }
        ],
        documentos: [
            {
                id: 'd10',
                nome: 'Proposta_Comercial_Mariana.pdf',
                tipo: 'pdf',
                url: '#',
                anexadoEm: 'Ontem'
            },
            {
                id: 'd11',
                nome: 'Identidade_Mariana.jpg',
                tipo: 'jpg',
                url: '#',
                anexadoEm: 'Hoje'
            }
        ],
        imoveisEnviados: [
            {
                id: 'ie1',
                codigoImovel: 'MS-1042',
                tituloImovel: 'Apartamento com varanda gourmet',
                enviadoPor: 'email',
                enviadoEm: 'Ontem, 16:10'
            }
        ],
        timeline: [
            {
                id: 't1',
                tipo: 'atividade',
                descricao: 'Visita agendada — Apto Jardins MS-1042',
                data: 'Hoje',
                hora: '09:32',
                importante: true
            },
            {
                id: 't2',
                tipo: 'nota',
                descricao: 'Cliente animada, quer visitar no sábado.',
                data: 'Hoje',
                hora: '09:45'
            },
            {
                id: 't3',
                tipo: 'email',
                descricao: 'E-mail enviado: ficha do imóvel MS-1042',
                data: 'Ontem',
                hora: '16:10'
            },
            {
                id: 't4',
                tipo: 'imovel_enviado',
                descricao: 'Imóvel MS-1042 enviado por e-mail',
                data: 'Ontem',
                hora: '16:10'
            },
            {
                id: 't5',
                tipo: 'origem',
                descricao: 'Lead captado via Portal ZAP',
                data: '30/06',
                hora: '08:22'
            }
        ],
        albert: {
            ativo: false,
            dia: '',
            hora: '',
            instrucoes: ''
        }
    },
    {
        id: 'l2',
        nome: 'Ricardo Almeida',
        iniciais: 'RA',
        email: 'ricardo.almeida@email.com',
        telefone: '(11) 95432-1098',
        etapa: 'qualificando',
        temperatura: 'morno',
        status: 'aberto',
        origem: 'Site Próprio',
        dataEntrada: '04/07/2026',
        ultimaInteracao: 'há 2 h',
        interesse: 'Casa em condomínio',
        valor: 'R$ 1.450.000',
        modo: 'venda',
        funilId: 'principal',
        perfil: {
            ...perfilVazio,
            finalidade: 'Venda',
            tipoImovel: 'Casa',
            cidades: [
                'Barueri'
            ],
            bairros: [
                'Alphaville'
            ],
            quartos: 4,
            suites: 2,
            vagas: 3,
            valorMin: 'R$ 1.200.000',
            valorMax: 'R$ 1.600.000',
            lazer: true,
            prazoParaComprar: '3-6 meses',
            observacoes: 'Precisa de condomínio fechado com segurança 24h.'
        },
        notas: [
            {
                id: 'n1',
                texto: 'Cliente prefere região de Alphaville. Enfatizou segurança como prioridade 1.',
                criadoEm: '04/07'
            }
        ],
        atividades: [
            {
                id: 'a2',
                tipo: 'ligacao',
                titulo: 'Alinhamento de perfil',
                descricao: 'Ligar para detalhar o que a esposa achou dos imoveis.',
                data: '2026-07-07',
                hora: '10:00',
                importante: false,
                concluida: false,
                criadoEm: 'Hoje'
            },
            {
                id: 'a3',
                tipo: 'reuniao',
                titulo: 'Primeiro contato (Qualificação)',
                descricao: 'Entender a real motivação de compra e confirmar budget.',
                data: '2026-07-04',
                hora: '14:45',
                importante: true,
                concluida: true,
                criadoEm: '04/07'
            }
        ],
        emails: [],
        documentos: [
            {
                id: 'd1',
                nome: 'Cópia CNH Ricardo.pdf',
                tipo: 'pdf',
                url: '#',
                anexadoEm: 'Ontem'
            },
            {
                id: 'd2',
                nome: 'Comprovante_Residencia.png',
                tipo: 'png',
                url: '#',
                anexadoEm: 'Hoje'
            }
        ],
        imoveisEnviados: [],
        timeline: [
            {
                id: 't1',
                tipo: 'origem',
                descricao: 'Lead captado via Site Próprio',
                data: '04/07',
                hora: '14:30'
            },
            {
                id: 't2',
                tipo: 'atividade',
                descricao: 'Primeiro contato (Qualificação) - Concluído',
                data: '04/07',
                hora: '15:10',
                concluida: true
            },
            {
                id: 't3',
                tipo: 'nota',
                descricao: 'Adicionada nota: Cliente prefere região de...',
                data: '04/07',
                hora: '15:15'
            },
            {
                id: 't4',
                tipo: 'documento',
                descricao: 'Documento Cópia CNH Ricardo.pdf anexado',
                data: 'Ontem',
                hora: '10:00'
            }
        ],
        albert: {
            ativo: false,
            dia: '',
            hora: '',
            instrucoes: ''
        }
    },
    {
        id: 'l3',
        nome: 'Fernanda Lima',
        iniciais: 'FL',
        email: 'fe.lima@email.com',
        telefone: '(11) 94321-0987',
        etapa: 'conhecendo',
        temperatura: 'frio',
        status: 'aberto',
        origem: 'Indicação',
        dataEntrada: '01/07/2026',
        ultimaInteracao: 'ontem',
        interesse: 'Studio p/ locação',
        valor: 'R$ 2.800/mês',
        modo: 'locacao',
        funilId: 'locacoes',
        perfil: {
            ...perfilVazio,
            finalidade: 'Locação',
            tipoImovel: 'Studio',
            cidades: [
                'São Paulo'
            ],
            bairros: [
                'Centro',
                'Vila Madalena'
            ],
            quartos: 1,
            suites: 0,
            vagas: 1,
            valorMax: 'R$ 3.500/mês',
            mobiliado: true,
            prazoParaComprar: 'Imediato'
        },
        notas: [],
        atividades: [],
        emails: [],
        documentos: [
            {
                id: 'd30',
                nome: 'Ficha_Locacao_Assinada.pdf',
                tipo: 'pdf',
                url: '#',
                anexadoEm: '02/07/2026'
            }
        ],
        imoveisEnviados: [],
        timeline: [
            {
                id: 't1',
                tipo: 'origem',
                descricao: 'Lead captado por indicação',
                data: '01/07',
                hora: '17:40'
            }
        ],
        albert: {
            ativo: true,
            dia: '08/07/2026',
            hora: '10:00',
            instrucoes: 'Ligar e perguntar se ainda tem interesse na locação.'
        }
    },
    {
        id: 'l4',
        nome: 'Paulo Henrique',
        iniciais: 'PH',
        email: 'paulo.h@email.com',
        telefone: '(11) 97654-3210',
        etapa: 'agendado',
        temperatura: 'quente',
        status: 'aberto',
        origem: 'Instagram',
        dataEntrada: '28/06/2026',
        ultimaInteracao: 'há 40 min',
        interesse: 'Cobertura · Vila Nova',
        valor: 'R$ 2.300.000',
        modo: 'venda',
        funilId: 'alto-padrao',
        perfil: {
            ...perfilVazio,
            finalidade: 'Venda',
            tipoImovel: 'Cobertura',
            cidades: [
                'São Paulo'
            ],
            bairros: [
                'Vila Nova Conceição',
                'Itaim Bibi'
            ],
            quartos: 3,
            suites: 3,
            vagas: 3,
            areaMin: 180,
            valorMin: 'R$ 2.000.000',
            valorMax: 'R$ 3.000.000',
            lazer: true,
            varanda: true,
            prazoParaComprar: 'Imediato'
        },
        notas: [],
        atividades: [
            {
                id: 'av1',
                tipo: 'visita',
                titulo: 'Visita — Cobertura Vila Nova',
                descricao: 'Confirmar com portaria 30min antes.',
                data: '2026-07-06',
                hora: '15:00',
                importante: true,
                concluida: false,
                criadoEm: 'Ontem, 14:20'
            }
        ],
        emails: [],
        documentos: [
            {
                id: 'd40',
                nome: 'Termo_De_Visita.pdf',
                tipo: 'pdf',
                url: '#',
                anexadoEm: 'Ontem'
            }
        ],
        imoveisEnviados: [],
        timeline: [
            {
                id: 't1',
                tipo: 'atividade',
                descricao: 'Visita agendada — Cobertura Vila Nova',
                data: 'Hoje',
                hora: '08:50',
                importante: true
            },
            {
                id: 't2',
                tipo: 'origem',
                descricao: 'Lead captado via Instagram',
                data: '28/06',
                hora: '11:00'
            }
        ],
        albert: {
            ativo: false,
            dia: '',
            hora: '',
            instrucoes: 'Perguntar se ele já analisou a proposta que enviei ontem e verificar se a esposa também aprovou o layout do apartamento.'
        }
    },
    {
        id: 'l5',
        nome: 'Juliana Martins',
        iniciais: 'JM',
        email: 'ju.martins@email.com',
        telefone: '(11) 99876-5432',
        etapa: 'conhecendo',
        temperatura: 'morno',
        status: 'aberto',
        origem: 'Portal VivaReal',
        dataEntrada: '02/07/2026',
        ultimaInteracao: 'há 5 h',
        interesse: 'Apto 3 dorms · Moema',
        valor: 'R$ 1.120.000',
        modo: 'venda',
        funilId: 'principal',
        perfil: {
            ...perfilVazio,
            finalidade: 'Venda',
            tipoImovel: 'Apartamento',
            cidades: [
                'São Paulo'
            ],
            bairros: [
                'Moema',
                'Ibirapuera'
            ],
            quartos: 3,
            suites: 1,
            vagas: 2,
            valorMin: 'R$ 900.000',
            valorMax: 'R$ 1.300.000',
            prazoParaComprar: '3-6 meses'
        },
        notas: [],
        atividades: [],
        emails: [],
        documentos: [
            {
                id: 'd50',
                nome: 'Matricula_Atualizada.pdf',
                tipo: 'pdf',
                url: '#',
                anexadoEm: '03/07/2026'
            },
            {
                id: 'd51',
                nome: 'Planta_Baixa.pdf',
                tipo: 'pdf',
                url: '#',
                anexadoEm: '04/07/2026'
            }
        ],
        imoveisEnviados: [],
        timeline: [
            {
                id: 't1',
                tipo: 'origem',
                descricao: 'Lead captado via Portal VivaReal',
                data: '02/07',
                hora: '09:15'
            }
        ],
        albert: {
            ativo: false,
            dia: '',
            hora: '',
            instrucoes: ''
        }
    },
    {
        id: 'l6',
        nome: 'André Souza',
        iniciais: 'AS',
        email: 'andre.souza@email.com',
        telefone: '(11) 91234-5678',
        etapa: 'negociando',
        temperatura: 'quente',
        status: 'aberto',
        origem: 'Site Próprio',
        dataEntrada: '25/06/2026',
        ultimaInteracao: 'há 1 h',
        interesse: 'Casa cond. Alphaville',
        valor: 'R$ 1.680.000',
        modo: 'venda',
        funilId: 'alto-padrao',
        perfil: {
            ...perfilVazio,
            finalidade: 'Venda',
            tipoImovel: 'Casa',
            cidades: [
                'Barueri'
            ],
            bairros: [
                'Alphaville'
            ],
            quartos: 4,
            suites: 3,
            vagas: 4,
            valorMin: 'R$ 1.500.000',
            valorMax: 'R$ 2.000.000',
            lazer: true,
            prazoParaComprar: 'Imediato',
            aceitaFinanciamento: true
        },
        notas: [],
        atividades: [],
        emails: [],
        documentos: [
            {
                id: 'd60',
                nome: 'Folder_Empreendimento.pdf',
                tipo: 'pdf',
                url: '#',
                anexadoEm: '05/07/2026'
            }
        ],
        imoveisEnviados: [],
        timeline: [
            {
                id: 't1',
                tipo: 'etapa',
                descricao: 'Avançou para Negociando',
                data: 'Hoje',
                hora: '09:00'
            },
            {
                id: 't2',
                tipo: 'origem',
                descricao: 'Lead captado via Site Próprio',
                data: '25/06',
                hora: '10:30'
            }
        ],
        albert: {
            ativo: false,
            dia: '',
            hora: '',
            instrucoes: ''
        }
    },
    {
        id: 'l7',
        nome: 'Beatriz Rocha',
        iniciais: 'BR',
        email: 'bia.rocha@email.com',
        telefone: '(11) 96543-2109',
        etapa: 'negociando',
        temperatura: 'quente',
        status: 'aberto',
        origem: 'Portal ZAP',
        dataEntrada: '20/06/2026',
        ultimaInteracao: 'há 30 min',
        interesse: 'Studio Centro · Venda',
        valor: 'R$ 420.000',
        modo: 'venda',
        funilId: 'principal',
        perfil: {
            ...perfilVazio,
            finalidade: 'Venda',
            tipoImovel: 'Studio',
            cidades: [
                'São Paulo'
            ],
            bairros: [
                'Centro'
            ],
            quartos: 1,
            suites: 0,
            vagas: 1,
            valorMax: 'R$ 500.000',
            prazoParaComprar: 'Imediato'
        },
        notas: [],
        atividades: [],
        emails: [],
        documentos: [
            {
                id: 'd70',
                nome: 'RG_Beatriz.jpg',
                tipo: 'jpg',
                url: '#',
                anexadoEm: '20/06/2026'
            }
        ],
        imoveisEnviados: [],
        timeline: [
            {
                id: 't1',
                tipo: 'status',
                descricao: 'Proposta aceita — aguardando documentação',
                data: 'Hoje',
                hora: '10:05',
                importante: true
            },
            {
                id: 't2',
                tipo: 'origem',
                descricao: 'Lead captado via Portal ZAP',
                data: '20/06',
                hora: '08:00'
            }
        ],
        albert: {
            ativo: false,
            dia: '',
            hora: '',
            instrucoes: ''
        }
    },
    {
        id: 'l8',
        nome: 'Carlos Mendes',
        iniciais: 'CM',
        email: 'carlos.mendes@email.com',
        telefone: '(11) 92345-6789',
        etapa: 'qualificando',
        temperatura: 'morno',
        status: 'aberto',
        origem: 'Facebook',
        dataEntrada: '05/07/2026',
        ultimaInteracao: 'há 3 h',
        interesse: 'Studio · Pinheiros',
        valor: 'R$ 3.500/mês',
        modo: 'locacao',
        funilId: 'locacoes',
        perfil: {
            ...perfilVazio,
            finalidade: 'Locação',
            tipoImovel: 'Studio',
            cidades: [
                'São Paulo'
            ],
            bairros: [
                'Pinheiros',
                'Vila Madalena'
            ],
            quartos: 1,
            suites: 0,
            vagas: 1,
            valorMax: 'R$ 4.000/mês',
            mobiliado: true,
            prazoParaComprar: 'Imediato'
        },
        notas: [],
        atividades: [],
        emails: [],
        documentos: [
            {
                id: 'd80',
                nome: 'Comprovante_de_Renda.pdf',
                tipo: 'pdf',
                url: '#',
                anexadoEm: '22/06/2026'
            }
        ],
        imoveisEnviados: [],
        timeline: [
            {
                id: 't1',
                tipo: 'origem',
                descricao: 'Lead captado via Facebook',
                data: '05/07',
                hora: '10:00'
            }
        ],
        albert: {
            ativo: false,
            dia: '',
            hora: '',
            instrucoes: ''
        }
    }
];
function getFunil(funilId, filtroModo) {
    const lista = atendimentos.filter((a)=>{
        const matchFunil = a.funilId === funilId;
        const matchStatus = a.status === 'aberto';
        const matchModo = !filtroModo || filtroModo === 'todos' || a.modo === filtroModo;
        return matchFunil && matchStatus && matchModo;
    });
    const etapas = [
        {
            id: 'qualificando',
            nome: 'Qualificando'
        },
        {
            id: 'conhecendo',
            nome: 'Conhecendo'
        },
        {
            id: 'agendado',
            nome: 'Agendado'
        },
        {
            id: 'negociando',
            nome: 'Negociando'
        }
    ];
    return etapas.map((e)=>({
            ...e,
            atendimentos: lista.filter((a)=>a.etapa === e.id)
        }));
}
const imoveis = [
    {
        id: 'i1',
        codigo: 'MS-1042',
        titulo: 'Apartamento com varanda gourmet',
        bairro: 'Jardins',
        cidade: 'São Paulo',
        preco: 'R$ 890.000',
        finalidade: 'Venda',
        dorms: 2,
        suites: 1,
        vagas: 2,
        area: 94,
        foto: '/images/imovel-apto-jardins.png',
        status: 'Livre',
        descricao: 'Lindo apartamento nos Jardins com acabamento de alto padrão, varanda gourmet envidraçada e piso em madeira de lei. Excelente iluminação natural.',
        tags: [
            'Aceita financiamento',
            'Lazer completo',
            'Varanda gourmet'
        ],
        condominio: 'R$ 1.200',
        iptu: 'R$ 350',
        caracteristicas: [
            'Ar condicionado',
            'Armários embutidos',
            'Área de serviço',
            'Churrasqueira'
        ],
        proximidades: [
            'Metrô Trianon-Masp',
            'Parque Trianon',
            'Shopping Cidade São Paulo'
        ],
        enderecoCompleto: 'Rua Peixoto Gomide, 1024 - Jardins, São Paulo/SP',
        proprietario: {
            nome: 'Carlos Nogueira',
            telefone: '(11) 98765-4321',
            validade: 'Autorização válida por mais 62 dias'
        }
    },
    {
        id: 'i2',
        codigo: 'MS-0987',
        titulo: 'Casa em condomínio fechado',
        bairro: 'Alphaville',
        cidade: 'Barueri',
        preco: 'R$ 1.680.000',
        finalidade: 'Venda',
        dorms: 4,
        suites: 3,
        vagas: 4,
        area: 320,
        foto: '/images/imovel-casa-condominio.png',
        status: 'Proposta',
        descricao: 'Ampla casa em Alphaville com piscina privativa, área gourmet integrada e pé direito duplo na sala de estar. O condomínio oferece segurança 24h e clube completo.',
        tags: [
            'Piscina',
            'Segurança 24h',
            'Permuta'
        ],
        condominio: 'R$ 1.800',
        iptu: 'R$ 520',
        caracteristicas: [
            'Quintal',
            'Piscina Privativa',
            'Espaço Gourmet',
            'Lareira'
        ],
        proximidades: [
            'Centro Comercial Alphaville',
            'Escola Internacional',
            'Rodovia Castelo Branco'
        ],
        enderecoCompleto: 'Alameda Rio Negro, Condomínio Alpha 2 - Alphaville, Barueri/SP',
        proprietario: {
            nome: 'Mariana Silva',
            telefone: '(11) 97654-3210',
            validade: 'Autorização válida por mais 15 dias'
        }
    },
    {
        id: 'i3',
        codigo: 'MS-1108',
        titulo: 'Studio mobiliado próximo ao metrô',
        bairro: 'Centro',
        cidade: 'São Paulo',
        preco: 'R$ 2.800/mês',
        finalidade: 'Locação',
        dorms: 1,
        suites: 0,
        vagas: 1,
        area: 38,
        foto: '/images/imovel-studio-centro.png',
        status: 'Livre',
        descricao: 'Studio moderno e 100% mobiliado (porteira fechada), a apenas 3 minutos da estação República. Ideal para jovens profissionais ou estudantes.',
        tags: [
            'Mobiliado',
            'Perto do metrô',
            'Academia'
        ],
        condominio: 'R$ 450',
        iptu: 'Isento',
        caracteristicas: [
            'Móveis planejados',
            'Cozinha americana',
            'Fechadura digital',
            'Varanda'
        ],
        proximidades: [
            'Metrô República',
            'Teatro Municipal',
            'Supermercado Extra'
        ],
        enderecoCompleto: 'Avenida Ipiranga, 200 - Centro, São Paulo/SP',
        proprietario: {
            nome: 'João Pedro',
            telefone: '(11) 91234-5678',
            validade: 'Locação exclusiva'
        }
    },
    {
        id: 'i4',
        codigo: 'MS-0871',
        titulo: 'Cobertura duplex com piscina',
        bairro: 'Vila Nova Conceição',
        cidade: 'São Paulo',
        preco: 'R$ 2.300.000',
        finalidade: 'Venda',
        dorms: 3,
        suites: 3,
        vagas: 3,
        area: 210,
        foto: '/images/imovel-cobertura.png',
        status: 'Reservado',
        descricao: 'Cobertura espetacular com vista 360º para o parque Ibirapuera. Possui deck de madeira, piscina aquecida e espaço para adega.',
        tags: [
            'Vista panorâmica',
            'Piscina aquecida',
            'Alto Padrão'
        ],
        condominio: 'R$ 2.500',
        iptu: 'R$ 800',
        caracteristicas: [
            'Deck de madeira',
            'Piscina aquecida',
            'Closet',
            'Dependência de empregados'
        ],
        proximidades: [
            'Parque Ibirapuera',
            'Hospital São Luiz',
            'Praça Pereira Coutinho'
        ],
        enderecoCompleto: 'Rua Jacques Félix, 150 - Vila Nova Conceição, São Paulo/SP',
        proprietario: {
            nome: 'Fernanda Costa',
            telefone: '(11) 95555-4444',
            validade: 'Autorização válida por mais 120 dias'
        }
    }
];
const clientes = [
    {
        id: 'c1',
        nome: 'Mariana Costa',
        iniciais: 'MC',
        tipo: 'Comprador',
        telefone: '(11) 98765-4321',
        email: 'mariana.costa@email.com',
        temperatura: 'quente',
        ultimoContato: 'há 12 min',
        timeline: [
            {
                data: 'Hoje, 09:32',
                evento: 'Respondeu no WhatsApp — quer visitar sábado',
                tipo: 'whatsapp'
            },
            {
                data: 'Ontem, 16:10',
                evento: 'Recebeu ficha do imóvel MS-1042',
                tipo: 'envio'
            },
            {
                data: 'Seg, 11:45',
                evento: 'Lead captado via Portal ZAP',
                tipo: 'origem'
            }
        ]
    },
    {
        id: 'c2',
        nome: 'Paulo Henrique',
        iniciais: 'PH',
        tipo: 'Comprador',
        telefone: '(11) 97654-3210',
        email: 'paulo.h@email.com',
        temperatura: 'quente',
        ultimoContato: 'há 40 min',
        timeline: [
            {
                data: 'Hoje, 08:50',
                evento: 'Visita confirmada para hoje às 15h',
                tipo: 'visita'
            },
            {
                data: 'Qui, 14:20',
                evento: 'Ligação — alinhou expectativa de valor',
                tipo: 'ligacao'
            }
        ]
    },
    {
        id: 'c3',
        nome: 'Beatriz Rocha',
        iniciais: 'BR',
        tipo: 'Comprador',
        telefone: '(11) 96543-2109',
        email: 'bia.rocha@email.com',
        temperatura: 'quente',
        ultimoContato: 'há 30 min',
        timeline: [
            {
                data: 'Hoje, 10:05',
                evento: 'Proposta aceita — aguardando documentação',
                tipo: 'proposta'
            },
            {
                data: 'Ter, 09:00',
                evento: 'Segunda visita ao imóvel MS-1108',
                tipo: 'visita'
            }
        ]
    },
    {
        id: 'c4',
        nome: 'Ricardo Almeida',
        iniciais: 'RA',
        tipo: 'Comprador',
        telefone: '(11) 95432-1098',
        email: 'ricardo.almeida@email.com',
        temperatura: 'morno',
        ultimoContato: 'há 2 h',
        timeline: [
            {
                data: 'Hoje, 08:15',
                evento: 'Solicitou mais opções em Alphaville',
                tipo: 'whatsapp'
            }
        ]
    },
    {
        id: 'c5',
        nome: 'Fernanda Lima',
        iniciais: 'FL',
        tipo: 'Locatário',
        telefone: '(11) 94321-0987',
        email: 'fe.lima@email.com',
        temperatura: 'frio',
        ultimoContato: 'ontem',
        timeline: [
            {
                data: 'Ontem, 17:40',
                evento: 'Lead captado por indicação',
                tipo: 'origem'
            }
        ]
    },
    {
        id: 'c6',
        nome: 'Carlos Nogueira',
        iniciais: 'CN',
        tipo: 'Proprietário',
        telefone: '(11) 93210-9876',
        email: 'carlos.nog@email.com',
        temperatura: 'morno',
        ultimoContato: 'há 3 dias',
        timeline: [
            {
                data: 'Qua, 10:30',
                evento: 'Autorização de venda renovada — 90 dias',
                tipo: 'documento'
            }
        ]
    }
];
const atividadesHoje = [
    {
        id: 'a1',
        hora: '11:00',
        titulo: 'Ligar para follow-up de proposta',
        cliente: 'André Souza',
        telefone: '(11) 99999-1111',
        tipo: 'ligacao',
        concluida: false,
        descricao: 'Perguntar se ele já analisou a proposta que enviei ontem e verificar se a esposa também aprovou o layout do apartamento.'
    },
    {
        id: 'a2',
        hora: '15:00',
        titulo: 'Visita — Cobertura e Imóveis',
        cliente: 'Mariana Costa',
        whatsapp: '(11) 98765-4321',
        tipo: 'visita',
        concluida: false,
        descricao: 'Visita para conhecer opções em Alphaville.',
        imoveisVisitados: [
            {
                id: 'v1',
                nome: 'Casa em condomínio',
                visitado: false,
                endereco: 'Alameda Rio Negro, Barueri'
            },
            {
                id: 'v2',
                nome: 'Cobertura duplex',
                visitado: false,
                endereco: 'Rua Jacques Félix, São Paulo'
            }
        ]
    },
    {
        id: 'a3',
        hora: '17:30',
        titulo: 'Enviar documentação do MS-1108',
        cliente: 'Beatriz Rocha',
        whatsapp: '(11) 96543-2109',
        tipo: 'whatsapp',
        concluida: false
    },
    {
        id: 'a4',
        hora: '09:00',
        titulo: 'Reunião de equipe — metas da semana',
        cliente: 'Equipe Central',
        tipo: 'reuniao',
        concluida: true
    }
];
const tempConfig = {
    quente: {
        label: 'Quente',
        dot: 'bg-amber',
        chip: 'bg-amber/15 text-[#8a5a1e]',
        bg: 'bg-amber'
    },
    morno: {
        label: 'Morno',
        dot: 'bg-teal-mid',
        chip: 'bg-teal-mid/15 text-teal-deep',
        bg: 'bg-teal-mid'
    },
    frio: {
        label: 'Frio',
        dot: 'bg-slate',
        chip: 'bg-fog text-slate',
        bg: 'bg-slate'
    }
};
const etapaConfig = {
    qualificando: {
        label: 'Qualificando',
        cor: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-400'
    },
    conhecendo: {
        label: 'Conhecendo',
        cor: 'bg-indigo/15 text-indigo'
    },
    agendado: {
        label: 'Agendado',
        cor: 'bg-amber/15 text-amber'
    },
    negociando: {
        label: 'Negociando',
        cor: 'bg-primary/20 text-primary'
    }
};
const origemConfig = {
    'Portal ZAP': {
        cor: 'bg-orange-100 text-orange-700'
    },
    'Portal VivaReal': {
        cor: 'bg-blue-100 text-blue-700'
    },
    'Portal OLX': {
        cor: 'bg-purple-100 text-purple-700'
    },
    'Site Próprio': {
        cor: 'bg-teal-deep text-white'
    },
    'Indicação': {
        cor: 'bg-amber/15 text-amber'
    },
    'Ativo': {
        cor: 'bg-purple-500/15 text-purple-600'
    },
    Facebook: {
        cor: 'bg-blue-100 text-blue-800'
    },
    Instagram: {
        cor: 'bg-pink-100 text-pink-700'
    },
    'Cliente de Porta': {
        cor: 'bg-yellow-100 text-yellow-700'
    },
    WhatsApp: {
        cor: 'bg-green-100 text-green-800'
    },
    Ligação: {
        cor: 'bg-gray-100 text-gray-700'
    },
    Novo: {
        cor: 'bg-teal-mid/15 text-teal-deep'
    },
    Outro: {
        cor: 'bg-fog text-slate'
    }
};
const tipoAtividadeConfig = {
    visita: {
        label: 'Visita',
        emoji: '🏠',
        cor: 'bg-teal-mid/15 text-teal-deep'
    },
    reuniao: {
        label: 'Reunião',
        emoji: '👥',
        cor: 'bg-blue-100 text-blue-700'
    },
    ligacao: {
        label: 'Ligação',
        emoji: '📞',
        cor: 'bg-green-100 text-green-700'
    },
    prazo: {
        label: 'Prazo',
        emoji: '⏰',
        cor: 'bg-amber/15 text-[#8a5a1e]'
    },
    'pos-venda': {
        label: 'Pós-venda',
        emoji: '🤝',
        cor: 'bg-purple-100 text-purple-700'
    }
};
const funil = [
    {
        id: 'qualificando',
        nome: 'Qualificando',
        leads: atendimentos.filter((a)=>a.etapa === 'qualificando').map((a)=>({
                id: a.id,
                nome: a.nome,
                iniciais: a.iniciais,
                interesse: a.interesse,
                valor: a.valor,
                temperatura: a.temperatura,
                origem: a.origem,
                atualizado: a.ultimaInteracao
            }))
    },
    {
        id: 'conhecendo',
        nome: 'Conhecendo',
        leads: atendimentos.filter((a)=>a.etapa === 'conhecendo').map((a)=>({
                id: a.id,
                nome: a.nome,
                iniciais: a.iniciais,
                interesse: a.interesse,
                valor: a.valor,
                temperatura: a.temperatura,
                origem: a.origem,
                atualizado: a.ultimaInteracao
            }))
    },
    {
        id: 'agendado',
        nome: 'Agendado',
        leads: atendimentos.filter((a)=>a.etapa === 'agendado').map((a)=>({
                id: a.id,
                nome: a.nome,
                iniciais: a.iniciais,
                interesse: a.interesse,
                valor: a.valor,
                temperatura: a.temperatura,
                origem: a.origem,
                atualizado: a.ultimaInteracao
            }))
    },
    {
        id: 'negociando',
        nome: 'Negociando',
        leads: atendimentos.filter((a)=>a.etapa === 'negociando').map((a)=>({
                id: a.id,
                nome: a.nome,
                iniciais: a.iniciais,
                interesse: a.interesse,
                valor: a.valor,
                temperatura: a.temperatura,
                origem: a.origem,
                atualizado: a.ultimaInteracao
            }))
    }
];
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.mjs [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$quick$2d$add$2d$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/quick-add-sheet.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$clientes$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/screen-clientes.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$atividades$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/screen-atividades.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$hoje$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/screen-hoje.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$imoveis$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/screen-imoveis.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$negocios$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/screen-negocios.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$tab$2d$bar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/tab-bar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$notificacoes$2d$panel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/notificacoes-panel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$perfil$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/screen-perfil.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$app$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/app-data.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
function Page() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('hoje');
    const [quickAddAberto, setQuickAddAberto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [clienteAbertoId, setClienteAbertoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [atendimentoAbertoId, setAtendimentoAbertoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notificacoesAbertas, setNotificacoesAbertas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Um lead do funil abre o perfil do cliente correspondente
    function abrirClientePorLead(leadId) {
        const lead = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$app$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["funil"].flatMap((e)=>e.leads).find((l)=>l.id === leadId);
        const cliente = lead ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$app$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clientes"].find((c)=>c.nome === lead.nome) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$app$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clientes"].find((c)=>c.id === leadId);
        setClienteAbertoId((cliente ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$app$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clientes"][0]).id);
        setTab('clientes');
    }
    function abrirAtendimentoPorId(id) {
        setTab('negocios');
        setAtendimentoAbertoId(id);
    }
    function trocarTab(novaTab) {
        setClienteAbertoId(null);
        setAtendimentoAbertoId(null);
        setTab(novaTab);
    }
    function handleLogout() {
        window.location.href = '/login';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex min-h-dvh justify-center bg-background",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex h-dvh w-full max-w-md flex-col overflow-hidden bg-background sm:border-x sm:border-border",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-header flex items-center justify-between px-5 py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo.svg",
                                    alt: "Microsistec",
                                    className: "size-8 object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-serif text-base font-semibold text-foreground",
                                    children: "Microsistec"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-label": "Notificações",
                            onClick: ()=>setNotificacoesAbertas(true),
                            className: "relative flex size-10 items-center justify-center rounded-full bg-card border border-border text-foreground shadow-sm transition-brand active:scale-95",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                    className: "size-5",
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute right-2 top-2 size-2 rounded-full bg-amber",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto overscroll-contain",
                    children: [
                        tab === 'hoje' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$hoje$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScreenHoje"], {
                            onVerFunil: ()=>trocarTab('negocios'),
                            onVerCliente: abrirClientePorLead,
                            onVerPerfil: ()=>setTab('perfil'),
                            onVerAtendimento: abrirAtendimentoPorId
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this),
                        tab === 'negocios' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$negocios$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScreenNegocios"], {
                            onVerCliente: abrirClientePorLead,
                            abrirAtendimentoId: atendimentoAbertoId,
                            onAtendimentoAberto: ()=>setAtendimentoAbertoId(null)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        tab === 'atividades' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$atividades$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScreenAtividades"], {}, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 95,
                            columnNumber: 36
                        }, this),
                        tab === 'imoveis' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$imoveis$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScreenImoveis"], {}, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 96,
                            columnNumber: 33
                        }, this),
                        tab === 'clientes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$clientes$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScreenClientes"], {
                            clienteAbertoId: clienteAbertoId,
                            onFecharCliente: ()=>setClienteAbertoId(null),
                            onAbrirCliente: setClienteAbertoId
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this),
                        tab === 'perfil' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$screen$2d$perfil$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScreenPerfil"], {
                            onNotificacoes: ()=>setNotificacoesAbertas(true),
                            onLogout: handleLogout
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 105,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$tab$2d$bar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabBar"], {
                    active: tab,
                    onChange: trocarTab,
                    onQuickAdd: ()=>setQuickAddAberto(true)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this),
                quickAddAberto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$quick$2d$add$2d$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuickAddSheet"], {
                    onClose: ()=>setQuickAddAberto(false),
                    onAtividadeCriada: abrirAtendimentoPorId
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 118,
                    columnNumber: 28
                }, this),
                notificacoesAbertas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f$notificacoes$2d$panel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NotificacoesPanel"], {
                    onClose: ()=>setNotificacoesAbertas(false),
                    onVerAtendimento: abrirAtendimentoPorId
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_00rhkiq._.js.map