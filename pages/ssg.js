import axios from 'axios';
import { useState, useEffect } from 'react';

const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
const headers = {
    "Cache-Control": "no-cache",
};

//const ClientSide = () => {
const StaticSide = (props) => {
    console.log(props);

    /*
     *  No longer need useState or useEffect because we can access our pokemon from props in getStaticProps
     **
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await axios.get(url);
//            console.log(response);
            
            // Can also use a map. Anytime you create an empty array you can probably refactor into a map
            // map refactor example
            //            const promises = response.data.results.map((result) => {
            //                return axios.get(result.url);
            //            });
            const promises = [];
            response.data.results.forEach((result) => {
                promises.push(axios.get(result.url));
//                console.log(result.url);
            });


            const responses = await Promise.all(promises);
//            console.log(responses);

            const pokeData = responses.map((r) => {
                return {
                    name: r.data.name,
                    imgUrl: r.data.sprites.front_default
                };
            });

//            console.log(pokeData);
            // Set pokemon variable at beginning of script to the pokeData map object 
            setPokemon(pokeData);

        };

        fetchPokemon();
        console.log(pokemon);

    }, []);
    */

//    return <p>client side</p>;
    return props.pokemon.map(poke => {
        return (
            <div key={poke.name}>
                <img src={poke.imgUrl} />
                <p>{poke.name}</p>
                <hr />
            </div>
        );
    });
};

export const getStaticProps = async () => {
    const response = await axios.get(url);
    const promises = [];
    response.data.results.forEach((result) => {
        promises.push(axios.get(result.url));
    });
    
    
    const responses = await Promise.all(promises);
    
    const pokeData = responses.map((r) => {
        return {
            name: r.data.name,
            imgUrl: r.data.sprites.front_default
        };
    });
    
    return {
        props: {
            pokemon: pokeData,
        },
    };
};

//export default ClientSide;
export default StaticSide;