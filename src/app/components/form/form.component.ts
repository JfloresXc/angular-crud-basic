import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HeroesService } from '../../services/heroes.service';
import { HeroService } from './../../services/hero.service';

import { Hero } from 'src/app/models/hero.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  @Input() actionSubmit: String = 'add';
  form: FormGroup;
  hero: Hero = new Hero();
  textButton: String = 'Add Hero';

  constructor(
    private _builder: FormBuilder,
    private heroesService: HeroesService,
    private heroService: HeroService
  ) {
    this.form = this._builder.group({
      heroName: ['', Validators.compose([Validators.required])],
      originalName: ['', Validators.required],
      firstAppearance: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.heroService.getHero$.subscribe((hero) => {
      this.hero = hero;
      this.textButton = 'Edit Hero';
      this.form.controls?.heroName.setValue(hero.heroName);
      this.form.controls?.originalName.setValue(hero.originalName);
      this.form.controls?.firstAppearance.setValue(hero.firstAppearance);
    });
  }

  addOrEdit() {
    if (this.heroService.edit === false) {
      const newHero: Hero = {
        ...this.form.value,
        urlImage: 'assets/spidey.jpg',
      };
      this.heroesService.addHeroe(newHero);
    } else {
      this.heroesService.editHero({
        ...this.hero,
        ...this.form.value,
      });
      this.heroService.edit = false;
      this.textButton = 'Add Hero';
    }
    this.form.reset();
  }
}
