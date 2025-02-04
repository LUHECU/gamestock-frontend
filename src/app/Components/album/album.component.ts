import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameModel } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { GameformComponent } from "../gameform/gameform.component";

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GameformComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit{
  isUpdate: string = 'false';
  isGameRemove: boolean = false;
  listGames: GameModel[] = [];
  idGame: string = "";

  constructor(private gameService : GameService, private toastr : ToastrService){
  }
  
  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.gameService.getGames()
    .subscribe(games => this.listGames = games);
  }

  newGame(){
    this.isUpdate = 'false';
  }

  modalAction(){
    if(this.isUpdate === 'true'){
      return true;
    }
    else{
      return false;
    }
  }
  
  editGame(id: number){
    this.isUpdate = 'true';
    this.idGame = id.toString();
  }

  removeGame(id: number){
    this.isGameRemove = true;
    this.idGame = id.toString();
  }
}
