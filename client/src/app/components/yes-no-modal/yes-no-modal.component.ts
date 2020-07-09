import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.scss']
})
export class YesNoModalComponent implements OnInit {
  public answer:boolean = false;
  @Input() public description;
  @Input() public title;
  constructor(private activeModal: NgbActiveModal) { }

  public ngOnInit() {
  }
  public close(answer:boolean){
    this.answer = answer;
    this.activeModal.close(this.answer);  
  }
}
