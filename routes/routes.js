import express from "express";
import { nanoid } from "nanoid";

export default function setUpPokemonRoutes(db){
    const router = express.Router();
//Default
    router.get("/", (request, response) => {
        console.log("success");
        
        response.status(200).json({
            success: true,
            pokemons: db.data.pokemons
        })
    });
//Get | One specific item
    router.get("/", (request, response) => {
        const pokemon = request.params.id
        const currentPokemon = db.data.pokemon.find((element) => element.id === pokemon);

        response.status(200).json({
            success: true,
            id: currentPokemon
        })
    });
//Create
    router.post("/", (request, response) => {
       

        db.data.pokemons.push({
            id: nanoid(4),
            name: request.body.todo,
        })

        response.status(201).json({
            success: true,
        })
    });

//Update    
    router.put("/:id", (request, response) => {
        console.log("success");
    });
//Delete
    router.get("/:id", (request, response) => {
        console.log("success");

        db.data.pokemon.splice(pokemon)
    });

    return router 
}       