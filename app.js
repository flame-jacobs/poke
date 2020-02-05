const pokedex = document.getElementById("pokedex")

console.log(pokedex[0]);

const fetchPoke = () => {
    const promises = [];
    for ( let i = 1; i <= 649; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then( results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type:  data.types.map( type =>
            type.type.name).join(", ")
        }))    
        disPokemon(pokemon);
    });

};

const disPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonString = pokemon.map(pokeman => `
    <li class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
    </li>
    `
    ).join('');
    pokedex.innerHTML = pokemonString;
}

fetchPoke();

window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
});