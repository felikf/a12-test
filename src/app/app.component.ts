import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'a12-test';
  aaa: any;

  test() {
    console.log('Clicked')
  }
}
