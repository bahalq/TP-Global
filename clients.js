let form = document.querySelector('#clientForm');
let utilisateurs = [];

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let nom = document.querySelector('#nomComplet')?.value ;
    let CIN = document.querySelector('#cin')?.value ;
    let Etu = document.querySelector('input[name="estEtudiant"]:checked')?.value;

    let messages = document.getElementsByClassName("Err");
    Array.from(messages).forEach((element)=> element.textContent = '');



    if (nom.trim() === '') {
        document.getElementById('nomErr').innerHTML = 'Le nom est requis';
        return;
    } ;

    let cinregex = /^[A-Z]{2}[0-9]{6}$/;
    if (!cinregex.test(CIN)) {
        document.getElementById('cinErr').textContent = 'CIN invalide';
        return ;
    } else if (utilisateurs.some((user)=> user.CIN === CIN)){
        document.getElementById('cinErr').textContent = 'Ce CIN existe déja ';
        return;
    };

    if(!Etu) {
        document.getElementById('etuErr').innerHTML = "Vous devez choisir 'oui' ou 'non'";
        return;
    };



    utilisateurs.push({
        nom,
        CIN,
        Etu,
        nomCIN: '',
    });



    actualiserTableau();
    form.reset();

});



function actualiserTableau(){
    const tbody = document.getElementById('clientTbody');
    tbody.innerHTML = '' ;

    utilisateurs.forEach((utilisateur, index)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${utilisateur.nom}</td>
        <td>${utilisateur.CIN}</td>
        <td>${utilisateur.Etu}</td>
        <td>
            <button onclick="supprimerUtilisateur(${index})" class="btn-supprimer">Supprimer</button>
        </td>
        `
        tbody.appendChild(tr);
    })
    
    const clientsSelect = document.querySelector('#clientSelect');
    clientsSelect.innerHTML = '';
    utilisateurs.forEach((utilisateur)=>{
        const option = document.createElement('option');
        option.innerHTML = `${utilisateur.nom} (${utilisateur.CIN})`;
        nomCIN = `${utilisateur.nom} (${utilisateur.CIN})`;
        utilisateur.nomCIN = nomCIN;
        clientsSelect.appendChild(option);
    })
}


function supprimerUtilisateur(index){
    if (confirm('Etes-vous sur.... ?')) {
        const utilisateurSupprime = utilisateurs[index];
        utilisateurs.splice(index, 1);
        actualiserTableau(); 
        users.forEach((user , userindex)=>{
            if (user.Client === utilisateurSupprime.nomCIN) {
                users.splice(userindex, 1);
                tickets();
            } 
        })
    }
}

let users = [];
let prix = 0 ;
let reserForm = document.querySelector('#reservationForm');

function calcul(){

    let Client = document.querySelector('#clientSelect')?.value;
    let villeDest = document.querySelector('#destination')?.value;
    let Class = document.querySelector('input[name="classe"]:checked')?.value;
    let span = document.querySelector('#totalPrice');
    let Etu = utilisateurs.find((user)=> user.nomCIN === Client)?.Etu ;
    let etuSpan = document.getElementById('Etu');
    let total = 0 ;

    
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
    };
    if (Class === '1') {total *= 2 };
    if (Etu === 'oui') {  
            total *= 0.7;
            etuSpan.innerHTML = `✔ Oui`;
    }
    else if (Etu === 'non') {
            etuSpan.innerHTML = `✘ Non`;
    };
    span.innerHTML =`${total} DHS`;
    prix = total ;
}
reserForm.addEventListener('change', ()=>{calcul();});
document.querySelector('#clientSelect, #destination').addEventListener('change',()=>{
    calcul();});
document.querySelector('#showReservation').addEventListener('click',()=>{
    calcul();});

reserForm.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    
    let Client = document.querySelector('#clientSelect')?.value;
    let villeDest = document.querySelector('#destination')?.value;
    let Class = document.querySelector('input[name="classe"]:checked')?.value;
    let span = document.querySelector('#totalPrice');
    // let Etu = document.querySelector('input[name="estEtudiantTicket"]:checked')?.value;
    let Etu = utilisateurs.find((user)=> user.nomCIN === Client).Etu

    if (users.some((user)=> user.Client === Client)) {
        span.innerHTML = "<p class='total'>Ce client a déjà réservé une ticket.<p>";
        return;
    };
    if (!villeDest || !Class || !Etu || !Client){
        span.innerHTML = "<p class='total'>- Veuillez remplir correctement les champs!<p>";
        return;
    };
    
    let now = new Date();
    let annee = now.toLocaleDateString();
    let heure = now.toLocaleTimeString('fr-FR');
    let user = {
        Client,
        Etu,
        villeDest,
        Class,
        prix,
        date : annee + ` - ` + heure,
    };
    users.push(user);
    reserForm.reset();
    tickets();
});


function tickets(){
    const tbody = document.querySelector('#ticketsTable tbody');
    tbody.innerHTML='';

    users.forEach((user)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${user.Client}</td>
        <td>${user.Etu}</td>
        <td>${user.villeDest}</td>
        <td>${user.Class}</td>
        <td>${user.prix}</td>
        <td>${user.date}</td>
        `
        tbody.appendChild(tr);
    });
    document.getElementById('Etu').innerHTML = '';
    document.querySelector('#totalPrice').innerHTML = '0 DHS';
};