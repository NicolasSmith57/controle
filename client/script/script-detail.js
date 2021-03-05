import {modifTeam, addTeam, Ecurie} from './script.module.js'

let btn = document.querySelector('#btn');

let url = window.location;
const ecurie = new Ecurie();
ecurie.id = url.hash.substring(1);

let inputNom = document.querySelector('#nom');
let inputSiegeSocial = document.querySelector('#siegeSocial');
let inputMoteur = document.querySelector('#moteur');
let inputChassis = document.querySelector('#chassis');
let inputLivree = document.querySelector('#livree');
let inputSponsors = document.querySelector('#sponsors');


if(ecurie.id != '') {
  modifTeam(ecurie.id);
} else {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!inputNom.checkValidity() || !inputSiegeSocial.checkValidity() || !inputMoteur.checkValidity() ||
    !inputChassis.checkValidity() || !inputLivree.checkValidity() || !inputSponsors.checkValidity()) {
      alert('Champ manquant');
    } else {
      addTeam();
    }
  });
}