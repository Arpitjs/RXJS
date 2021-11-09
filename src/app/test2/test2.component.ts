import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {
  notifMessage: any
  constructor(
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notifService.notifSubject.subscribe(data => this.notifMessage = data)
  }
 
}
