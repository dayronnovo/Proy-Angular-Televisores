import { Component, OnInit } from '@angular/core';
import { Multimedia } from '../../models/multimedia';
import { MultimediaService } from '../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';

// declare var $: any;
@Component({
  selector: 'app-visualizar-multimedias',
  templateUrl: './visualizar-multimedias.component.html',
  styleUrls: ['./visualizar-multimedias.component.css'],
})
export class VisualizarMultimediasComponent implements OnInit {
  imagenes: Multimedia[] = [];
  video: Multimedia;

  constructor(
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  // public getMultimediasByIds(ids) {
  //   this.activatedRoute.params.subscribe((params) => {
  //     let id = params['televisor_id'];
  //     this.multimediaService
  //       .getMultimediasByIdsAndTelevisorId(ids, id)
  //       .subscribe((response) => {
  //         console.log(response);
  //         // console.log(this.multimedias);
  //       });
  //   });
  // }

  verArchivo(id: number): string {
    return this.multimediaService.verFoto(id);
  }

  // public escucharVideo(event) {
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
