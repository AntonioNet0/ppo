import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-postar-material',
  templateUrl: './postar-material.component.html',
  styleUrls: ['./postar-material.component.css']
})
export class PostarMaterialComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    
  })

  public email: string
  public imagem: any

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  constructor() { }

  ngOnInit() {
  }

}
