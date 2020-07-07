import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../../../services/task.service'
import {Task} from '../../../models/task'
import {FormBuilder, FormGroup} from '@angular/forms'
import {AuthenticationService} from '../../../services/authentication.service'
import {ModalService} from '../../../services/modal.service'
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  updateMode:boolean = true;
  buttonText:string = 'Update'
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
      this.buttonText='Add task'
    }
    this.taskForm = this.fb.group({
      title:[''],
      description:['']
    });
    this.ts.getTaskById(this.id).subscribe(task=>{
      this.task = task
      this.taskForm.controls['title'].setValue(this.task.title)    
      this.taskForm.controls['description'].setValue(this.task.description)    
    })
  }
  /*toggleEditMode(){
    this.editMode = !this.editMode
    if(this.editMode){
      this.taskForm.controls['title'].enable()
      this.taskForm.controls['description'].enable()
    }
    else{
      this.taskForm.controls['title'].disable()
      this.taskForm.controls['description'].disable()
    }
  }*/
  onSubmit(){
    if(this.updateMode){
      this.ts.updateTask({
        _id:this.id,
        title: this.taskForm.value.title,
        description:this.taskForm.value.description
      }).subscribe()
    }
    else{
      this.ts.addTask({
        title: this.taskForm.value.title,
        description:this.taskForm.value.description,
        createdBy: this.as.currentUserValue.userName,
        parentId:null
      }).subscribe(newTask=>{
        console.log(newTask)
        this.router.navigate(['/tasks/' + newTask._id])
        
      }) 
    }
  }
  deleteTask(){
    const modalRef = this.modalService.openYesNoModal();
    modalRef.componentInstance.description = 'Do you want to delete this task?'
    modalRef.componentInstance.title = 'WARNING'
    modalRef.result.then((result)=>{
      console.log(result);
      if(result){
        this.ts.deleteTask(this.id).subscribe(res=>console.log(res))
        this.router.navigate(['/tasks'])
      }
    });
  }
}
