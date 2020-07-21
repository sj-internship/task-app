import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Select2OptionData } from 'ng2-select2';
import { LoaderService } from '../../../services/loader.service'
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
    constructor(
        private taskService: TaskService,
        private loaderService: LoaderService) { }

    public ngOnInit() {
        this.getAllTasks();
        this.getTags();
        this.initializeSelectOptions();
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
            placeholder: 'Choose a tag'
        }
    }
    public onFilterChange(filters){
        const filterKeys = Object.keys(filters);
        const filterTask = task=>{
            let flag = true;
            filterKeys.forEach(filterKey=>{
                console.log(filterKey)
                console.log(task[filterKey])
                if(filters[filterKey] === ''){
                    console.log('empty')
                    return true;
                }
                /*if(!task[filterKey].startsWith(filters[filterKey]) ||){
                    return false;
                }*/
            })
        }
        this.filteredTasks = this.tasks.filter(filterTask);
        console.log(this.filteredTasks)
    }
}
