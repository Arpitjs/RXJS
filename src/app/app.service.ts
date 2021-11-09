import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "./User";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators'

@Injectable()

export class AppService {
    constructor(
        private http: HttpClient
    ) {  }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .pipe(
            map((users: User[]) => {
                return users.map(user => ({
                    id: user.id,
                    name: user.name + ' khatra name bro',
                    password: user.password
                }))
            })
            )
    }
    getBEUser(): Observable<{}> {
        return this.http.get('http://localhost:8000/api/data')
    }
}