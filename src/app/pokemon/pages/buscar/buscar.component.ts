import { Component } from '@angular/core';
import { ServicioPokemon } from '../../service/servicio.service';
import { Router } from '@angular/router';
import { Pokemon } from '../../interfaces/pokemon-interfaz';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {



  constructor( 
    private service : ServicioPokemon,
    private router : Router,
  ){}


  busqueda : string = "";
  pokemon  !: Pokemon;
  pokemonEncontrado : boolean = false;
  noEncontrado : string = ""

  buscarPokemon() : void  {

    if(this.busqueda.trim() === ""){
      return ;
    }

    this.service.getPokemon(this.busqueda.toLocaleLowerCase())
      .subscribe({
        next: (resp ) => {
          this.pokemon = resp;
          this.pokemonEncontrado = true;
          this.noEncontrado = ""
        },
        error : ( e ) => {
          this.pokemonEncontrado = false;
          this.noEncontrado = `No se ha encontrado nignun pokemon con el nombre ${this.busqueda}`
        },
        complete : () => {
          console.log("Completado, mostrar algo quizás? ")
        }
        
      })
  }

}



/*


      }
*/