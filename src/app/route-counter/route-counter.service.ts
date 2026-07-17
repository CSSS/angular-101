import { inject, Service, signal } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Service()
export class RouteCounterService {
    counter = signal(0);

    private router = inject(Router);

    constructor() {
        // NOTE: This component listens to the Angular router service for events and updates a counter.
        this.router.events.pipe(
            // NOTE: Listen only for route navigation ending events.
            filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        ).subscribe((_: NavigationEnd) => {
            this.counter.update(val => val + 1);
        })
    }
}
