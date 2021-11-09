import { Component, OnInit } from '@angular/core';
import { Address } from '../Address';
import { User } from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  user: User = {
    name: '',
    id: 1,
    password: ''
  }
  address: Address = {
    street: '',
    city: '',
    pincode: 0
  }
  ngOnInit(): void {
  }
  register(user: User, address: Address) {
    let data = {...user, address}
    console.log('data', data)
  }
 }
