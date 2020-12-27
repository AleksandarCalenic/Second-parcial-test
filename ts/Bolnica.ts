/// <reference path="Pacijent.ts" />

class Bolnica {

    private _naziv: string;
    private _grad: string;
    private _pacijenti: Pacijent[];

    constructor(naziv: string, grad: string){
        this._naziv = naziv;
        this._grad = grad;
        this._pacijenti = [];
    }

	public get naziv(): string {
		return this._naziv;
	}

	public get grad(): string {
		return this._grad;
	}

	public get pacijenti(): Pacijent[] {
		return this._pacijenti;
	}

	public set naziv(value: string) {
		this._naziv = value;
	}

	public set grad(value: string) {
		this._grad = value;
	}

	public set pacijenti(value: Pacijent[]) {
		this._pacijenti = value;
	}

    refreshHTML(): void {

        let tabela: HTMLElement = document.getElementById('tbody') as HTMLElement;
        let out: string = '';

        for (let i = 0; i < this._pacijenti.length; i++){
            out += `<tr>`;
            out += `<td>${this._pacijenti[i].id}</td>`;
            out += `<td>${this._pacijenti[i].ime}</td>`;
            out += `<td>${this._pacijenti[i].prezime}</td>`;
            out += `<td>${this._pacijenti[i].telesnaTemperatura}</td>`;
            out += `<td>${this._pacijenti[i].pcrTest}</td>`;
            out += `<td><ul>`;
            for (let j = 0; j < this.pacijenti[i].ostaliSimptomi.length; j++){
                out += `<li>` + this._pacijenti[i].ostaliSimptomi[j].naziv + "<br/></li>";
            }
            out += `</ul></td>`;
            out += `</tr>`;
        }

        tabela.innerHTML = out;

    }

    dodajPacijenta(value: Pacijent): void {
        this._pacijenti.push(value);
        this.refreshHTML();
    }

    procentualnoObolelih(): number {
       
        let oboleli: Pacijent[] = this._pacijenti.filter(el => el.pcrTest == "Pozitivan");
        let procenatOb: number = (oboleli.length / this._pacijenti.length) * 100;
    
        return procenatOb;
    }

}
