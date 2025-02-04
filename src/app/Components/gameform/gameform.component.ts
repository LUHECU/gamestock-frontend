import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { GameModel } from '../../models/game.model';

@Component({
  selector: 'app-gameform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gameform.component.html',
  styleUrl: './gameform.component.scss'
})
export class GameformComponent implements OnInit, OnChanges{
  @Input() isUpdateModal: string = 'false';
  @Input() isGameRemove: string = 'false';
  @Input() idGame: string = "";
  Game: GameModel = new GameModel ;
  formGame: FormGroup = new FormGroup({});

  constructor(private gameService : GameService, private toastr: ToastrService){
      this.formGame = new FormGroup({
        id: new  FormControl(null),
        name: new  FormControl(''),
        description: new  FormControl(''),
        image: new  FormControl(''),
        storage: new  FormControl(''),
        status: new  FormControl(true)
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.isUpdateModal === 'false'){
      this.formGame.reset();
    }
    if (changes['idGame'] && this.isUpdateModal === 'true') {
      this.editGame();
    }
    else if(changes['idGame'] && this.isGameRemove === 'true'){
      this.RemoveGame(+this.idGame);
    }
  }
  ngOnInit(): void {
  }

  editGame(){
    if(this.modalAction()){
      const id = +this.idGame;
        this.gameService.getGameById(id).subscribe({
          next:(game) =>{this.formGame.patchValue({
            id: game.id,
            name: game.name,
            description: game.description,
            image: game.image,
            storage: game.storage
          })},

          error: (err) =>{
            this.toastr.error(err.error.message, 'Fail', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
          }
        }
      );
      
    }
  }
    
  modalAction(){
    if(this.isUpdateModal === 'true'){
      return true;
    }
    else{
      return false;
    }
  }


  saveGame(): void{

    this.formGame.controls['status'].setValue(true);

    this.gameService.saveGame(this.formGame.value).subscribe({
      complete: () => {
        this.toastr.success('', 'Game add', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.formGame.reset();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }

    })

  }

  updateGame(): void{

    this.formGame.controls['status'].setValue(true);
    const id =+this.formGame.get('id')?.value;

    this.gameService.updateGame(id, this.formGame.value).subscribe({
      complete: () => {
        this.toastr.success('', 'Game updated', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.formGame.reset();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.formGame.reset();
      }

    })

  }

  RemoveGame(id: number): void{
    this.gameService.removeGame(id).subscribe({
      complete: () => {
        this.toastr.success('', 'Game Removed', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.formGame.reset();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.formGame.reset();
      }

    })
  }

}
