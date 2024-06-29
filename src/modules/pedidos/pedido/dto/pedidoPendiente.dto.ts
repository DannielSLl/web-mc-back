export class PedidoPendienteDTO {
  id: number;
  client: number;
  date: Date;
  items: number;
  status: boolean;
  localId: number | null;
}