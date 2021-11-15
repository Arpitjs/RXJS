import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { User } from '../User';
import { Subject, Observable, BehaviorSubject, fromEvent } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit, AfterViewInit {
  users: User[] = []
  data: any
  notif: any
  reqData: any
  reqData2: any
  @ViewChild('myInput') myInput: ElementRef | undefined
  @ViewChild('myInput2') myInput2: ElementRef | undefined
  constructor(
    private appService: AppService,
    private notifService: NotificationService
  ) {}

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

  ngAfterViewInit() {
    //debounce time
    const searchTerm = fromEvent<any>(this.myInput?.nativeElement, 'keyup')
    searchTerm.pipe(
      map(event => event.target.value),
      debounceTime(1000)
    ).subscribe(res => {
      this.reqData = res
      console.log(this.reqData)
      setTimeout(() => this.reqData = null, 2000)
    })
    // distinct until changed
    // will not send duplicate request
    const searchTerm2 = fromEvent<any>(this.myInput2?.nativeElement, 'keyup')
    searchTerm2.pipe(
      map(event => event.target.value),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(res => {
      this.reqData2 = res
      console.log(this.reqData2)
      setTimeout(() => this.reqData2 = null, 2000)
    })
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
