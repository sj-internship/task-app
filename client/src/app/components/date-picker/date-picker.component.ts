import { Component, OnInit, Output, OnChanges, EventEmitter, Input, SimpleChanges } from '@angular/core';
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
export class DatePickerComponent implements OnInit, OnChanges {
    @Output() public onDatePicked: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();
    @Input() public pickedDate: Date;
    public date: FormControl = new FormControl(this.pickedDate);
    public time: NgbTimeStruct;
    private dateTime:moment.Moment = moment().startOf('day');
    constructor(private config: NgbTimepickerConfig) {
        config.size = 'small';
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.pickedDate && changes.pickedDate.currentValue) {
            const date = new Date(changes.pickedDate.currentValue);
            this.date.setValue(date);
            this.updateTime(date);
        }
    }
    ngOnInit() {
        this.time = {
            hour: 0,
            minute: 0,
            second: 0
        };
    }
    public onDateChange(event: MatDatepickerInputEvent<Date>) {
        this.dateTime.set({
            year: event.value.getFullYear(),
            month:event.value.getMonth(),
            date:event.value.getDate(),
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
    public onClearDate() {
        this.date.setValue(null);
        this.onDatePicked.emit(null);
    }
    private updateTime(date: Date) {
        this.time = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
    }
}
