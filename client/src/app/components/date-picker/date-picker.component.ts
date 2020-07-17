import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
    @Output() public onDatePicked: EventEmitter<Date> = new EventEmitter<Date>();
    @Input() public pickedDate: Date;
    public date: FormControl;
    public time: NgbTimeStruct;
    constructor(private config: NgbTimepickerConfig) {
        config.size = 'small';
    }
    ngOnInit() {
        this.date = new FormControl(this.pickedDate);
        const date = new Date(this.pickedDate)
        this.time = {
            hour: date.getHours(), 
            minute: date.getMinutes(), 
            second: date.getSeconds()
        };
    }
    public onDateChange(event: MatDatepickerInputEvent<Date>) {
        const date = event.value;
        date.setHours(this.time.hour);
        date.setMinutes(this.time.minute);
        this.onDatePicked.emit(date);
    }
    public onTimeChange(event){
        const date = new Date(this.date.value);
        date.setHours(this.time.hour);
        date.setMinutes(this.time.minute);
        this.onDatePicked.emit(date);
    }
    public onClearDate(){
        this.date.setValue(null);
        this.onDatePicked.emit(null);
    }
}
