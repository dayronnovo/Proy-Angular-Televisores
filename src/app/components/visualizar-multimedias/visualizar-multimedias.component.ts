import { Component, OnInit } from '@angular/core';
import { Multimedia } from '../../models/multimedia';
import { MultimediaService } from '../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-visualizar-multimedias',
  templateUrl: './visualizar-multimedias.component.html',
  styleUrls: ['./visualizar-multimedias.component.css'],
})
export class VisualizarMultimediasComponent implements OnInit {
  multimedias: Multimedia[] = [];

  constructor(
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMultimediasByTelevisorId();
  }

  public getMultimediasByTelevisorId() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.multimediaService
        .getMultimediasByTelevisorId(id)
        .subscribe((response) => {
          this.multimedias = response;
          console.log(this.multimedias);
        });
    });
  }

  verArchivo(id: number): string {
    return this.multimediaService.verFoto(id);
  }

  public prueba() {
    console.log();
  }

  public escucharVideo(event) {
    console.log(event);
    if (event.type == 'play') {
      // console.log('Play');
      $('#myCarousel').on('slide.bs.carousel', function () {
        // $('.carousel').carousel({
        //   pause: true,
        // });
      });
    }
  }
}
