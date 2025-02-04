import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameModel } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly URL: string = 'http://localhost:3000/games'

  constructor(private http: HttpClient) { }

  getGames(): Observable<GameModel[]>{
    return this.http.get<GameModel[]>(this.URL);
  }

  getGameById(id: number): Observable<GameModel>{
    return this.http.get<GameModel>(this.URL + '/FindOne/' + id);
  }

  saveGame(game: GameModel): Observable<any>{
    return this.http.post<any>(`${this.URL}`, game);
  }

  updateGame(id: number, game: GameModel): Observable<any>{
    return this.http.put<GameModel[]>(this.URL + '/Update/' + id, game);
  }


  removeGame(id: number): Observable<any>{
    return this.http.delete<GameModel>(this.URL + '/Remove/' + id);
  }

  deleteGame(id: number): Observable<any>{
    return this.http.delete<GameModel>(this.URL +'/Delete/' + id);
  }

}
