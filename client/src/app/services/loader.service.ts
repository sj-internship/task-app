import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IfStmt } from '@angular/compiler';
@Injectable()
export class LoaderService {
    isLoading = new Subject<boolean>();
    counter = 0;
    setLoading(enabled:boolean){
        if(enabled){
            this.counter++;
        }
        else if(this.counter){
            this.counter--;
        }
        if(this.counter>0){
            this.isLoading.next(true);
        }
        else{
            this.isLoading.next(false);
        }
    }
}