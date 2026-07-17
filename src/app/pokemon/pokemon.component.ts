import { HttpClient } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { RouteCounterComponent } from '../route-counter/route-counter.component';

interface PokeApiKantoResult {
  name: string;
  url: string;
}

interface PokeApiKantoResponse {
  count: number;
  next: string;
  previous: string | null;
  results: PokeApiKantoResult[];
}

interface Pokemon {
  species: PokeApiKantoResult;
  sprites: Record<'front_default', string | null>;
}

const BASE_URL = 'https://pokeapi.co/api/v2';

@Component({
  selector: 'app-pokemon',
  imports: [TitleCasePipe, RouteCounterComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {
  // NOTE: HTTP Client is a service, so it needs to be injected. This means it's instantiated once for the lifetime of the application.
  private http = inject(HttpClient);

  // NOTE: This gets updated in the HTML when you change the selected Pokemon.
  // If you select the same Pokemon this signal will not trigger change detection because signals only trigger on changed values.
  // Signals test equality using `Object.is()`.
  selectedPokemonUrl = signal('');

  // NOTE: This `toSignal()` is so that the UI knows to update when this fetch request is done
  kantoPokemon = toSignal<PokeApiKantoResponse>(
    // NOTE: This is an Observable, which means it can emit data at any time.
    // Observables wait for something to subscribe to it before it starts emitting data.
    // `toSignal` inherently subscribes to the input Observable and unsubscribes when done.
    this.http.get<PokeApiKantoResponse>(`${BASE_URL}/pokemon?limit=151`)
  );

  // NOTE: `computed()` is a type of signal that watches the value of other signals 
  pokemonList = computed(() => this.kantoPokemon()?.results ?? []);

  // NOTE: This is sort of complicated syntax, but there are some conversions happening.
  // As a rule of thumb, you can think of using signals to update the UI and Observables to track asynchronous data and events.
  // 1. This listens for the `selectedPokemonUrl` signal to change and converts it to an Observable.
  // 2. It takes the new value and pipes it into a `switchMap`, which returns the value from an GET request.
  // 3. If there is a value from the GET request, it returns the value, otherwise it returns a null.
  // 4. This value is stored as this signal's value, so when it changes the component template is updated.
  selectedPokemon = toSignal(
      // NOTE: https:pokeapi.com/v2/whatever/the/selected/pokemonUrl/is
    toObservable(this.selectedPokemonUrl).pipe(
      // NOTE: `switchMap` cancels any other inflight HTTP requests, meaning if you change the URL before the previous 
      // `this.http.get()` is done, it will cancel it, to prevent multiple results from returning.
      // The return `of(null)` make the null value an Observable that returns null, since `switchMap` must return an Observable.
      switchMap(url => (url ? this.http.get<Pokemon>(url) : of(null)))
    ),
    // NOTE: Before any HTTP request is sent out, like on first page load, this signal will have the value `null`.
    { initialValue: null }
  );
}
