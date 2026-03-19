// Modelo estricto para métricas rápidas/impacto
export interface Metric {
  id: number;
  nombre: string;
  valor: number;
  icono: string;
  orden: number;
  visible: boolean;
  created_at?: string;
  updated_at?: string;
}
