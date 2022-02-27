import { Component, OnInit } from '@angular/core';
import { Multimedia } from '../../../models/multimedia';
import { ActivatedRoute } from '@angular/router';
import { MultimediaService } from '../../../services/multimedia.service';

@Component({
  selector: 'app-multimedias-actuales',
  templateUrl: './multimedias-actuales.component.html',
  styleUrls: ['./multimedias-actuales.component.css'],
})
export class MultimediasActualesComponent implements OnInit {
  multimedias: Multimedia[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private multimediaService: MultimediaService
  ) {}

  ngOnInit(): void {
    this.getMultimediasByTelevisorId();
  }

  public getMultimediasByTelevisorId() {
    this.activatedRoute.parent.params.subscribe((params) => {
      let televisor_id = params['televisor_id'];
      this.multimediaService
        .getMultimediasByTelevisorId(televisor_id)
        .subscribe((data) => {
          this.multimedias = data as Multimedia[];
          console.log(this.multimedias);
        });
    });
  }

  public verArchivo(id: number): string {
    return this.multimediaService.verFoto(id);
  }
}
