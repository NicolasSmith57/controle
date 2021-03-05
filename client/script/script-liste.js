let myListe = document.querySelector('#myListe');
let btn = document.querySelector('#btn');

function newLine(tmp) {
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

function deleteTeam(tmp) {
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

let myHeaders = new Headers();
let opt = {
    method: 'GET',
    header: myHeaders,
    mode: 'cors',
    cache: 'default'
}
fetch('/api/team', opt)
    .then((res) => {
        return res.json();
    })
    .then((response) => {
        console.log(response);
        response.forEach(elt => {
            newLine(elt);
        });
    })
    .catch((err) => {
        console.log('Error : ' + err);
});