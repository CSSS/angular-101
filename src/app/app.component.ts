import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Counter } from "./counter/counter.component";

@Component({
  selector: 'app-root',
  // Imports tell the Angular compiler that something is being used, so make sure to include it in the bundle.
  // If something exists, but is not used anywhere then Angular can tree shake it, meaning dead code doesn't get shipped.
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected readonly title = signal('angular-101');
}
