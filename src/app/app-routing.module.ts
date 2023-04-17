import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pokemon/pages/home/home.component';
import { PokemonInfoComponent } from './pokemon/components/pokemon-info/pokemon-info.component';
import { PokemonModule } from './pokemon/pokemon.module';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent, 
  },
  {
    path:'pokemon',
    loadChildren: 
      () => import('./pokemon/pokemon.module')
        .then(m => m.PokemonModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
