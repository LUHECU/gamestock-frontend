import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AlbumComponent } from './Components/album/album.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    
    {path: 'album', component: AlbumComponent}

];
