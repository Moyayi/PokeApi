import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs'
import { Pokemon } from '../interfaces/pokemon-interfaz';
import { Elementos } from '../interfaces/elementos-interfaz';

@Injectable({
  providedIn: 'root'
})

//TODO cambiar el nombre de la clase
export class ServicioPokemon {

  constructor(private http : HttpClient) { }
  
  private endPoint : string = environment.endPointApi;

  getPokemon(pokemon : string ) : Observable<Pokemon> { 
    return this.http.get<Pokemon>(`${this.endPoint}/pokemon/${pokemon}`)
  }

  getTypes(api : string) : Observable<Elementos> { 
    return this.http.get<Elementos>(api)
  }

}
