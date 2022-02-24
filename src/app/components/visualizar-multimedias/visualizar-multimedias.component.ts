import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Multimedia } from '../../models/multimedia';
import { MultimediaService } from '../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';
import { SwiperComponent } from 'swiper/angular';

import Swiper, {
  Autoplay,
  Pagination,
  Navigation,
  SwiperOptions,
} from 'swiper';
// SwiperCore.use([Autoplay, Pagination, Navigation]);

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
      let id = params['televisor_id'];
      this.multimediaService
        .getMultimediasByTelevisorId(id)
        .subscribe((response) => {
          this.multimedias = response as Multimedia[];
          console.log(response);
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
