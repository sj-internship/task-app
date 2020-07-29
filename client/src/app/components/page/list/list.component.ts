import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Select2OptionData } from 'ng2-select2';
import { LoaderService } from '../../../services/loader.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    public tasks: TaskModel[];
    public filteredTasks: TaskModel[];
    public selectOptions;
    public pageSize: number = 5;
    private queryParams: any;
    public taskCount:number;
    public page = 1;
    private ngUnsubscribe = new Subject<void>();
    public allUniqueTags: Array<Select2OptionData> = [];
    constructor(
        private taskService: TaskService,
        private loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    public ngOnInit() {
        this.getAllTasks();
        this.getTags();
    }
    public getAllTasks() {
        this.loaderService.setLoading(true);
        this.route.queryParams.subscribe(params => {
            this.queryParams = {...params};
            if(params.skip && params.limit){
                this.page = params.skip / params.limit + 1;
            }
            this.taskService.getAllTasks(params).pipe(
                finalize(() => {
                    this.loaderService.setLoading(false);
                }),
                takeUntil(this.ngUnsubscribe)
            ).subscribe(
                tasks => {
                    this.taskCount = tasks.count;
                    this.tasks = tasks.result;
                    this.filteredTasks = tasks.result;
                },
                _ => { }
            );
        })
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
        this.tasks = tasks;
        this.filteredTasks = tasks;
    }
    public onPageChange(page: number) {
        const skip = this.pageSize * (page - 1);
        this.queryParams.skip = skip;
        this.queryParams.limit = this.pageSize;
        this.router.navigate(['/tasks'], { queryParams: this.queryParams });
    }
    public setLimit(limit){
        this.pageSize = limit;
        this.queryParams.limit = limit;
        this.router.navigate(['/tasks'], { queryParams: this.queryParams });
    }
}
