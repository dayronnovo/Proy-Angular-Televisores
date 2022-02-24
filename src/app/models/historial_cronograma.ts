import { Multimedia } from './multimedia';
import { Televisor } from './televisores';
export class HistorialCronograma {
  id: number;
  fecha: string;
  hora_de_inicio: string;
  time_id: number;
  multimedias: Multimedia[];
  televisores: Televisor[];
}
