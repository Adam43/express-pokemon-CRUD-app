import express from "express";
import { nanoid } from "nanoid";

export default function setUpPokemonRoutes(db) {
  const router = express.Router();
  //Default
  router.get("/", (request, response) => {
    console.log("success");

    response.status(200).json({
      success: true,
      pokemons: db.data.pokemons,
    });
  });


  //Get | One specific item
  router.get("/:id", (request, response) => {
    const pokemonId = request.params.id;
    const currentPokemon = db.data.pokemons.find(
      (element) => element.id === pokemonId
    );

    response.status(200).json({
      success: true,
      pokemons: currentPokemon,
    });
  });


  //Create
  router.post("/", (request, response) => {
    db.data.pokemons.push({
      id: nanoid(4),
      name: request.body.name,
    });

    db.write();

    response.status(201).json({
      success: true,
    });
  });

  //Put | Update pokemon
  router.put("/:id", (request, response) => {
    const pokemon = request.params.id;

    const pokemonIndex = db.data.pokemons.findIndex(
      (element) => element.id === pokemon
    );

    db.data.pokemons(pokemonIndex).name = request.body.name;

    db.write();

    response.status(200).json({
      success: true,
    });
  });


  //Delete
  router.delete("/:id", (request, response) => {
    const pokemon = request.params.id;
    const pokemonIndex = db.data.pokemons.findIndex(
      (element) => element.id === pokemon
    );

    db.data.pokemons.splice(pokemonIndex, 1);

    db.write();
    response.status(200).json({
      success: true,
      name: db.data.pokemons,
    });
  });

  return router;
}

