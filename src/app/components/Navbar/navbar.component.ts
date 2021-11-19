import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'Navbar',
  templateUrl: 'navbar.html',
})
export class NavbarComponent implements OnInit {
  limit: Number = 1;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes$().subscribe((heroes) => {
      this.limit = heroes.length;
    });
  }
}
