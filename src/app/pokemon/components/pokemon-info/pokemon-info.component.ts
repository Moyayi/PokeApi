import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioPokemon } from '../../service/servicio.service';
import { elementAt, switchMap } from 'rxjs'
import { Pokemon } from '../../interfaces/pokemon-interfaz';
import { Elementos, Generation } from '../../interfaces/elementos-interfaz';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokemonInfoComponent implements OnInit{


  
  constructor(
    private activateRoute : ActivatedRoute,
    private router : Router,
    private service : ServicioPokemon,

  ){}
  
  pokemon !: Pokemon ;
  tipos : Elementos[] = new Array
  generalElements : string [] = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psy",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ]
  double_damage : Generation [] = []
  half_damage : Generation [] = []
  inmune : Generation [] = []
  
  
  //TODO llamar a las la tabla de elementos para saber que tipo es, hasta entonces nada.
  ngOnInit() :void {
    
    let temp = this.router.url.split('/').slice(-1).toString()
    
    this.service.getPokemon(temp)
      .subscribe({
        next: (resp ) => { 
          this.pokemon = resp
        },
        error : (e) => {
          console.log("Error")
        },
        complete : () => {
          this.comprobarElementos()
        }
      })
    
  }

  comprobarElementos(){
    for(let i = 0; i < this.pokemon.types.length ; i++){
      this.service.getTypes(this.pokemon.types[i].type.url)
        .subscribe({
          next: ( resp ) => {
            this.tipos.push(resp)
          },
          error : ( e ) => {
            console.log(e)
          },
          complete : () => {
            if(i+1 === this.pokemon.types.length){
              this.calcularDebilidades()
            }
          }
        })
    }
  }

  calcularDebilidades() {

    this.tipos.forEach( ({ damage_relations }) => {
      //Double Damage
      damage_relations.double_damage_from.forEach(double => {
        this.double_damage
          .push({
            name : double.name,
            damage : 2
          })
      })

      //Half Damage
      damage_relations.half_damage_from.forEach((half) => {
        this.half_damage
        .push({
          name   : half.name,
          damage : 0.5
        })

      })

      damage_relations.no_damage_from.forEach((inmune) => {
        this.inmune
        .push({
          name   : inmune.name,
          damage : 0
        })
  
      })
    })

    //Zero Damage
    
    //Ordenar por nombres 
    this.double_damage = this.double_damage.sort((a,b) => (a.name > b.name) ? 1 : -1);
    this.half_damage = this.half_damage.sort((a,b) => (a.name > b.name) ? 1 : -1);


    //Elimina los items repetidos y añade su daño correspondiente
    for(let i = 0 ; i < this.double_damage.length ; i++){
      for( let j = i+1 ; j < this.double_damage.length ; j++){
        if(this.double_damage[i].name === this.double_damage[j].name){
          this.double_damage[i].damage = 4
          this.double_damage.splice(j,1)
        }
      }
    }

    for(let i = 0 ; i < this.half_damage.length ; i++){
      for( let j = i+1 ; j < this.half_damage.length ; j++){
        if(this.half_damage[i].name === this.half_damage[j].name){
          this.half_damage[i].damage = 0.25
          this.half_damage.splice(j,1)
        }
      }
    }
  // FIN de la eliminacion de duplicados.

  // Calculando el daño correspondiente comparado con las debilidades si se encuentran tanto en debil y resistente.
    for(let i = 0 ; i < this.double_damage.length ; i++){
      for(let j = 0; j < this.half_damage.length ; j++){
        if(this.double_damage[i].name === this.half_damage[j].name){
          let finalValue = eval( this.double_damage[i].damage!.toString() +"*"+ this.half_damage[i].damage!.toString() )
          if(finalValue > 1){
            this.double_damage[i].damage = finalValue
          }else if(finalValue === 1){ 
            this.double_damage.splice(i,1);
            this.half_damage.splice(j,1)
          }else if(finalValue < 1){
            this.half_damage[j].damage = finalValue
            this.double_damage.splice(i,j)
          }
        }
      }
    }

    for(let i = 0 ; i < this.inmune.length ; i++){
      for(let j = 0; j < this.double_damage.length ; j++){
        if(this.inmune[i].name === this.double_damage[j].name){
          this.double_damage.splice(j,1)
        }
      }
      for(let j = 0; j < this.half_damage.length ; j++){
        if(this.inmune[i].name === this.half_damage[j].name){
          this.half_damage.splice(j,1)
        }
      }
    } 

    this.double_damage = this.double_damage.sort((a,b) => ( a.damage! < b.damage! ) ? 1 : -1);
    this.half_damage = this.half_damage.sort((a,b) => (a.damage! > b.damage!) ? 1 : -1);

    console.log(this.double_damage)
    console.log(this.half_damage)
    this.onlyNeutral()
    
  }

  onlyNeutral(){
    for(let i = 0 ; i < this.inmune.length ; i++){
      for(let a = 0 ; a < this.double_damage.length; a++){
        if(this.inmune[i].name === this.double_damage[a].name){
          this.double_damage.splice(a,1)
        }
      }
      for(let b = 0 ; b < this.half_damage.length; b++){
        if(this.inmune[i].name === this.half_damage[b].name){
          this.half_damage.splice(b,1)
        }
      }
    }
  }
  
}

