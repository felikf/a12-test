import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'a12-test';

  promises: (() => Promise<any>)[] = [];

  constructor() {
    for (let i = 0; i < 4; i++) {
      this.promises.push(
        () => of(i).pipe(
          delay(1000),
          tap(i => console.log(`Promise done ${i}`))
        ).toPromise()
      )
    }
  }

  async ngOnInit(): Promise<void> {
    console.log('AppComponent ngOnInit START')
    for (let i = 0; i < this.promises.length; i++) {
      await this.promises[i]();
    }
    console.log('AppComponent ngOnInit END')
  }
}
