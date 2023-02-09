import createPokemon from "./createPokemon.js"

const server = await createPokemon();

server.listen(8080, () => {
    console.log("running on port http:localhost:8080")
});