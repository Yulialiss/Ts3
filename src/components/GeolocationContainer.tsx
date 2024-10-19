// axios бібліотека для запитів для взаємодії з сервером отримати щось з сервера.
// useEffect і useState — це хуки React, які дозволяють використовувати стан та побічні ефекти в функціональних компонентах.
// latitude та longitude — координати миші, які будуть оновлюватися при переміщенні курсора.
// useEffect — це хук React, який дозволяє виконувати побічні ефекти у функціональних компонентах
import { useEffect, useState } from 'react';
import axios from 'axios'; 
import Geolocation from './Geolocation';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import './GeolocationContainer.css'; 


interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

const GeolocationContainer = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [sum, setSum] = useState<number | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const handleMouseMove = (
    { clientX, clientY }: { clientX: number; clientY: number }
  ) => {
    setLatitude(clientX);
    setLongitude(clientY);
  };
// 
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const pokemonsData = await Promise.all(
          response.data.results.map(async (p: any) => {
            const pokemonDetails = await axios.get(p.url);
            return pokemonDetails.data;
            // крч дата тіпа має у собі всю інфу
          })
        );
        setPokemons(pokemonsData);
      } catch (error) {
        console.error("Помилка:", error);
      }
    };

    fetchPokemons(); 
 }, []);
//

  useEffect(() => {
    setSum(latitude && longitude ? latitude + longitude : null);
  }, [latitude, longitude]);

  return (
    <div onMouseMove={handleMouseMove}>
      <Geolocation latitude={latitude} longitude={longitude} sum={sum} />
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} className="pokemon-item">
              <img src={pokemon.sprites.front_default} width={100} height={100}/>
              {pokemon.name} <AddReactionIcon fontSize="small" />

          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeolocationContainer;
