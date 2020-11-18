import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  spinnDelay = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  onBusy() {
    this.spinnDelay++;
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255, 255, 255, 0.6)',
      color: '#333333'
    });
  }

  onIdle() {
    this.spinnDelay--;
    this.spinnerService.hide();
  }

}
