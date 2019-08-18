import * as firebase from 'firebase';

export class Autenticacao{

    private dominio: string = '@dominio.com'

    public errorMessage: string
    public token_id: string

    public autenticar(matricula: string, senha: string): Promise<any>{
        this.errorMessage = undefined
        return firebase.auth().signInWithEmailAndPassword(matricula+this.dominio, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        // AINDA A IMPLEMENTAR this.router.navigate(['/home'])
                        console.log("autenticou")
                    })
            })
            .catch((erro: Error) => {
                this.errorMessage = erro.message
            })
    }

}