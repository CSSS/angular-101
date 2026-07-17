import { Component, inject } from '@angular/core';
import { RouteCounterService } from './route-counter.service';

/* NOTE: Even though this component is destroyed and remade every time you change routes
 * the value it displays is always up to date. This is because the `RouteCounterService` is instantiated once
 * and persists for the entire application lifetime.
 * The application lives until the page is changed or reloaded, but NOT when Angular performs a route change.
 */
@Component({
  selector: 'app-route-counter',
  imports: [],
  templateUrl: './route-counter.component.html',
  styleUrl: './route-counter.component.scss',
})
export class RouteCounterComponent {
  routeCounterService = inject(RouteCounterService);
}
