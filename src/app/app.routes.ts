import { Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { Counter } from './counter/counter.component';

// NOTE: Once you add a route here you can access it by going to `http://localhost:4200/<route>`
// Try it out by going to `http://localhost:4200/pokemon
export const routes: Routes = [
    {
        path: '',
        component: Counter
    },
    {
        path: 'pokemon',
        component: PokemonComponent
    }
];
