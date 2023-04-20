import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { PokemonInfoComponent } from './components/pokemon-info/pokemon-info.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PreviewPokemonComponent } from './components/preview-pokemon/preview-pokemon.component';
import { MaterialModule } from './material/material/material.module';



@NgModule({
  declarations: [
    BuscarComponent,
    ListadoComponent,
    HomeComponent,
    PokemonInfoComponent,
    PreviewPokemonComponent
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    PokemonRoutingModule,
    MaterialModule
  ]
})
export class PokemonModule { }
