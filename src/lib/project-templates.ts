export type ProjectComplexity = 'baixa' | 'media' | 'alta';

export interface TaskTemplate {
    col: string;
    code: string;
    title: string;
    durationWeeks: number; // 0 for variable
}

export interface ComplexityTemplate {
    columns: { id: string, name: string }[];
    tasks: TaskTemplate[];
}

export const PROJECT_TEMPLATES: Record<ProjectComplexity, ComplexityTemplate> = {
    baixa: {
        columns: [
            { id: 'PI', name: 'Planejamento Inicial' },
            { id: 'LV', name: 'Levantamento (Descobrir)' },
            { id: 'EP', name: 'Estudo Preliminar (Imaginar)' },
            { id: 'PL', name: 'Projeto Legal' },
            { id: 'AP', name: 'Anteprojeto (Desenvolver)' },
            { id: 'PE', name: 'Projeto Executivo' },
            { id: 'PO', name: 'Planejamento de Obra' },
        ],
        tasks: [
            { col: 'PI', code: 'PI', title: 'PLANEJAMENTO INICIAL DO PROJETO', durationWeeks: 1 },
            { col: 'LV', code: 'LV01', title: 'LEVANTAMENTO COMPLEMENTARES / ARQ', durationWeeks: 1 },
            { col: 'LV', code: 'LV02', title: 'MODELO 3D / DESENHOS BASE / CONDICIONANTES', durationWeeks: 1 },
            { col: 'EP', code: 'EP01', title: 'DESENVOLVIMENTO CONCEPÇÃO', durationWeeks: 1 },
            { col: 'EP', code: 'EP02', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'EP', code: 'EP03', title: 'DESENVOLVIMENTO FINAL', durationWeeks: 2 },
            { col: 'EP', code: 'EP04', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'EP', code: 'EP05', title: 'ORÇAMENTO', durationWeeks: 1 },
            { col: 'PL', code: 'PL01', title: 'DESENVOLVIMENTO', durationWeeks: 1 },
            { col: 'PL', code: 'PL02', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 0 },
            { col: 'AP', code: 'AP01', title: 'DESENVOLVIMENTO ARQ', durationWeeks: 3 },
            { col: 'AP', code: 'AP02', title: 'ANÁLISE / APROVAÇÃO INFRA', durationWeeks: 1 },
            { col: 'AP', code: 'AP03', title: 'DESENVOLVIMENTO BASE AMPLIAÇÕES', durationWeeks: 4 },
            { col: 'AP', code: 'AP04', title: 'ANÁLISE / APROVAÇÃO MARCENARIA', durationWeeks: 1 },
            { col: 'AP', code: 'AP05', title: 'EMISSÃO FINAL ARQ', durationWeeks: 1 },
            { col: 'AP', code: 'AP06', title: 'ORÇAMENTO', durationWeeks: 1 },
            { col: 'AP', code: 'AP07', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'PE', code: 'PE01', title: 'DESENVOLVIMENTO AMPLIAÇÕES / ESQUADRIAS', durationWeeks: 4 },
            { col: 'PE', code: 'PE02', title: 'DESENVOLVIMENTO DESENHOS GERAIS', durationWeeks: 1 },
            { col: 'PE', code: 'PE03', title: 'AJUSTES FINAIS. EMISSÃO LO E MEMORIAL', durationWeeks: 1 },
            { col: 'PO', code: 'PO', title: 'ORÇAMENTO FINAL E PLANEJAMENTO DE OBRA', durationWeeks: 0 }
        ]
    },
    media: {
        columns: [
            { id: 'PI', name: 'Planejamento Inicial' },
            { id: 'LV', name: 'Levantamento (Descobrir)' },
            { id: 'EP', name: 'Estudo Preliminar (Imaginar)' },
            { id: 'PL', name: 'Projeto Legal' },
            { id: 'AP', name: 'Anteprojeto (Desenvolver)' },
            { id: 'PE', name: 'Projeto Executivo' },
            { id: 'PO', name: 'Planejamento de Obra' },
        ],
        tasks: [
            { col: 'PI', code: 'PI', title: 'PLANEJAMENTO INICIAL DO PROJETO', durationWeeks: 0 },
            { col: 'LV', code: 'LV01', title: 'LEVANTAMENTO COMPLEMENTARES / ARQ', durationWeeks: 2 },
            { col: 'LV', code: 'LV02', title: 'MODELO 3D / DESENHOS BASE / CONDICIONANTES', durationWeeks: 1 },
            { col: 'EP', code: 'EP01', title: 'DESENVOLVIMENTO CONCEPÇÃO', durationWeeks: 2 },
            { col: 'EP', code: 'EP02', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'EP', code: 'EP03', title: 'DESENVOLVIMENTO FINAL ARQ', durationWeeks: 2 },
            { col: 'EP', code: 'EP04', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'EP', code: 'EP05', title: 'ORÇAMENTAÇÃO E BASE COMPLEMENTARES', durationWeeks: 2 },
            { col: 'EP', code: 'EP06', title: 'CONTRATAÇÃO COMPLEMENTARES', durationWeeks: 1 },
            { col: 'EP', code: 'EP07', title: 'ANÁLISE C. ENG. E C.EST', durationWeeks: 1 },
            { col: 'EP', code: 'EP08', title: 'COMPATIBILIZAÇÃO ARQ + COMPLEMENTARES', durationWeeks: 1 },
            { col: 'PL', code: 'PL01', title: 'DESENVOLVIMENTO CONSULTOR LEGAL', durationWeeks: 2 },
            { col: 'PL', code: 'PL02', title: 'ANÁLISE ARQ', durationWeeks: 1 },
            { col: 'PL', code: 'PL03', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 0 },
            { col: 'AP', code: 'AP01', title: 'DESENVOLVIMENTO ARQ E COMPLEMENTARES', durationWeeks: 4 },
            { col: 'AP', code: 'AP02', title: 'COMPATIBILIZAÇÃO ARQ / INFRA', durationWeeks: 1 },
            { col: 'AP', code: 'AP03', title: 'DESENVOLVIMENTO C. ENG', durationWeeks: 2 },
            { col: 'AP', code: 'AP04', title: 'COMPATIBILIZAÇÃO E AJUSTES ARQ', durationWeeks: 2 },
            { col: 'AP', code: 'AP05', title: 'AJUSTES COMPLEMENTARES', durationWeeks: 1 },
            { col: 'AP', code: 'AP06', title: 'COMPATIBILIZAÇÃO E AJUSTES ARQ', durationWeeks: 1 },
            { col: 'AP', code: 'AP07', title: 'ANÁLISE / APROVAÇÃO E ORÇAMENTO', durationWeeks: 1 },
            { col: 'AP', code: 'AP08', title: 'EMISSÃO FINAL ARQ', durationWeeks: 1 },
            { col: 'PE', code: 'PE01', title: 'DESENVOLVIMENTO ARQ AMPLIAÇÕES E ESQUADRIAS', durationWeeks: 4 },
            { col: 'PE', code: 'PE02', title: 'DESENVOLVIMENTO ARQ DETALHAMENTOS', durationWeeks: 2 },
            { col: 'PE', code: 'PE03', title: 'DESENVOLVIMENTO ARQ DESENHOS GERAIS', durationWeeks: 1 },
            { col: 'PE', code: 'PE04', title: 'COMPATIBILIZAÇÃO ARQ + COMPLEMENTARES', durationWeeks: 1 },
            { col: 'PE', code: 'PE05', title: 'AJUSTES FINAIS. EMISSÃO LO E MEMORIAL', durationWeeks: 1 },
            { col: 'PO', code: 'PO', title: 'ORÇAMENTO FINAL E PLANEJAMENTO DE OBRA', durationWeeks: 0 }
        ]
    },
    alta: {
        columns: [
            { id: 'PI', name: 'Planejamento Inicial' },
            { id: 'LV', name: 'Levantamento (Descobrir)' },
            { id: 'EP', name: 'Estudo Preliminar (Imaginar)' },
            { id: 'PL', name: 'Projeto Legal' },
            { id: 'AP', name: 'Anteprojeto (Desenvolver)' },
            { id: 'PE', name: 'Projeto Executivo' },
            { id: 'PO', name: 'Planejamento de Obra' },
        ],
        tasks: [
            { col: 'PI', code: 'PI', title: 'PLANEJAMENTO INICIAL DO PROJETO', durationWeeks: 1 },
            { col: 'LV', code: 'LV01', title: 'LEVANTAMENTO COMPLEMENTARES', durationWeeks: 2 },
            { col: 'LV', code: 'LV02', title: 'MODELO 3D / DESENHOS BASE', durationWeeks: 1 },
            { col: 'EP', code: 'EP01', title: 'DESENVOLVIMENTO CONCEPÇÃO', durationWeeks: 4 },
            { col: 'EP', code: 'EP02', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'EP', code: 'EP03', title: 'DESENVOLVIMENTO FINAL', durationWeeks: 4 },
            { col: 'EP', code: 'EP04', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'EP', code: 'EP05', title: 'ORÇAMENTAÇÃO COMPLEMENTARES', durationWeeks: 3 },
            { col: 'EP', code: 'EP06', title: 'CONTRATAÇÃO COMPLEMENTARES', durationWeeks: 1 },
            { col: 'EP', code: 'EP07', title: 'ANÁLISE C. ENG. E C.EST', durationWeeks: 3 },
            { col: 'EP', code: 'EP08', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'EP', code: 'EP09', title: 'COMPATIBILIZAÇÃO ARQ + COMPLEMENTARES', durationWeeks: 1 },
            { col: 'PL', code: 'PL01', title: 'DESENVOLVIMENTO CONSULTOR LEGAL', durationWeeks: 2 },
            { col: 'PL', code: 'PL02', title: 'ANÁLISE ARQ', durationWeeks: 2 },
            { col: 'PL', code: 'PL03', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'AP', code: 'AP01', title: 'DESENVOLVIMENTO EST', durationWeeks: 0 },
            { col: 'AP', code: 'AP02', title: 'COMPATIBILIZAÇÃO ARQ + EST + ORÇAMENTO', durationWeeks: 3 },
            { col: 'AP', code: 'AP03', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'AP', code: 'AP04', title: 'DESENVOLVIMENTO C. EST + C. ENG', durationWeeks: 4 },
            { col: 'AP', code: 'AP05', title: 'DESENVOLVIMENTO ARQ / COMPATIBILIZAÇÃO', durationWeeks: 1 },
            { col: 'AP', code: 'AP06', title: 'COMPATIBILIZAÇÃO ARQ + COMPLEMENTARES + ORÇ.', durationWeeks: 4 },
            { col: 'AP', code: 'AP07', title: 'AJUSTES COMPLEMENTARES', durationWeeks: 2 },
            { col: 'AP', code: 'AP08', title: 'EMISSÃO FINAL ARQ', durationWeeks: 3 },
            { col: 'AP', code: 'AP09', title: 'COMPATIBILIZAÇÃO ARQ + COMPLEMENTARES', durationWeeks: 2 },
            { col: 'AP', code: 'AP10', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 2 },
            { col: 'AP', code: 'AP11', title: 'BASE MATERIAL DIVULGAÇÃO EMPREENDIMENTO', durationWeeks: 1 },
            { col: 'AP', code: 'AP12', title: 'ANÁLISE / APROVAÇÃO', durationWeeks: 1 },
            { col: 'PE', code: 'PE01', title: 'DESENVOLVIMENTO ARQ AMPLIAÇÕES E COMPL.', durationWeeks: 2 },
            { col: 'PE', code: 'PE02', title: 'DESENVOLVIMENTO ARQ ESQUADRIAS', durationWeeks: 8 },
            { col: 'PE', code: 'PE03', title: 'DESENVOLVIMENTO ARQ DETALHAMENTOS', durationWeeks: 2 },
            { col: 'PE', code: 'PE04', title: 'DESENVOLVIMENTO ARQ DESENHOS GERAIS', durationWeeks: 2 },
            { col: 'PE', code: 'PE05', title: 'COMPATIBILIZAÇÃO ARQ + COMPLEMENTARES', durationWeeks: 2 },
            { col: 'PE', code: 'PE06', title: 'AJUSTES FINAIS. EMISSÃO LO E MEMORIAL', durationWeeks: 1 },
            { col: 'PO', code: 'PO', title: 'ORÇAMENTO FINAL E PLANEJAMENTO DE OBRA', durationWeeks: 0 }
        ]
    }
};
