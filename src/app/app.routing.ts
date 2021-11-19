import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { NotesComponent } from './pages/notes/notes.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent, pathMatch: 'full' },
  { path: 'notes', component: NotesComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
