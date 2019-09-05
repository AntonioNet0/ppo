import { Routes } from '@angular/router';
import { AcessoComponent } from './acesso/acesso.component';
import { HomeAlunoComponent } from './aluno/home-aluno/home-aluno.component';
import { AutenticacaoGuard } from './services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { CadastroAlunoComponent } from './admin/cadastro-aluno/cadastro-aluno.component';
import { HomeAdmComponent } from './admin/home-adm/home-adm.component';
import { CadastroTurmaComponent } from './admin/cadastro-turma/cadastro-turma.component';

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'home-aluno', component: HomeAlunoComponent, canActivate: [ AutenticacaoGuard ]},
    { path: 'home-admin', component: AdminComponent, children:[
        { path: '', component: HomeAdmComponent },
        { path: 'aluno', component: CadastroAlunoComponent },
        { path: 'turma', component: CadastroTurmaComponent }
    ] },
]