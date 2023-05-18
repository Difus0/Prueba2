const cardsPadre = document.querySelector('.container-cards');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const refreshButton = document.getElementById('refreshButton');
const noResultsMessage = document.getElementById('noResultsMessage');
const cantPersonaje = 100;

const recPersonaje = async () => {
    for (let i = 1; i <= cantPersonaje; i++) {
        await getPersonaje(i);
    }
}

const getPersonaje = async (id) => {
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    const respuesta = await fetch(url);
    const personaje = await respuesta.json();
    crearPersonajes(personaje);
}

function crearPersonajes(person) {
    const cardRick = document.createElement('div');
    cardRick.classList.add('personajes');
    const name = person.name;
    const imgPersonaje = person.image;
    const [status, specie, origin] = [person.status, person.species, person.origin.name];
    const personInnerData = `
        <div class="cont-card">
            <img src="${imgPersonaje}">
            <div class="info">
            <h2>${name}</h2>
            <p>status: ${status}</p>
            <p>specie: ${specie}</p>
            <p>origen: ${origin}</p>
            </div>
        </div>        
    `;
    cardRick.innerHTML = personInnerData;
    cardsPadre.appendChild(cardRick);
}

const buscarPersonaje = async () => {
    const nombre = searchInput.value.trim();
    if (nombre === '') {
        return;
    }

    const url = `https://rickandmortyapi.com/api/character/?name=${nombre}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    cardsPadre.innerHTML = '';
    noResultsMessage.style.display = 'none';

    if (data.error) {
        noResultsMessage.innerText = 'El nombre del personaje no es válido';
        noResultsMessage.style.display = 'block';
    } else if (data.results.length === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        data.results.forEach((personaje) => {
            crearPersonajes(personaje);
        });
    }
}

searchButton.addEventListener('click', buscarPersonaje);
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        buscarPersonaje();
    }
});

refreshButton.addEventListener('click', () => {
    location.reload();
});

recPersonaje();