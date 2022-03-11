import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private spinner: NgxSpinnerService) {}

  public show(): void {
    this.spinner.show(undefined, {
      type: 'ball-elastic-dots',
      size: 'medium',
      fullScreen: true,
      bdColor: 'rgba(0,0,0,0)',
      color: '#1e1e1e',
    });
  }

  public hide(): void {
    this.spinner.hide();
  }
}
