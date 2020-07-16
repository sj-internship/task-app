import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
    time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
    constructor(private config: NgbTimepickerConfig) {
        config.size = 'small';
    }

    ngOnInit() {
    }

}
