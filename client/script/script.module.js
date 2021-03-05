export class Ecurie {
  
    /*constructor(id, nom, siegeSocial, moteur, chassis, livree, sponsors) {
        this._id = id;
        this._nom = nom;
        this._siegeSocial = siegeSocial;
        this._moteur = moteur;
        this._chassis = chassis;
        this._livree = livree;
        this._sponsors = sponsors;
    }*/

    constructor() {

    }
  
    get id() {
      return this._id;
    }

    get nom() {
      return this._nom;
    }
  
    get siegeSocial() {
      return this._siegeSocial;
    }
  
    get moteur() {
      return this._moteur;
    }
  
    get chassis() {
      return this._chassis;
    }
  
    get livree() {
      return this._livree;
    }
  
    get sponsors() {
      return this._sponsors;
    }
  
    set id(id) {
        this._id = id;
    }

    set nom(nom) {
        this._nom = nom;
    }

    set siegeSocial(siegeSocial) {
        this._siegeSocial = siegeSocial;
    }

    set moteur(moteur) {
        this._moteur = moteur;
    }

    set chassis(chassis) {
        this._chassis = chassis;
    }

    set livree(livree) {
        this._livree = livree;
    }

    set sponsors(sponsors) {
        this._sponsors = sponsors;
    }
}

export function modifTeam(teamId) {
    let nom = document.querySelector('#nom');
    let siegeSocial = document.querySelector('#siegeSocial');
    let moteur = document.querySelector('#moteur');
    let chassis = document.querySelector('#chassis');
    let livree = document.querySelector('#livree');
    let sponsors = document.querySelector('#sponsors');

    let myHeaders = new Headers();
    let opt = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };
  
    fetch(`/api/team/${teamId}`, opt)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        nom.value = response.nom;
        siegeSocial.value = response.siegeSocial;
        moteur.value = response.moteur;
        chassis.value = response.chassis;
        livree.value = response.livree;
        sponsors.value = response.sponsors;
      })
      .catch((err) => {
        console.log('Error : ' + err);
      });
  
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if(!nom.checkValidity() || !siegeSocial.checkValidity() || !moteur.checkValidity() ||
          !chassis.checkValidity() || !livree.checkValidity() || !sponsors.checkValidity()) {
        alert('Champ manquant');
      } else {
        let tmp = {
          nom: nom.value,
          siegeSocial: siegeSocial.value,
          moteur: moteur.value,
          chassis: chassis.value,
          livree: livree.value,
          sponsors: sponsors.value
        };    
    
        let opt = {
          method: 'PUT',
          body: JSON.stringify(tmp),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
    
        fetch(`/api/team/${teamId}`, opt)
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            window.location.href = '/pages/liste.html';
            alert('Écurie modifiée');
          })
          .catch((res) => {
            console.log(res);
          })
      }
    });
  
}

export function addTeam() {
    let tmp = {
      nom : nom.value,
      siegeSocial : siegeSocial.value,
      moteur : moteur.value,
      chassis : chassis.value,
      livree : livree.value,
      sponsors : sponsors.value,
    };
  
    let opt = {
      method: 'POST',
      body: JSON.stringify(tmp),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
    fetch('/api/team', opt)
      .then((res) => {
        nom.value = '';
        siegeSocial.value = '';
        moteur.value = '';
        chassis.value = '';
        livree.value = '';
        sponsors.value = '';
        return res.json();
      })
      .then((response) => {
        alert('Écurie ajoutée');
        window.location.href = '/pages/liste.html';
        console.log(response);
      })
      .catch((res) => {
        console.log(res);
      });
}

export function newLine(tmp) {
    let myListe = document.querySelector('#myListe');
    let btn = document.querySelector('#btn');

    let line = document.createElement('tr');
    line.innerHTML = `
     <td>${tmp._id}</td>
     <td>${tmp.nom}</td>
     <td>${tmp.siegeSocial}</td>
     <td>${tmp.moteur}</td>
     <td>${tmp.chassis}</td>
     <td>${tmp.livree}</td>
     <td>${tmp.sponsors}</td>
     <td><a href="detail.html#${tmp._id}" class="btn btn-outline-primary" role="button" aria-pressed="true">Détails</a></td>
     <td><button class="btn btn-outline-danger" id="del${tmp._id}">Supprimer</button></td>
    `;
    myListe.appendChild(line);
 
    let btnSuppr = document.querySelector("#del" + tmp._id);
    btnSuppr.addEventListener('click', () => {
        if(confirm('Voulez vous supprimer l\'écurie \'' + tmp.nom + '\' ?')) {
            deleteTeam(tmp._id);
        }
    });
 }

export function deleteTeam(tmp) {
    let myHeaders = new Headers();
    let opt = {
        method: 'DELETE',
        header: myHeaders,
        mode: 'cors',
        cache: 'default'
    }
    fetch('/api/team/' + tmp, opt)
    .then(() => {
        window.location.href = '/pages/liste.html';
    })
    .catch((err) => {
        console.log('Error : ' + err);
    });
}