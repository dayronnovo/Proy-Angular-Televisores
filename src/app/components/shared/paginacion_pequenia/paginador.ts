export class Paginador {
  numero_de_pagina: number;
  entities: any[] = [];
  total_de_entities: number;
  total_de_paginas: number;
  primera_pagina: boolean;
  ultima_pagina: boolean;

  public constructor(
    numero_de_pagina: number,
    entities: any[] = [],
    total_de_entities: number,
    total_de_paginas: number,
    primera_pagina: boolean,
    ultima_pagina: boolean
  ) {
    this.numero_de_pagina = numero_de_pagina;
    this.entities = entities;
    this.total_de_entities = total_de_entities;
    this.total_de_paginas = total_de_paginas;
    this.primera_pagina = primera_pagina;
    this.ultima_pagina = ultima_pagina;
  }
}
