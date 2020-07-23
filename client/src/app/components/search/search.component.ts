import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskModel } from '../../models/task'
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/services/loader.service';
import { TaskService } from 'src/app/services/task.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Select2OptionData } from 'ng2-select2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public filterForm: FormGroup;
    private ngUnsubscribe = new Subject<void>();
    public hoveredDate: NgbDate | null = null;
    public fromDate: NgbDate;
    public selectOptions;
    public toDate: NgbDate | null = null;
    @Output() public onFilterEmitter: EventEmitter<TaskModel[]> = new EventEmitter<TaskModel[]>();
    @Input() public allUniqueTags: Array<Select2OptionData>;
    constructor(private fb: FormBuilder,
        private loaderService: LoaderService,
        public calendar: NgbCalendar,
        private taskService: TaskService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    ngOnInit() {
        this.initializeFilter();
        this.initializeSelectOptions();
    }
    public onDateSelection(date: NgbDate) {
        let dateTemp = new Date(date.year, date.month-1, date.day+1); 
        const dateString = dateTemp.toISOString();
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
            this.filterForm.patchValue({fromDeadline: dateString});
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
            this.filterForm.patchValue({toDeadline: dateString});

        } else {
            this.toDate = null;
            this.fromDate = date;
            this.filterForm.patchValue({fromDeadline: dateString});
            this.filterForm.patchValue({toDate: null});

        }
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }

    public onFilterSubmit() {
        const params = {};
        const keys = Object.keys(this.filterForm.value);
        keys.forEach(key=>{
            if(this.filterForm.value[key]){
                params[key] = this.filterForm.value[key];
            }
        })
        params['tags'] = this.getTagParam();
        this.router.navigate(['/tasks'],{queryParams:params});

    }

    public initializeFilter() {
        this.filterForm = this.formBuilder.group({
            tags: [[]],
            title: [''],
            fromDeadline:[''],
            toDeadline:['']
        })
    }

    public onSelectFilterChange(event) {
        const tagTexts = event.data.map(item => item.text);
        this.filterForm.patchValue({ tags: tagTexts });
    }

    private initializeSelectOptions() {
        this.selectOptions = {
            multiple: true,
            allowClear: true,
            placeholder: 'Choose a tag',
            width: '100%'
        }
    }
    private getTagParam(): string{
        let tagParam = '';
        this.filterForm.value.tags.forEach(tag => {
            tagParam += tag + ',';
        });
        if(tagParam.length > 0){
            tagParam = tagParam.substr(0, tagParam.length-1);
        }
        return tagParam;
    }
}
