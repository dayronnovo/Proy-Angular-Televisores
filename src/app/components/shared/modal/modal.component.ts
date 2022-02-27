import { Component, OnInit, Input } from '@angular/core';
import { MultimediaService } from '../../../services/multimedia.service';
import { Multimedia } from '../../../models/multimedia';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() multimedia: Multimedia;

  constructor(private multimediaService: MultimediaService) {}

  ngOnInit(): void {}

  public verArchivo(): string {
    return this.multimediaService.verFoto(this.multimedia.id);
  }

  public obtenerEvento(evento) {
    console.log(evento);
  }
}
