import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-counter', // NOTE: This indicates how this component is referenced in other component's templates
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class Counter implements OnInit, OnDestroy {
  // NOTE: This is to prevent memory leaks.
  id?: number;

  // NOTE: Use a `signal` to update the count on the UI.
  // Signals will wait for the value to change and trigger a re-render any that listens for this signal
  // or any downstream signals (`computed()` and `effect()`)
  counter = signal<number>(0);

  // NOTE: `ngOnInit()` runs once when the component is instantiated.
  ngOnInit(): void {
    this.id = setInterval(() => {
      this.counter.update((val) => val + 1);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
