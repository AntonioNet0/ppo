import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Output() public trocarModulo: EventEmitter<string> = new  EventEmitter()

  constructor(
  ) { }

  ngOnInit() {
  }

  public trocarModuloLogin(modulo: string): void{
    this.trocarModulo.emit(modulo)
  }

}
