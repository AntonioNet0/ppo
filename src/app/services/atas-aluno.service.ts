import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Aluno } from '../shared/aluno.model';
import { Disciplina } from '../shared/disciplina.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class AtaAlunoPDF {

    public ataPresenca(alunos: Aluno[], disciplina: Disciplina) {
        let linha = this.construirTabela(alunos)
        const documentoDefinicoes = {
            content: [
                {

                    text: '\n\n',
                    alignment: 'center',
                    style: 'header',
                    fontSize: 16,
                    bold: true

                },
                {
                    style: 'tabelaExample',
                    margin: [0, 0, 0, 0],
                    table: {
                        widths: ['*'],
                        body: [



                            [{
                                text: 'ATA DE PRESENÇA',
                                alignment: 'center',
                                style: 'header',
                                fontSize: 14,
                                bold: true
                            }]

                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                        },
                        alignment: 'center',
                    }
                },
                {
                    text: '\n'
                },
                {
                    style: 'tabelaExample',
                    margin: [0, 0, 0, 0],
                    table: {
                        widths: ['*'],
                        body: [

                            [{
                                text:  `Professor: {aluno.nome}\nDisciplina: ${disciplina.nome} - ${disciplina.codigo}`,

                                fontSize: 12,

                            }]

                        ]
                    }
                },
                {
                    text: '\n'
                },
                {
                    style: 'tabelaExample',
                    margin: [0, 0, 0, 0],
                    table: {
                        headerRows: 1,
                        margin: [0, 0, 0, 0],
                        widths: [15, 75, 185, 205],
                        body: [
                            ['Nº', 'Matrícula', 'Nome', 'Assinatura'],
                            ...linha
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                        },
                        alignment: 'center',
                    }
                }


            ]

        }
        pdfMake.createPdf(documentoDefinicoes).open();
    }

    public construirTabela(alunos: Aluno[]): any{
        return alunos.map((aluno, index) => {
            return [{
                text: index+1,
                fontSize: 10
            },
            {
                text: aluno.matricula,
                fontSize: 9
            },
            {
                text:  `${aluno.nome}` ,
                fontSize: 9
            },
            {
                text: '_____________________________________',
            }
        ]
        })
    }

}