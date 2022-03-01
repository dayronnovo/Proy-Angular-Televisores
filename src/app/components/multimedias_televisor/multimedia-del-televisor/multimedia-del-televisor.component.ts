import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Multimedia } from '../../../models/multimedia';
import { MultimediaService } from '../../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multimedia-del-televisor',
  templateUrl: './multimedia-del-televisor.component.html',
  styleUrls: ['./multimedia-del-televisor.component.css'],
})
export class MultimediaDelTelevisorComponent implements OnInit {
  multimedias: Multimedia[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private multimediaService: MultimediaService
  ) {}

  ngOnInit(): void {
    // this.getMultimediasByTelevisorId();
  }

  // public getMultimediasByTelevisorId() {
  //   this.activatedRoute.params.subscribe((params) => {
  //     let televisor_id = params['televisor_id'];
  //     this.multimediaService
  //       .getMultimediasByTelevisorId(televisor_id)
  //       .subscribe((data) => {
  //         this.multimedias = data as Multimedia[];
  //       });
  //   });
  // }

  // public verArchivo(id: number): string {
  //   return this.multimediaService.verFoto(id);
  // }
}
