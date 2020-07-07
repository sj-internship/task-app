import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../../../services/task.service';
import {Task} from '../../../models/task';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {ModalService} from '../../../services/modal.service';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  updateMode:boolean = true;
  buttonText:string = 'Update';
  id: string;
  task:Task;
  editMode:boolean = false;
  taskForm:FormGroup;
  constructor(
    private route:ActivatedRoute,
    private ts:TaskService,
    private fb : FormBuilder, 
    private as : AuthenticationService,
    private router : Router,
    private modalService : ModalService
    ) { }
    
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id === 'newTask'){
      this.updateMode=false;
      this.buttonText='Add task';
    }
    this.taskForm = this.fb.group({
      title:[''],
      description:['']
    });
    this.ts.getTaskById(this.id).subscribe(task=>{
      this.task = task;
      this.taskForm.controls['title'].setValue(this.task.title);    
      this.taskForm.controls['description'].setValue(this.task.description);    
    })
  }
  onSubmit(){
    if(this.updateMode){
      this.ts.updateTask({
        _id:this.id,
        title: this.taskForm.value.title,
        description:this.taskForm.value.description
      }).subscribe();
    }
    else{
      this.ts.addTask({
        title: this.taskForm.value.title,
        description:this.taskForm.value.description,
        createdBy: this.as.currentUserValue.userName,
        parentId:null
      }).subscribe(newTask=>{
        this.router.navigate(['/tasks/' + newTask._id]);
        
      }) 
    }
  }
  deleteTask(){
    const modalParams={
      title:'WARNING',
      description:'Do you want to delete this task?'
    }
    const modalRef = this.modalService.openYesNoModal(modalParams);
    modalRef.result.then((result)=>{
      if(result){
        this.ts.deleteTask(this.id).subscribe(res=>{
          this.router.navigate(['/tasks']);
        })
      }
    });
  }
}
