import { Component, OnInit, Output, OnChanges, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, OnChanges {
    @Output() public onDatePicked: EventEmitter<Date> = new EventEmitter<Date>();
    @Input() public pickedDate: Date;
    public date: FormControl = new FormControl(this.pickedDate);
    public time: NgbTimeStruct;
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
        const date = event.value;
        date.setHours(this.time.hour);
        date.setMinutes(this.time.minute);
        this.onDatePicked.emit(date);
    }
    public onTimeChange(event) {
        const date = new Date(this.date.value);
        date.setHours(this.time.hour);
        date.setMinutes(this.time.minute);
        this.onDatePicked.emit(date);
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
