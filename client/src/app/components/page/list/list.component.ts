import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Select2OptionData } from 'ng2-select2';
import { LoaderService } from '../../../services/loader.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    public tasks: TaskModel[];
    public filteredTasks: TaskModel[];
    public selectOptions;
    private ngUnsubscribe = new Subject<void>();
    public allUniqueTags: Array<Select2OptionData> = [];
    public filterForm: FormGroup;


    public hoveredDate: NgbDate | null = null;
    public fromDate: NgbDate;
    public toDate: NgbDate | null = null;

    constructor(
        private taskService: TaskService,
        private loaderService: LoaderService,
        private formBuilder: FormBuilder,

        private calendar: NgbCalendar) {

        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    public ngOnInit() {
        this.getAllTasks();
        this.getTags();
        this.initializeSelectOptions();
        this.initializeFilter();
    }
    public getAllTasks() {
        this.loaderService.setLoading(true);
        this.taskService.getAllTasks().pipe(
            finalize(() => {
                this.loaderService.setLoading(false);
            }),
            takeUntil(this.ngUnsubscribe)
        ).subscribe(
            tasks => {
                this.tasks = tasks;
                this.filteredTasks = tasks;
            },
            _ => { }
        );
    }
    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    private getTags() {
        this.loaderService.setLoading(true);
        return this.taskService.getTags().pipe(
            finalize(() => {
                this.loaderService.setLoading(false);
            }),
            takeUntil(this.ngUnsubscribe)
        ).subscribe(
            tags => {
                this.prepareTagsSelect(tags)
            },
            _ => { },
        );
    }
    private prepareTagsSelect(tags) {
        this.allUniqueTags = tags.map((tag, index) => ({ id: index, text: tag }));
    }
    public selectChanged(event) {
        if (event.data.length > 0) {
            const selectedTags = event.data.map(tag => tag.text);
            this.filteredTasks = this.tasks.filter(task => {
                const taskTags = task.tags;
                return taskTags.some(tag => selectedTags.includes(tag));
            });
        }
        else {
            this.filteredTasks = this.tasks;
        }
    }
    private initializeSelectOptions() {
        this.selectOptions = {
            multiple: true,
            allowClear: true,
            placeholder: 'Choose a tag',
            width: '100%'
        }
    }
    public initializeFilter() {
        this.filterForm = this.formBuilder.group({
            tags: [[]],
            title: [''],
        })
    }
    public onFilterSubmit() {
        const params = this.filterForm.value;
        console.log(this.filterForm.value)
        this.loaderService.setLoading(true);
        this.taskService.getFilteredTasks(params).pipe(
            finalize(() => {
                this.loaderService.setLoading(false);
            }),
            takeUntil(this.ngUnsubscribe)
        ).subscribe(
            tasks => {
                this.tasks = tasks;
                this.filteredTasks = tasks;
                console.log(tasks)
            },
            _ => { }
        );
    }
    public onSelectFilterChange(event) {
        const tagTexts = event.data.map(item => item.text);
        this.filterForm.patchValue({ tags: tagTexts });
    }
}
