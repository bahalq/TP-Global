let a = document.querySelectorAll('a');
let title = document.querySelector('title');
a.forEach(a => {
    a.onclick = () => {
        if (a.id == 'showClients') {
            if (document.querySelector('#clients').className !== 'section active') {
                document.querySelector('.active').classList.remove('active');
                document.querySelector('#clients').classList.add('active');
                title.innerHTML = 'Gestion des Clients';
            }
        }
        if (a.id == 'showReservation') {
            if (document.querySelector('#reservation').className !== 'section active') {
                document.querySelector('.active').classList.remove('active');
                document.querySelector('#reservation').classList.add('active');
                title.innerHTML = 'Réserver un ticket';
            }
        }
        if (a.id == 'showTickets') {
            if (document.querySelector('#tickets').className !== 'section active') {
                document.querySelector('.active').classList.remove('active');
                document.querySelector('#tickets').classList.add('active');
                title.innerHTML = 'Tickets réservés';
            }
        }
}});