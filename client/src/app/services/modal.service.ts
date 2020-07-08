import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {YesNoModalComponent} from '../components/yes-no-modal/yes-no-modal.component';
import {YesNoModalParams} from '../models/modals'
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openYesNoModal(params:YesNoModalParams):NgbModalRef{
    const modalRef = this.modalService.open(YesNoModalComponent);
    modalRef.componentInstance.description = params.description;
    modalRef.componentInstance.title = params.title;
    return modalRef;
  }
}
