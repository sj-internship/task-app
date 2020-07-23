import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    public page = 4;
    @Output() public onDatePicked: EventEmitter<Number> = new EventEmitter<Number>();

    constructor() { }

    ngOnInit() {
    }
    public onPageChange(event){
        
    }
}
