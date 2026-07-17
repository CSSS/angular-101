import { Component } from '@angular/core';

@Component({
  selector: 'app-bad-counter',
  imports: [],
  templateUrl: './bad-counter.component.html',
  styleUrl: './bad-counter.component.scss',
})
export class BadCounter {
  // NOTE: This is to prevent memory leaks.
  id?: number;

  // NOTE: Updating class variables will not trigger Angular change detection
  counter = 0;

  ngOnInit(): void {
    this.id = setInterval(() => {
      // NOTE: The value of the counter is updating, but Angular doesn't know to update it on the UI
      this.counter++;
      // You can confirm this is by looking at the console
      console.log('Bad counter', this.counter);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
