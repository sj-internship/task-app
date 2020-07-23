import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
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
    private dateTime:any = moment();
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
        console.log(this.dateTime)
    }
    public onDateChange(event: MatDatepickerInputEvent<Date>) {
        this.dateTime.set({
            year: event.value.getFullYear(),
            month:event.value.getMonth(),
            date:event.value.getDate(),
            hour:this.time.hour,
            minute:this.time.minute
        });
        this.onDatePicked.emit(this.dateTime);
    }
    public onTimeChange(event){
        this.dateTime.set({
            hour:this.time.hour,
            minute:this.time.minute
        })
        this.onDatePicked.emit(this.dateTime);
    }
    public onClearDate(){
        this.date.setValue(null);
        this.onDatePicked.emit(null);
    }
}
