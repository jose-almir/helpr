export interface Chamado {
  id: number;
  dataAbertura?: string;
  dataFechamento?: string;
  prioridade: Prioridade;
  status: Status;
  titulo: string;
  observacoes: string;
  tecnico: number;
  cliente: number;
  nomeCliente: string;
  nomeTecnico: string;
}

export enum Status {
  ABERTO,
  ANDAMENTO,
  ENCERRADO,
}

export enum Prioridade {
  BAIXA,
  MEDIA,
  ALTA,
}
