import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon-interfaz';

@Component({
  selector: 'app-preview-pokemon',
  templateUrl: './preview-pokemon.component.html',
  styleUrls: ['./preview-pokemon.component.css']
})
export class PreviewPokemonComponent {

  @Input() dataInfoPokemon ! : Pokemon
  // numero : number = 1;
}
