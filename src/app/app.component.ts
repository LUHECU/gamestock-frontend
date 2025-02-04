import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AlbumComponent } from "./Components/album/album.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gamestock-frontend';
}
