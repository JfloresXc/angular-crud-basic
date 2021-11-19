import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';

import { HeroesService } from '../../services/heroes.service';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'CardImage',
  templateUrl: 'cardImage.html',
})
export class CardImageComponent {
  @Input() hero: Hero = new Hero();
  @Input() alt: String = 'Image´s Description';
  @Input() index: number = 0;

  constructor(
    private heroesService: HeroesService,
    private heroService: HeroService
  ) {}

  deleteCard(index: Number) {
    this.heroesService.deleteHeroe(index);
  }

  viewCard(index: number) {
    const hero = this.heroesService.searchHero(index);
    this.heroService.setEdit(true);
    this.heroService.hero = hero;
    this.heroService.hero$.emit(hero);
  }
}
