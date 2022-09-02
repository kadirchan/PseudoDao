import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  fart() {
    let audio = new Audio();
    audio.src = './././assets/sound/fart.ogg';
    audio.load();
    audio.play();
  }
}
