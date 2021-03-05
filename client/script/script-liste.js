import {newLine} from './script.module.js'


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