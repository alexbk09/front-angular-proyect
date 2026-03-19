export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  tecnologias: string;
  url: string;
  imagen: string;
  is_featured?: boolean;
  is_public?: boolean;
  is_draft?: boolean;
  created_at?: string;
  updated_at?: string;
}
