import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../../services/task.service'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }
  getAllTasks(){
    this.taskService.getAllTasks()    
  }
}
