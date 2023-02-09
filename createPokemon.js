import express from "express"; //Import Express
import { Low } from "lowdb"; //Import the LowDB module. Uses a JSON file to create our "database"
import { JSONFile } from "lowdb/node";
import setUpPokemonRoutes from "./routes/routes.js";

//line 27 await db.write()
export default async function createPokemon(){
    const adapter = new JSONFile("db.json");
    const db = new Low(adapter);

    await db.read();

    db.data = db.data || { pokemons: [] };

    await db.write();

    const app = express();

    app.use(express.json());
    app.use("/pokemon", setUpPokemonRoutes(db))

    return app;
}