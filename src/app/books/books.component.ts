import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppService } from '../app.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  books: string[] = []
  subjectKeyUp = new Subject<any>()
  constructor(
    private bookService: AppService
  ) { }

  ngOnInit(): void {
    //only call the function that makes the API call AFTER debouncing.
    this.subjectKeyUp.pipe(
      debounceTime(1000), distinctUntilChanged()
    )
      .subscribe(res => this.getAPIBooks(res), err => console.log(err))
  }
  typeBooks(e: any) {
    this.subjectKeyUp.next(e.target.value)
  }
  getAPIBooks(value: any) {
    this.bookService.getBooks(value)
      .subscribe(res => this.books = res, err => console.log(err))
  }
}
