let form = document.querySelector('#clientForm');
let utilisateurs = [];

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let nom = document.querySelector('#nomComplet')?.value ;
    let CIN = document.querySelector('#cin')?.value ;
    let Etu = document.querySelector('input[name="estEtudiant"]:checked')?.value;

    let messages = document.getElementsByClassName("Err");
    Array.from(messages).forEach((element)=> element.textContent = '')


    let formEstValide = true;

    if (nom.trim() === '') {
        document.getElementById('nomErr').innerHTML = 'Le nom est requis';
        formEstValide = false
    }

    let cinregex = /^[A-Z]{2}[0-9]{6}$/;
    if (!cinregex.test(CIN)) {
        document.getElementById('cinErr').textContent = 'CIN invalide';
        formEstValide = false
    } else if (utilisateurs.some((user)=> user.CIN === CIN)){
        document.getElementById('cinErr').textContent = 'Cet CIN existe déja ';
        formEstValide = false
    }

    if(!Etu) {
        document.getElementById('etuErr').innerHTML = 'Ce champ important.';
    }

    if (!formEstValide) {
        return false;
    }

    utilisateurs.push({
        nom,
        CIN,
        Etu,
    })



    actualiserTableau();
    form.reset()

})



function actualiserTableau(){
    const tbody = document.getElementById('clientTbody')
    tbody.innerHTML = ''

    utilisateurs.forEach((utilisateur, index)=>{
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${utilisateur.nom}</td>
        <td>${utilisateur.CIN}</td>
        <td>${utilisateur.Etu}</td>
        <td>
            <button onclick="supprimerUtilisateur(${index})" class="btn-supprimer">Supprimer</button>
        </td>
        `
        tbody.appendChild(tr)
    })
    
    const clientsSelect = document.querySelector('#clientSelect');
    clientsSelect.innerHTML = '';
    utilisateurs.forEach((utilisateur, index)=>{
        const option = document.createElement('option')
        option.innerHTML = utilisateur.nom
        clientsSelect.appendChild(option)
    })
}

function supprimerUtilisateur(index){
    if (confirm('Etes-vous sur.... ?')) {
        const utilisateurSupprime = utilisateurs[index];
        utilisateurs.splice(index, 1)
        actualiserTableau()
        users.forEach((user , userindex)=>{
            if (user.Client === utilisateurSupprime.nom) {
                users.splice(userindex, 1);
                tickets();
            } 
        })
    }
}

let users = [];
let prix = 0 ;
let reserForm = document.querySelector('#reservationForm');

reserForm.addEventListener('submit', (e)=>{

    e.preventDefault();


    let villeDest = document.querySelector('#destination')?.value;
    let Class = document.querySelector('input[name="classe"]:checked')?.value;
    let span = document.querySelector('#totalPrice');
    let Etu = document.querySelector('input[name="estEtudiantTicket"]:checked')?.value;
    let total = 0 ;

    if (villeDest && Class) {
        switch (villeDest) {
            case 'marrakech':
                total += 150 ;
                break;
            case 'rabat':
                total += 40 ;
                break;
            case 'tanger':
                total += 290 ;
                break;
            case 'mohammedia':
                total += 20 ;
                break;
        }
        if (Class === '2'){
            if (Etu === 'oui') {
                total = total - (total * 30 / 100)
                span.innerHTML =`${total} DHS`;
            }
            else {
                span.innerHTML =`${total} DHS`;
            }
        }
        else if (Class === '1') {
            if (Etu === 'oui') {
                total = total * 2 ;
                total = total - (total * 30 / 100)
                span.innerHTML =`${total} DHS`;
            }
            else {
                total = total * 2 ;
                span.innerHTML =`${total} DHS`;
            }
        }
    } else {
        span.innerHTML = "<p class='total'>- Veuillez remplir correctement les champs!<p>";
        return;
    }
    prix = total

    let Client = document.querySelector('#clientSelect')?.value;
    let now = new Date()
    let annee = now.toLocaleDateString()
    let heure = now.toLocaleTimeString('fr-FR')
    let user = {
        Client,
        Etu,
        villeDest,
        Class,
        prix,
        date : annee + `  ` + heure,
    }
    users.push(user);
    
    reserForm.reset()
    tickets()
})


function tickets(){

    const tbody = document.querySelector('#ticketsTable tbody');
    tbody.innerHTML='';

    users.forEach((user)=>{
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${user.Client}</td>
        <td>${user.Etu}</td>
        <td>${user.villeDest}</td>
        <td>${user.Class}</td>
        <td>${user.prix}</td>
        <td>${user.date}</td>
        `
        tbody.appendChild(tr)
    })
}