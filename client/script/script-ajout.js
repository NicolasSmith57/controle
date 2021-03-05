btn.addEventListener('click', (e) => {
    e.preventDefault();
    addTeam();
});

function addTeam() {
    let nom = document.querySelector('#nom');
    let siegeSocial = document.querySelector('#siegeSocial');
    let moteur = document.querySelector('#moteur');
    let chassis = document.querySelector('#chassis');
    let livree = document.querySelector('#livree');
    let sponsors = document.querySelector('#sponsors');

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