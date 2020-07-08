import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {Task} from '../../../models/task';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public tasks:Task[];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getAllTasks();
  }
  public getAllTasks(){
    this.taskService.getAllTasks().subscribe(tasks=>{
      this.tasks = tasks;
    });    
  }
}
