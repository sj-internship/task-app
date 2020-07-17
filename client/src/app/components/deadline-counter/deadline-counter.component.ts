import { Component, OnInit, Input } from '@angular/core';

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
            const now = new Date().getTime() - 100000;
            const countDownDate = this.date.getTime();
            var distance = countDownDate - now;
            this.daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.hoursLeft= Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);
            if(distance < 0){
                clearInterval(this.interval);
                this.clearCounter();
            }
        }, 1000);
    }
    private clearCounter(){
        this.daysLeft = 0;
        this.hoursLeft= 0;
        this.minutesLeft = 0;
        this.secondsLeft = 0;
    }
}
