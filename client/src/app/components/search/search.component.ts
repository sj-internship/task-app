import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {TaskModel} from '../../models/task'
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public searchForm: FormGroup;
    @Output() private onFilterChange: EventEmitter<any> = new EventEmitter<any>();
    private filters = {};
    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.buildForm()
    }
    private buildForm(){
        this.searchForm = this.fb.group({
            title:[''],
            createdBy:['']
        })

        //TODO unsubscribe
        this.searchForm.get('title').valueChanges.subscribe(value=>{
            this.filters['title']=value;
            this.onFilterChange.emit(this.filters);
        })
        this.searchForm.get('createdBy').valueChanges.subscribe(value=>{
            this.filters['createdBy']=value;
            this.onFilterChange.emit(this.filters);
        })
    }
}
