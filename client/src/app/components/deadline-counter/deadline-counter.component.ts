import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-deadline-counter',
    templateUrl: './deadline-counter.component.html',
    styleUrls: ['./deadline-counter.component.scss']
})
export class DeadlineCounterComponent implements OnInit {

    @Input() public date: Date;
    public daysLeft: Number;
    public hoursLeft: Number;
    public minutesLeft: Number;
    public secondsLeft: Number;
    private interval = null;
    constructor() {

    }

    public ngOnInit() {
        this.date = new Date();
        this.startCounter();
    }
    public setDate(date) {
        this.date = date;
        clearInterval(this.interval);
        if(date !== null){
            this.startCounter();
        }
        else{
            this.clearCounter();
        }
    }
    private startCounter(){
        this.interval = setInterval(()=>{
            const now = moment();
            const date = moment(this.date);
            this.daysLeft = date.diff(now, 'days');
            this.hoursLeft = date.diff(now.add(Number(this.daysLeft), 'days'), 'hours');
            this.minutesLeft = date.diff(now.add(Number(this.hoursLeft), 'hours'), 'minutes');
            this.secondsLeft = date.diff(now.add(Number(this.minutesLeft), 'minutes'), 'seconds');
            if(date.diff(now) < 0){
                clearInterval(this.interval);
                this.clearCounter();
            }
            // this.daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
            // this.hoursLeft= Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            // this.minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            // this.secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    }
    private clearCounter(){
        this.daysLeft = 0;
        this.hoursLeft= 0;
        this.minutesLeft = 0;
        this.secondsLeft = 0;
    }
}
