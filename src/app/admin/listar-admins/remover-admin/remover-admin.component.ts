import { Component, OnInit, Input } from '@angular/core';
import { Administrador } from 'src/app/shared/admin.model';
import { AdminDB } from 'src/app/services/Admin-db.service';

@Component({
  selector: 'app-remover-admin',
  templateUrl: './remover-admin.component.html',
  styleUrls: ['./remover-admin.component.css'],
  providers: [AdminDB]
})
export class RemoverAdminComponent implements OnInit {

  @Input() public admin: Administrador

  constructor(
    private adminDB: AdminDB,
  ) { }

  ngOnInit() {
  }

  public excluir(): void{
    this.adminDB.removeAdmin(this.admin)
      .then(() => {
        alert('Sucesso!')
        window.location.reload()
      })
  }



}
