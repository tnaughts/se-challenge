import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Picker
} from "react-native-web";
import idx from "idx";
import _ from "lodash";

import { style } from "./style";
import { PokemonListCell } from "./PokemonListCell";
import {contentfulClient} from "../../Contentful"
import DotLoader from "react-spinners/DotLoader";

export const PokemonList = function PokemonList(props) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(
    function setPokemonFromApi() {
      const fetchPokemon = async () => {
      const resp = await contentfulClient.getEntries() /* Question 3a)How do I filter my entries? Right now
                                                          We receive all content types
                                                          We render an error if it is not a Pokemon
                                                          but we need a better solution where we just
                                                          retrieve entries of the Pokemon content type.

                                                          Question 3b)Can we also sort these Pokemon? I made Mr Mime recently
                                                          But now he shows up first. I want them ordered by name.

                                                          Question 4) We have this entry here why is it not https://app.contentful.com/spaces/7r1n0yv048te/entries/5QKBtXRSmdtkarRDYnTqZD showing on this site?                                                                                                              
                                                      */
      setPokemon(resp.items)
      setloading(false)
    }
    fetchPokemon()
    },
    []
  );
  

  if (!pokemon && loading) {
    return <div>Loading</div>;
  }

  if (!pokemon || error) {
    return (
      <div>
        Unable to fetch course information, please try again or contact support
      </div>
    );
  }
  function renderItem({ item: pokemon }) {
    if (pokemon.sys.contentType.sys.id === "pokemon") {return <PokemonListCell pokemon={pokemon} />};
    return <div style={style.wrongTile}>This is not a Pokemon it is a {pokemon.sys.contentType.sys.id} content type </div>
  }

  function sortBy(attr) {
    if (pokemon && pokemon.length > 1) {
      const sortedPokemon = _.orderBy(pokemon, attr);
      setPokemon(sortedPokemon);
    }
  }

  return (
    <View style={style.container}>
      <h1>Pokemon</h1>
      <View style={style.picker}>
        <Picker
          style={{ flex: 1 }}
          multiple={false}
          onValueChange={(itemValue, itemIndex) => {
            sortBy(itemValue);
          }}
        >
          <Picker.Item label='Sort' value='0' />
          <Picker.Item label="Height" value="fields.height" />
          <Picker.Item label="Alphabetically" value="fields.name" />
        </Picker>
      </View>
      {loading ? (
        <View style={style.loader}>
          <DotLoader
          color={"#00BFFF"}
          size={100}/> 
        </View>
      ) : (
        <FlatList
          data={pokemon}
          renderItem={renderItem}
          initialNumToRender={20}
          numColumns={2}
          keyExtractor={(item, index) => `${item.id} + ${index}`}
          horizontal={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </View>
  );
};