import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Multimedia } from '../../models/multimedia';
import { MultimediaService } from '../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';

@Component({
  selector: 'app-multimedia-del-televisor',
  templateUrl: './multimedia-del-televisor.component.html',
  styleUrls: ['./multimedia-del-televisor.component.css'],
})
export class MultimediaDelTelevisorComponent implements OnInit {
  multimedias: Multimedia[] = [];
  televisor: Televisor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private televisorService: TelevisorService,
    private multimediaService: MultimediaService
  ) {}

  ngOnInit(): void {
    this.getTelevisorById();
  }

  public getTelevisorById(): void {
    this.activatedRoute.params.subscribe((params) => {
      let televisor_id = params['televisor_id'];

      this.televisorService
        .getTelevisorById(televisor_id)
        .subscribe((response) => {
          this.televisor = response;
          this.getMultimediasByTelevisorId();
        });
    });
  }

  public getMultimediasByTelevisorId() {
    this.multimediaService
      .getMultimediasByTelevisorId(this.televisor.id)
      .subscribe((data) => {
        this.multimedias = data as Multimedia[];
      });
  }

  public verArchivo(id: number): string {
    return this.multimediaService.verFoto(id);
  }
}
