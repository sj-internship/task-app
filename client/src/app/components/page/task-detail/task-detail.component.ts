import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { ModalService } from '../../../services/modal.service';
import { YesNoModalParams } from '../../../models/modals'
import { TaskUpdate, TaskAdd } from '../../../models/task'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  public updateMode: boolean = true;
  public buttonText: string = 'Update';
  private id: string;
  public task: Task;
  public taskForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private ts: TaskService,
    private fb: FormBuilder,
    private as: AuthenticationService,
    private router: Router,
    private modalService: ModalService
  ) { }

  public ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.taskForm = this.fb.group({
      title: [''],
      description: ['']
    });
    if (this.id === 'newTask') {
      this.updateMode = false;
      this.buttonText = 'Add task';
    }
    else {
      this.ts.getTaskById(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(task => {
        console.log(task)
        this.task = task;
        this.taskForm.controls['title'].setValue(this.task.title);
        this.taskForm.controls['description'].setValue(this.task.description);
      })
    }
  }
  public onSubmit() {
    if (this.updateMode) {
      const updatedTask: TaskUpdate = {
        _id: this.id,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description
      }
      this.ts.updateTask(updatedTask).pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
        this.router.navigate(['/tasks'])
      });
    }
    else {
      const newTask: TaskAdd = {
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
          console.log(res)
          this.router.navigate(['/tasks']);
        })
      }
    });
  }
  public ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
