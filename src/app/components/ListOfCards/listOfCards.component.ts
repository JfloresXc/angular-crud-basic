import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'ListOfCards',
  templateUrl: 'listOfCards.html',
})
export class ListOfCardsComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  suscription: Subscription = new Subscription();

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    if (this.heroesService.getHeroes().length === 0) {
      this.heroesService.fetchHeroes(3);
    }

    this.suscription = this.heroesService.getHeroes$().subscribe((heroes) => {
      this.heroes = heroes;
    });
    this.heroesService.suscribeHeroes();
  }

  ngOnDestroy(): void {
    // this.heroes = [];
    this.suscription.unsubscribe();
    // console.log('destruido');
  }
}
