const express = require("express")

const router = express.Router();

const controllerpoke = require("../controllers/pokemonController");


router.get("/filtrado", controllerpoke.GetPokeRegion);
router.get("/busqueda", controllerpoke.GetPokeSearch);
router.get("/", controllerpoke.GetPokehome);
router.get("/mantenimiento_poke", controllerpoke.GetPokemonList);
router.get("/agregar_pokemon", controllerpoke.GetAddPokemon);
router.post("/crear_pokemon", controllerpoke.PostAddPokemon);
router.get("/edit-pokemon/:pokeID", controllerpoke.GetEditPokemon);
router.post("/edit-pokemon", controllerpoke.PostEditPokemon);
router.post("/delete-poke", controllerpoke.PostDeletePoke);


module.exports = router;