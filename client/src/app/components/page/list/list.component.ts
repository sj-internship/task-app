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
    public collectionSize: number = 5;
    private queryParams: any;
    private taskCount:number;
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
            this.queryParams = params;
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
        const skip = this.collectionSize * (page - 1);
        console.log(page - 1)
        const newQuery: any = {};
        const queryKeys = Object.keys(this.queryParams);
        queryKeys.forEach(queryKey => {
            newQuery[queryKey] = this.queryParams[queryKey];
        })
        newQuery.skip = skip;
        newQuery.limit = this.collectionSize;
        this.router.navigate(['/tasks'], { queryParams: newQuery });
    }
    public setLimit(limit){
        this.collectionSize = limit;
    }
}
