import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
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
  equal = require('esequal');

  constructor(
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMultimediasByTelevisorId();
    setInterval(() => {
      console.log(this.multimedias);
      this.getMultimediasByTelevisorId();
    }, 3000);
  }

  public getMultimediasByTelevisorId() {
    console.log('Entro');
    this.activatedRoute.params.subscribe((params) => {
      let id = params['televisor_id'];
      this.multimediaService
        .getMultimediasByTelevisorId(id)
        .subscribe((response) => {
          if (
            this.multimedias.length == 0 ||
            this.multimedias.length != response.length
          ) {
            this.multimedias = response;
          } else {
            if (!this.equal(this.multimedias, response)) {
              this.multimedias = response;
            }
          }
          // console.log(response);
          // console.log(this.multimedias);
        });
    });
  }

  verArchivo(id: number): string {
    return this.multimediaService.verFoto(id);
  }

  // $('.carousel').carousel({
  //   interval: 2000
  // })

  // public escucharVideoS(event) {
  //   console.log(event);
  //   if (event.type == 'play') {
  //     // console.log('Play');
  //     $('#myCarousel').on('slide.bs.carousel', function () {
  //       // $('.carousel').carousel({
  //       //   pause: true,
  //       // });
  //     });
  //   }
  // }
}

// =============================================================
