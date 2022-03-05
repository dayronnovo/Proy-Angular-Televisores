import { Multimedia } from './multimedia';
import { Televisor } from './televisores';
import { Paginador } from '../components/shared/paginacion_pequenia/paginador';
export class HistorialCronograma {
  id: number;
  fecha: string;
  hora_de_inicio: string;
  time_id: number;
  multimedias: Multimedia[];
  televisores: Televisor[];
  paginador_televisores?: Paginador = null;
}
