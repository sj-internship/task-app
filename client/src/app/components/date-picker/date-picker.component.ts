import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
    @Output() onDatePicked: EventEmitter<Date> = new EventEmitter<Date>();
    @Input() pickedDate:Date;
    date:FormControl;
    constructor() { }
    ngOnInit() {
        this.date = new FormControl(this.pickedDate)
    }
    public onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
        this.onDatePicked.emit(event.value);
    }
}
