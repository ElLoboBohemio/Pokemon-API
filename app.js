const contenedor = document.querySelector('.contenedor');
const pokedex = document.getElementById('pokedex')

const cantidadPokemones = 151;

const colores = {
	fire: '#cf8756',
	grass: '#71b27fff',
	electric: '#d7a559',
	water: '#7199b2ff',
	ground: '#b79a65',
	rock: '#7c5621',
	fairy: '#dcb2c0',
	poison: '#a171b2ff',
	bug: '#6fa995ff',
	dragon: '#8874e0',
	psychic: '#ca81c9ff',
	flying: '#ccccccff',
	fighting: '#b27971ff',
	normal: '#cbc5be'
};

const tipoPrincipal = Object.keys(colores);

const numerarPokemones = async () => {
  for (let i = 1; i <= cantidadPokemones; i++) {
    await conseguirPokemones(i);
  }
}

const conseguirPokemones = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  crearTarjeta(pokemon);
}

function crearTarjeta(pokemon) {
  const pokemonElemento = document.createElement('div');
  pokemonElemento.classList.add('tarjeta__pokemon')

	const tipoPokemon = pokemon.types.map(res => res.type.name); //Selecciona los tipos



	const tipo = tipoPrincipal.find(tipo => tipoPokemon.indexOf(tipo) > -1); //Toma el primer tipo pokemon
	const nombre = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); //Hace mayuscula la primer letra
	const color = colores[tipo];

	pokemonElemento.style.backgroundColor = color;

	const html =
	`
		<div class="pokemon__img">
			<img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${nombre}" />
		</div>

		<div class="info__pokemon">
			<span class="info__span">#${pokemon.id.toString().padStart(3, '0')}</span>
			<h3 class="info__h3">${nombre}</h3>
			<p class="info__p">Type: <span>${tipo}</span></p>
		</div>	
	`

	pokemonElemento.innerHTML = html;

	contenedor.appendChild(pokemonElemento);

}

numerarPokemones();
