import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {YesNoModalComponent} from '../components/yes-no-modal/yes-no-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openYesNoModal(){
    return this.modalService.open(YesNoModalComponent);
  }
}
