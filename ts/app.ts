/// <reference path="Bolnica.ts" />

let bolnice: Bolnica[] = [];
let aktivnaBolnica: Bolnica = null;

function promeniAktivnu(selekt: HTMLSelectElement): void {
    aktivnaBolnica = bolnice.filter(el => el.naziv == selekt.value)[0];
    aktivnaBolnica.refreshHTML();
}

function wireEvents(): void {

    document.getElementById("dodajSimptom").addEventListener("click", () => {
        let id = Number((document.getElementById("ids") as HTMLInputElement).value);
        let simptom = (document.getElementById("simptom") as HTMLSelectElement).value;
        let s = new Simptom(simptom);
        aktivnaBolnica.pacijenti.filter(el => el.id == id)[0].dodajSimptom(s);
        aktivnaBolnica.refreshHTML();
    });

    document.getElementById("dodajPacijenta").addEventListener("click", () => {
    //TODO "Procentualno obolelih"
    let ime = document.getElementById("ime") as HTMLInputElement;
    let prezime = document.getElementById("prezime") as HTMLInputElement;
    let telesnaTemperatura = document.getElementById("temperatura") as HTMLInputElement;
    let pcrTest = document.getElementById("test") as HTMLInputElement;

    let noviPacijent: Pacijent = new Pacijent(Number(aktivnaBolnica.pacijenti.length + 1), ime.value, prezime.value, Number(telesnaTemperatura.value), pcrTest.value);

    aktivnaBolnica.dodajPacijenta(noviPacijent);
    aktivnaBolnica.refreshHTML();
    });

    document.getElementById("procenat").addEventListener("click", () => {
    //TODO "Procentualno obolelih koji nemaju simptome"
    let text: HTMLElement = document.getElementById("podaci");
    text.innerHTML = `<h2>Procenutalan broj obolelih u bolnici ${aktivnaBolnica.naziv} je ${aktivnaBolnica.procentualnoObolelih().toFixed(2)}%<h2>`;
    });

    document.getElementById("bezSimptoma").addEventListener("click", () => {
    //TODO "Procentualno obolelih koji nemaju simptome"
        let text: HTMLDivElement = document.getElementById("podaci") as HTMLDivElement;
        let nisuOboleli: Pacijent[] = [];
        let oboleli: Pacijent[] = [];
        let ukupnoPozitivni: Pacijent[] = [];

        for (let i = 0; i < bolnice.length; i++){
            for (let j = 0; j < bolnice[i].pacijenti.length; j++){
                if (bolnice[i].pacijenti[j].pcrTest == "Pozitivan"){
                    ukupnoPozitivni.push(bolnice[i].pacijenti[j]);
                    if(bolnice[i].pacijenti[j].ostaliSimptomi.length == 0){
                        nisuOboleli.push(bolnice[i].pacijenti[j]);
                    } else if (bolnice[i].pacijenti[j].ostaliSimptomi.length != 0){
                        oboleli.push(bolnice[i].pacijenti[j]);
                    }
                }
            }
        }

        let procenat: number = (nisuOboleli.length / ukupnoPozitivni.length) * 100;
        text.innerHTML = `<h2>Procenutalan broj obolelih koji nemaju simptome je: ${procenat.toFixed(2)}%</h2>`;

        //Drugi nacin preko filtera
        // //Svi sa pozitivnim testom po bolnicama
        // let uk = [];
        // let ukNum: number = 0;
        // for(let i = 0; i < bolnice.length; i++){
        //   let p: Pacijent[] = bolnice[i].pacijenti.filter(x => x.pcrTest == "Pozitivan");
        //   uk.push(p);
        //   ukNum += p.length;
        // }
        // //Svi sa pozitivnim testom po bolnicama i nemaju simptome
        // let no = [];
        // let noNum: number = 0;
        // for(let i = 0; i < uk.length; i++){
        //     let o: Pacijent[] = uk[i].filter(x => x.ostaliSimptomi == 0);
        //     no.push(o);
        //     noNum += o.length;
        // };
        // //Svi sa pozitivnim testom po bolnicama i imaju simptome
        // let ob = [];
        // let obNum: number = 0;
        // for(let i = 0; i < uk.length; i++){
        //     let o: Pacijent[] = uk[i].filter(x => x.ostaliSimptomi != 0);
        //     ob.push(o);
        //     obNum += o.length;
        // };
        // //Krajnja racunica
        // let p: number = ((noNum / ukNum) * 100);
        });
}


window.onload = () => {
    initializeData();
    wireEvents();
}

function initializeData() {
    let bol = (window as any).bol;
    let selekt = document.getElementById("bolnica") as HTMLSelectElement;
    for (let i = 0; i < bol.length; i++) {
        let naziv = bol[i].naziv;
        let grad = bol[i].grad;
        let pacijenti: Pacijent[] = [];
        for (let j = 0; j < bol[i].pacijenti.length; j++) {
            let id = Number(bol[i].pacijenti[j].id);
            let ime = bol[i].pacijenti[j].ime;
            let prezime = bol[i].pacijenti[j].prezime;
            let temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            let pcrTest = bol[i].pacijenti[j].pcrTest;
            let simptomi: Simptom[] = [];

            for (let k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                let s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }

            let p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        let b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        let option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}