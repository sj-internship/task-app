import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
        this.loaderService.show();
        this.taskService.getAllTasks().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            tasks => {
                this.tasks = tasks;
                this.filteredTasks = tasks;
            },
            _ => { },
            () => this.loaderService.hide()
        );
    }
    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    private getTags() {
        this.loaderService.show();
        return this.taskService.getTags().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            tags => {
                this.prepareTagsSelect(tags)
                this.loaderService.hide();
            },
            _ => { },
            () => this.loaderService.hide()
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
}
