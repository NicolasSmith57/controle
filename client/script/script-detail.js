let nom = document.querySelector('#nom');
let siegeSocial = document.querySelector('#siegeSocial');
let moteur = document.querySelector('#moteur');
let chassis = document.querySelector('#chassis');
let livree = document.querySelector('#livree');
let sponsors = document.querySelector('#sponsors');
let btn = document.querySelector('#btn');

let url = window.location;
let teamId = url.hash.substring(1);

if(teamId != '') {
  modifTeam();
} else {
  console.log('prout');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    addTeam();
  });
}

function modifTeam() {
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
      })
      .catch((res) => {
        console.log(res);
      })
  });
}

function addTeam() {
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
      window.location.href = '/pages/liste.html';
      return res.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((res) => {
      console.log(res);
    });
}