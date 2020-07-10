import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { ModalService } from '../../../services/modal.service';
import { YesNoModalParams } from '../../../models/modals'
import { TaskUpdateModel, TaskAddModel } from '../../../models/task'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Select2OptionData } from 'ng2-select2'
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  public updateMode: boolean = true;
  public buttonText: string = 'Update';
  public allUniqueTags: Array<Select2OptionData> = [];

  private id: string;
  public tags: string[];
  public task: TaskModel;
  public taskForm: FormGroup;
  public inputNewTag: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private ts: TaskService,
    private fb: FormBuilder,
    private as: AuthenticationService,
    private router: Router,
    private modalService: ModalService
  ) { }

  public ngOnInit() {
    this.initialize();
    this.getTags();
  }
  public onSubmit() {
    if (this.updateMode) {
      const updatedTask: TaskUpdateModel = {
        _id: this.id,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        tags: this.tags
      }
      this.ts.updateTask(updatedTask).pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
        this.router.navigate(['/tasks'])
      });
    }
    else {
      const newTask: TaskAddModel = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        createdBy: this.as.currentUserValue.userName,
        parentId: null
      }
      this.ts.addTask(newTask).pipe(takeUntil(this.ngUnsubscribe)).subscribe(newTask => {
        this.switchToUpdateMode(newTask._id);
      })
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
        this.ts.deleteTask(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          this.router.navigate(['/tasks']);
        })
      }
    });
  }
  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  private getTags() {
    return this.ts.getTags().subscribe(
      tags => this.prepareTagsSelect(tags)
    );
  }

  private prepareTagsSelect(tags) {
    tags.forEach((item, index) => {
      this.allUniqueTags = [...this.allUniqueTags, { id: index, text: item }];
    });
  }
  public selectChanged(event) {
    if (!this.tags.includes(event.data[0].text)) {
      this.tags.push(event.data[0].text)


      // I don't know if the user should be able to choose tags which are already in use
      //this.allUniqueTags = this.allUniqueTags.filter((_, index) => index != event.value)  
    }
  }
  public deleteTag(index) {
    this.tags = this.tags.filter((_, i) => i !== index);
  }
  private initialize() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.taskForm = this.fb.group({
      title: [''],
      description: ['']
    });
    if (this.id === 'newTask') {
      this.updateMode = false;
      this.tags = [];
      this.buttonText = 'Add task';
    }
    else {
      this.ts.getTaskById(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(task => {
        this.task = task;
        this.tags = task.tags;
        this.taskForm.controls['title'].setValue(this.task.title);
        this.taskForm.controls['description'].setValue(this.task.description);
      })
    }
    this.inputNewTag = this.fb.group({
      tag: ['']
    })
  }
  public addNewTag() {
    const tag = this.inputNewTag.value.tag;
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.allUniqueTags = [...this.allUniqueTags, tag];
    };
  }
}
