import { Hero } from 'src/app/models/hero.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  hero: Hero = new Hero();
  edit: Boolean = false;
  hero$: EventEmitter<Hero> = new EventEmitter<Hero>();

  constructor() {}

  get getHero(): Hero {
    return this.hero;
  }

  get getHero$(): Observable<Hero> {
    return this.hero$.asObservable();
  }

  setEdit(edit: Boolean) {
    this.edit = edit;
  }
}
