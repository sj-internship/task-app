import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { ModalService } from '../../../services/modal.service';
import { YesNoModalParams } from '../../../models/modals'
import { TaskUpdateModel, TaskAddModel } from '../../../models/task'
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Select2OptionData } from 'ng2-select2'
import { LoaderService } from 'src/app/services/loader.service';
import {DeadlineCounterComponent} from '../../deadline-counter/deadline-counter.component'
@Component({
    selector: 'app-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject<void>();
    public updateMode: boolean = true;
    public fetchedData: boolean = false;
    public selectOptions: Select2Options;
    public selectValue: string[] = [];
    public buttonText: string = 'Update';
    public allUniqueTags: Array<Select2OptionData> = [];
    private id: string;
    public tags: string[];
    public task: TaskModel;
    public taskForm: FormGroup;

    @ViewChild(DeadlineCounterComponent)
    private counterComponent: DeadlineCounterComponent;

    constructor(
        private route: ActivatedRoute,
        private ts: TaskService,
        private fb: FormBuilder,
        private as: AuthenticationService,
        private router: Router,
        private modalService: ModalService,
        public loaderService: LoaderService
    ) { }

    public ngOnInit() {
        this.initialize();
        this.initializeSelectOptions();
        this.getTags();
    }
    public onSubmit() {
        if (this.updateMode) {
            const updatedTask: TaskUpdateModel = {
                _id: this.id,
                title: this.taskForm.value.title,
                description: this.taskForm.value.description,
                tags: this.taskForm.value.tags,
                deadline: this.taskForm.value.deadline
            }
            this.loaderService.setLoading(true);
            this.ts.updateTask(updatedTask).pipe(
                finalize(() => {
                    this.loaderService.setLoading(false);
                }),
                takeUntil(this.ngUnsubscribe)
            ).subscribe(
                _ => this.router.navigate(['/tasks']),
                err => { console.log(err)},
            );
        }
        else {
            const newTask: TaskAddModel = {
                title: this.taskForm.value.title,
                description: this.taskForm.value.description,
                createdBy: this.as.currentUserValue.userName,
                parentId: null,
                tags: this.taskForm.value.tags,
                deadline: this.taskForm.value.deadline
            }
            this.loaderService.setLoading(true);
            this.ts.addTask(newTask).pipe(
                finalize(() => {
                    this.loaderService.setLoading(false);
                }),
                takeUntil(this.ngUnsubscribe)
            ).subscribe(
                newTask => {
                    this.switchToUpdateMode(newTask._id);
                },
                _ => { },

            )
        }
    }
    private switchToUpdateMode(taskId) {
        this.updateMode = true;
        this.buttonText = 'Update';
        this.id = taskId;
    }
    public deleteTask() {
        const modalParams: YesNoModalParams = {
            title: 'WARNING',
            description: 'Do you want to delete this task?'
        }
        const modalRef = this.modalService.openYesNoModal(modalParams);
        modalRef.result.then((result) => {
            if (result) {
                this.loaderService.setLoading(true);
                this.ts.deleteTask(this.id).pipe(
                    finalize(() => {
                        this.loaderService.setLoading(false);
                    }),
                    takeUntil(this.ngUnsubscribe)
                ).subscribe(
                    res => {
                        this.router.navigate(['/tasks']);
                    },
                    _ => { },
                )
            }
        });
    }
    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    private getTags() {
        this.loaderService.setLoading(true);
        return this.ts.getTags().pipe(
            finalize(() => {
                this.loaderService.setLoading(false)
            }),
            takeUntil(this.ngUnsubscribe)
        ).subscribe(
            tags => this.prepareTagsSelect(tags),
            _ => { }
        );
    }

    private prepareTagsSelect(tags) {
        this.allUniqueTags = tags.map((tag, index) => ({ id: index, text: tag }));
        this.tags.forEach(tag => {
            const foundTag = this.allUniqueTags.find(item => item.text === tag)
            this.selectValue = [...this.selectValue, foundTag.id.toString()];
        })
    }
    public onTagsChanged(event) {
        const textTagsArray = event.data.map(item => item.text);
        this.taskForm.get('tags').setValue(textTagsArray);
    }

    private initialize() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.taskForm = this.fb.group({
            title: [null],
            description: [null],
            tags: [null],
            deadline: [null]
        });
        if (this.id === 'newTask') {
            this.updateMode = false;
            this.tags = [];
            this.buttonText = 'Add task';
        }
        else {
            this.loaderService.setLoading(true);
            this.ts.getTaskById(this.id).pipe(
                finalize(() => {
                    this.loaderService.setLoading(false);
                    this.fetchedData = true;
                }),
                takeUntil(this.ngUnsubscribe)
            ).subscribe(
                task => {
                    this.task = task;
                    this.tags = task.tags;
                    this.taskForm.patchValue(task);
                },
                _ => { },
            )
        }
    }

    private initializeSelectOptions() {
        this.selectOptions = {
            allowClear: true,
            placeholder: 'Choose a tag',
            multiple: true,
            tags: true,
        }
    }
    public onDateChange(date: Date) {
        this.taskForm.patchValue({ deadline: date });
        this.counterComponent.setDate(date);
    }
}
