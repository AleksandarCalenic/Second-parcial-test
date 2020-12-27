/// <reference path="Simptom.ts" />

class Pacijent {

    private _id: number;
    private _ime: string;
    private _prezime: string;
    private _telesnaTemperatura: number;
    private _pcrTest: string;
    private _ostaliSimptomi: Simptom[];

    constructor(id: number, ime: string, prezime: string, telesnaTemperatura: number, pcrTest: string){
        this._id = id;
        this._ime = ime;
        this._prezime = prezime;
        this._telesnaTemperatura = telesnaTemperatura;
        this._pcrTest = pcrTest;
        this._ostaliSimptomi = [];
    }

	public get id(): number {
		return this._id;
	}

	public get ime(): string {
		return this._ime;
	}

	public get prezime(): string {
		return this._prezime;
	}

	public get telesnaTemperatura(): number {
		return this._telesnaTemperatura;
	}

	public get pcrTest(): string {
		return this._pcrTest;
	}

	public get ostaliSimptomi(): Simptom[] {
		return this._ostaliSimptomi;
	}

	public set id(value: number) {
		this._id = value;
	}

	public set ime(value: string) {
		this._ime = value;
	}

	public set prezime(value: string) {
		this._prezime = value;
	}

	public set telesnaTemperatura(value: number) {
		this._telesnaTemperatura = value;
	}

	public set pcrTest(value: string) {
		this._pcrTest = value;
	}

	public set ostaliSimptomi(value: Simptom[]) {
		this._ostaliSimptomi = value;
    }
    
    dodajSimptom(par: Simptom): void {
        this._ostaliSimptomi.push(par);
    }


}


