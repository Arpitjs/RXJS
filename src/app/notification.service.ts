import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifSubject = new BehaviorSubject<string>('')
  constructor() { }

  sendNotification(data: any) {
    this.notifSubject.next(data)
  }
}
