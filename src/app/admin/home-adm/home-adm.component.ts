import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-adm',
  templateUrl: './home-adm.component.html',
  styleUrls: ['./home-adm.component.css']
})
export class HomeAdmComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public openCity(evt: Event, cityName):void {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    document.querySelectorAll('.tablinks')[cityName==='Turmas'? 0 : cityName==='Disciplinas' ? 1: cityName==='Alunos' ? 2 : cityName==="Professores" ? 3 : 4].className += ' active'
  
  }


}
