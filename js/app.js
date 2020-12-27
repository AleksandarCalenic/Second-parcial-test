var Simptom = /** @class */ (function () {
    function Simptom(naziv) {
        this.naziv = naziv;
    }
    return Simptom;
}());
/// <reference path="Simptom.ts" />
var Pacijent = /** @class */ (function () {
    function Pacijent(id, ime, prezime, telesnaTemperatura, pcrTest) {
        this._id = id;
        this._ime = ime;
        this._prezime = prezime;
        this._telesnaTemperatura = telesnaTemperatura;
        this._pcrTest = pcrTest;
        this._ostaliSimptomi = [];
    }
    Object.defineProperty(Pacijent.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ime", {
        get: function () {
            return this._ime;
        },
        set: function (value) {
            this._ime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "prezime", {
        get: function () {
            return this._prezime;
        },
        set: function (value) {
            this._prezime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "telesnaTemperatura", {
        get: function () {
            return this._telesnaTemperatura;
        },
        set: function (value) {
            this._telesnaTemperatura = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "pcrTest", {
        get: function () {
            return this._pcrTest;
        },
        set: function (value) {
            this._pcrTest = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ostaliSimptomi", {
        get: function () {
            return this._ostaliSimptomi;
        },
        set: function (value) {
            this._ostaliSimptomi = value;
        },
        enumerable: false,
        configurable: true
    });
    Pacijent.prototype.dodajSimptom = function (par) {
        this._ostaliSimptomi.push(par);
    };
    return Pacijent;
}());
/// <reference path="Pacijent.ts" />
var Bolnica = /** @class */ (function () {
    function Bolnica(naziv, grad) {
        this._naziv = naziv;
        this._grad = grad;
        this._pacijenti = [];
    }
    Object.defineProperty(Bolnica.prototype, "naziv", {
        get: function () {
            return this._naziv;
        },
        set: function (value) {
            this._naziv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "grad", {
        get: function () {
            return this._grad;
        },
        set: function (value) {
            this._grad = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "pacijenti", {
        get: function () {
            return this._pacijenti;
        },
        set: function (value) {
            this._pacijenti = value;
        },
        enumerable: false,
        configurable: true
    });
    Bolnica.prototype.refreshHTML = function () {
        var tabela = document.getElementById('tbody');
        var out = '';
        for (var i = 0; i < this._pacijenti.length; i++) {
            out += "<tr>";
            out += "<td>" + this._pacijenti[i].id + "</td>";
            out += "<td>" + this._pacijenti[i].ime + "</td>";
            out += "<td>" + this._pacijenti[i].prezime + "</td>";
            out += "<td>" + this._pacijenti[i].telesnaTemperatura + "</td>";
            out += "<td>" + this._pacijenti[i].pcrTest + "</td>";
            out += "<td><ul>";
            for (var j = 0; j < this.pacijenti[i].ostaliSimptomi.length; j++) {
                out += "<li>" + this._pacijenti[i].ostaliSimptomi[j].naziv + "<br/></li>";
            }
            out += "</ul></td>";
            out += "</tr>";
        }
        tabela.innerHTML = out;
    };
    Bolnica.prototype.dodajPacijenta = function (value) {
        this._pacijenti.push(value);
        this.refreshHTML();
    };
    Bolnica.prototype.procentualnoObolelih = function () {
        var oboleli = this._pacijenti.filter(function (el) { return el.pcrTest == "Pozitivan"; });
        var procenatOb = (oboleli.length / this._pacijenti.length) * 100;
        return procenatOb;
    };
    return Bolnica;
}());
/// <reference path="Bolnica.ts" />
var bolnice = [];
var aktivnaBolnica = null;
function promeniAktivnu(selekt) {
    aktivnaBolnica = bolnice.filter(function (el) { return el.naziv == selekt.value; })[0];
    aktivnaBolnica.refreshHTML();
}
function wireEvents() {
    document.getElementById("dodajSimptom").addEventListener("click", function () {
        var id = Number(document.getElementById("ids").value);
        var simptom = document.getElementById("simptom").value;
        var s = new Simptom(simptom);
        aktivnaBolnica.pacijenti.filter(function (el) { return el.id == id; })[0].dodajSimptom(s);
        aktivnaBolnica.refreshHTML();
    });
    document.getElementById("dodajPacijenta").addEventListener("click", function () {
        //TODO "Procentualno obolelih"
        var ime = document.getElementById("ime");
        var prezime = document.getElementById("prezime");
        var telesnaTemperatura = document.getElementById("temperatura");
        var pcrTest = document.getElementById("test");
        var noviPacijent = new Pacijent(Number(aktivnaBolnica.pacijenti.length + 1), ime.value, prezime.value, Number(telesnaTemperatura.value), pcrTest.value);
        aktivnaBolnica.dodajPacijenta(noviPacijent);
        aktivnaBolnica.refreshHTML();
    });
    document.getElementById("procenat").addEventListener("click", function () {
        //TODO "Procentualno obolelih koji nemaju simptome"
        var text = document.getElementById("podaci");
        text.innerHTML = "<h2>Procenutalan broj obolelih u bolnici " + aktivnaBolnica.naziv + " je " + aktivnaBolnica.procentualnoObolelih().toFixed(2) + "%<h2>";
    });
    document.getElementById("bezSimptoma").addEventListener("click", function () {
        //TODO "Procentualno obolelih koji nemaju simptome"
        var text = document.getElementById("podaci");
        var nisuOboleli = [];
        var oboleli = [];
        var ukupnoPozitivni = [];
        for (var i = 0; i < bolnice.length; i++) {
            for (var j = 0; j < bolnice[i].pacijenti.length; j++) {
                if (bolnice[i].pacijenti[j].pcrTest == "Pozitivan") {
                    ukupnoPozitivni.push(bolnice[i].pacijenti[j]);
                    if (bolnice[i].pacijenti[j].ostaliSimptomi.length == 0) {
                        nisuOboleli.push(bolnice[i].pacijenti[j]);
                    }
                    else if (bolnice[i].pacijenti[j].ostaliSimptomi.length != 0) {
                        oboleli.push(bolnice[i].pacijenti[j]);
                    }
                }
            }
        }
        var procenat = (nisuOboleli.length / ukupnoPozitivni.length) * 100;
        text.innerHTML = "<h2>Procenutalan broj obolelih koji nemaju simptome je: " + procenat.toFixed(2) + "%</h2>";
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
window.onload = function () {
    initializeData();
    wireEvents();
};
function initializeData() {
    var bol = window.bol;
    var selekt = document.getElementById("bolnica");
    for (var i = 0; i < bol.length; i++) {
        var naziv = bol[i].naziv;
        var grad = bol[i].grad;
        var pacijenti = [];
        for (var j = 0; j < bol[i].pacijenti.length; j++) {
            var id = Number(bol[i].pacijenti[j].id);
            var ime = bol[i].pacijenti[j].ime;
            var prezime = bol[i].pacijenti[j].prezime;
            var temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            var pcrTest = bol[i].pacijenti[j].pcrTest;
            var simptomi = [];
            for (var k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                var s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }
            var p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        var b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        var option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}
//# sourceMappingURL=app.js.map