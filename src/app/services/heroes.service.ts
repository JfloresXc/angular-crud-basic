import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero } from 'src/app/models/hero.model';
import { url } from '../config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroes: Hero[] = [];
  heroes$: Subject<Hero[]> = new Subject<Hero[]>();

  constructor(private http: HttpClient) {}

  fetchHeroes(limit: Number = 10) {
    const heroesUrl = `${url}&limit=${limit}`;

    this.http.get(heroesUrl).subscribe((response: any) => {
      const { data = {} } = response;
      const { results = [] } = data;

      results.forEach((item: any, index: number) => {
        const newHero: Hero = {
          id: index,
          heroName: item.name,
          originalName: item.name,
          firstAppearance: item.comics.items[0]?.name || 'Primera aparicion',
          urlImage: item.thumbnail.path + '.' + item.thumbnail.extension,
        };
        this.heroes.push(newHero);
      });

      this.suscribeHeroes();
    });
  }

  getHeroes() {
    return this.heroes;
  }

  getHeroes$(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }

  suscribeHeroes() {
    this.heroes$.next(this.heroes);
  }

  addHeroe(newHeroe: Hero) {
    newHeroe.id = this.heroes[this.heroes.length - 1].id + 1;
    this.heroes.push(newHeroe);
    this.suscribeHeroes();
  }

  deleteHeroe(index: Number) {
    this.heroes = this.heroes.filter((_, iterator) => iterator != index);
    this.suscribeHeroes();
  }

  searchHero(index: number): Hero {
    return this.heroes[index];
  }

  editHero(heroEdited: Hero) {
    this.heroes = this.heroes.map((hero) => {
      if (hero.id === heroEdited.id) return heroEdited;
      return hero;
    });
    this.suscribeHeroes();
  }
}
