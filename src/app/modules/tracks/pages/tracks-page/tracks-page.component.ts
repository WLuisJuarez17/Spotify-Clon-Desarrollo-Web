import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { LoginPageComponent } from '@modules/auth/pages/login-page/login-page.component';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy{
  tracksTrending: Array<TrackModel>= []
  tracksRandom: Array<TrackModel>= []

  listObservers$: Array<Subscription> =[]

  constructor(private trackService: TracksService) { }

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()
  }

  async loadDataAll():Promise<any>{
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise()

  }
  loadDataRandom():void{
     this.trackService.getAllRandom$()
    .subscribe(
      (response:TrackModel[]) => {
        this.tracksRandom = response
      }) 
  }

  ngOnDestroy(): void {
    
  }

}
