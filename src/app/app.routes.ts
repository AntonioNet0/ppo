import { Routes } from '@angular/router';
import { AcessoComponent } from './acesso/acesso.component';
import { HomeAlunoComponent } from './homes/home-aluno/home-aluno.component';
import { AutenticacaoGuard } from './services/auth-guard.service';
import { HomeAdmComponent } from './homes/home-adm/home-adm.component';

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'home-aluno', component: HomeAlunoComponent, canActivate: [ AutenticacaoGuard ]},
    { path: 'home-admin', component: HomeAdmComponent }
]