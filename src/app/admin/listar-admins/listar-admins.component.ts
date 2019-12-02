import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../shared/admin.model';
import { AdminDB } from '../../services/Admin-db.service';

@Component({
  selector: 'app-listar-admins',
  templateUrl: './listar-admins.component.html',
  styleUrls: ['./listar-admins.component.css'],
  providers: [AdminDB]
})
export class ListarAdminsComponent implements OnInit {

  public paginacao: any
  public paginaAtual: number = 1
  public admins: Administrador[]
  public adminsPagina: Administrador[] = null

  constructor(
    private adminBD: AdminDB
  ) { }



  ngOnInit() {
    this.adminBD.listAdmin()
      .then((admins: any) => {
        this.admins = admins
        this.paginacao = this.criarPaginacao()
        this.exibriAdminPaginacao(1)
      })
  
  }

  private criarPaginacao(): any {
    let paginacao: any[] = []
    let numPaginacao = this.admins.length / 5
    paginacao.push({ val: 1 })
    if (numPaginacao !== 0) {
      numPaginacao++
    }
    for (let i = 2; i <= numPaginacao; i++) {
      paginacao.push({ val: i })
    }
    return paginacao
  }

  public exibriAdminPaginacao(pagina: number): void {
    if (pagina <= this.paginacao.length && pagina !== 0 ) {
     
      let num = this.admins.length
      let max = pagina * 5
      let admins: Administrador[] = []
      if (num < max) {
        max = num
      }
      for (let i = (pagina - 1) * 5; i < max; i++) {
        admins.push(this.admins[i])
      }

      this.paginaAtual = pagina
      this.adminsPagina = admins
      this.paginacaoEmFoco()
      
    }
  }

  private paginacaoEmFoco(): void{

    let elementos = document.getElementsByClassName('page-item')
    for(let i = 0; i < elementos.length; i++){
      if(elementos[i].getAttribute('value') === ''+this.paginaAtual){
        elementos[i].classList.add('active')
      }else{
        elementos[i].classList.remove('active')
      }
    }

  }


  public adminTemp: Administrador = { nome: 'nome', login: 'login', senha: 'senha', email: 'email' }

  public modalUsuario(admin: Administrador): void{
    let elemento = document.getElementById('body-modal') as HTMLInputElement
    elemento.innerHTML = "Você tem certeza que deseja excluir o Administrador: " + admin.login
    
    this.adminTemp = admin

  }


}
