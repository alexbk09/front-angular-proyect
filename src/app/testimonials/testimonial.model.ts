export interface Testimonio {
  id: number;
  nombre: string;
  cargo: string;
  mensaje: string;
  imagen?: string;
  is_public?: boolean;
  created_at?: string;
  updated_at?: string;
}
