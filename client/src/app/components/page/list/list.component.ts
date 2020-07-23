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
    constructor(
        private taskService: TaskService,
        private loaderService: LoaderService) {
    }

    public ngOnInit() {
        this.getAllTasks();
        this.getTags();
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

    public onFilterChanged(tasks) {
        console.log('list')
        console.log(tasks)
        this.tasks = tasks;
        this.filteredTasks=tasks;
    }
}
