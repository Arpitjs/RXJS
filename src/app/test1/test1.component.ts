import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { User } from '../User';
import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {
  users: User[] = []
  data: any
  notif: any
  constructor(
    private appService: AppService,
    private notifService: NotificationService

  ) {
  }

  ngOnInit(): void {
    // this.appService.getUsers()
    // .subscribe(users => this.users = users)

    //in observable for every new subsciber, new execution is created (unicast)
    let observable = new Observable(observer => observer.next(Math.random()))
    observable.subscribe(data => console.log(data))
    observable.subscribe(data => console.log(data))

    //subject
    //subjects are multicast
    //both subscribers get the same data
    const subject = new Subject()
    subject.subscribe(observer => console.log(`observer A: ${observer}`))
    subject.subscribe(observer => console.log(`observer B: ${observer}`))

    subject.next(Math.random())
    subject.subscribe(d => console.log(`subscriber 3, ${d}`)) //doesnt get the data

    //behavorial subject
    // subject doesnt hold a value but BehaviorSubject DOES
      // holds one value, when its subscirbed it emits the value immedeately
      const bSubject = new BehaviorSubject<number>(12)
      bSubject.subscribe(d => console.log(`B subject one, ${d}`))
      bSubject.next(3)
      //now one and two both get 3, and 3 gets its value as well
      bSubject.subscribe(d => console.log(`b subject sub two, ${d}`))
      this.notifService.notifSubject.subscribe(data => this.notif = data)
  }

  getUser() {
    this.appService.getBEUser()
      .subscribe((res: any) => this.data = res,
        err => console.log(err))
  }
  sendMsg(msg: any) {
    this.notifService.sendNotification(msg.value)
  }

}
