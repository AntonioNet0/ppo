import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Administrador } from 'src/app/shared/admin.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminDB } from 'src/app/services/Admin-db.service';

@Component({
  selector: 'app-editar-admin',
  templateUrl: './editar-admin.component.html',
  styleUrls: ['./editar-admin.component.css'],
  providers: [AdminDB]
})
export class EditarAdminComponent implements OnInit {

  @Input() public admin: Administrador

  public estadoBotao: boolean = true

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl({value:'', disabled: false}, [Validators.required]),
    'login': new FormControl({value:'', disabled: true}),
    'senha': new FormControl({value:'', disabled: true }),
    'email': new FormControl({value:'', disabled: false}, [Validators.required, Validators.minLength(6), Validators.email])
  })

  constructor(
    private adminDB: AdminDB
  ) { }

  ngOnInit() {
  }

  public formValido(): void{
    if(this.formulario.valid){
      this.estadoBotao = false
    }else{ 
      this.estadoBotao = true
    }
  }

  public confirmarAlteracoes(): void {
    if (!this.formulario.valid) {

      this.formulario.get('nome').markAsTouched()
      this.formulario.get('email').markAsTouched()


    } else {
      let administrador: Administrador = new Administrador(
        this.formulario.value.nome + '',
        this.admin.login,
        this.admin.senha = '',
        this.formulario.value.email + ''
      )
    
      this.adminDB.editarAdmin(administrador, this.admin.login)
        .then(() => {
          alert("Sucesso!")
          window.location.reload()
        },
          (error: any) => {
            alert(error)
          }
        )
    }




  }

}
