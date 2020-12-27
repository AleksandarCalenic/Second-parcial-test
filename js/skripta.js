var boje = {
	klinika: "Crimson",
	institut: "Teal"
};

let validacija = [{naziv: "KCV", grad: "NS"}, 
				{naziv: "KCS", grad: "BG"}, 
				{naziv: "KCN", grad: "NI"}];


function proveraForme(form){

	let retVal = true;
	let naziv = form.naziv.value.trim();
	let grad = form.grad.value.trim();

	if (naziv == "" || naziv[0].toUpperCase() != naziv[0]){
		retVal = false;  
	}
	if (grad == "" || grad[0].toUpperCase() != grad[0]){
		retVal = false;
	}

	let provera = false;
	for (let i in validacija){
	 	if (naziv == validacija[i].naziv && grad == validacija[i].grad){
			provera = true;
	 	}
	}

	if (!provera){
	 	retVal = false;
	}
		
	return retVal;
}


function checkBoxChange(par){

	let sel1 = document.getElementById("sel1");

	if (par.checked) {
		sel1.disabled = false;
	} else {
		sel1.disabled = true;
		hide();
	}
}

function select1(par){
	
	let sel2 = document.getElementById("sel2");
	sel2.value = "klinika";

	if(par.value == 3){
		sel2.style.visibility = "visible";
		sel2.disabled = false;
	} else {
		hide();
	}
}

function select2(par){

	let text = document.getElementById("poruka");
	let paragraf = document.getElementById("select_paragraf");
	let submit = document.getElementById("submitbtn");

	if(par.value == "klinika"){
		text.innerHTML = par.value;
		paragraf.style.backgroundColor = boje.klinika;
		submit.style.backgroundColor = boje.klinika;

	} else if (par.value == "institut"){
		text.innerHTML = par.value;
		paragraf.style.backgroundColor = boje.institut;
		submit.style.backgroundColor = boje.institut;
	}
}


function hide(){
	let sel2 = document.getElementById("sel2");
	let paragraf = document.getElementById("select_paragraf");
	let submit = document.getElementById("submitbtn");
	let text = document.getElementById("poruka");

	sel2.style.visibility = "hidden";
	sel2.disabled = true;
	text.innerHTML = '';
	paragraf.style.backgroundColor = '';
	submit.style.backgroundColor = '';
}
			














