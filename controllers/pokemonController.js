const pokemon = require("../models/pokemones");
const regiones = require("../models/regiones");
const tipos = require("../models/tipos");

exports.GetPokehome = (req, res, next) => {
  regiones.findAll().then((result) => {

    pokemon.findAll({include: [{ model: regiones}, {model: tipos}]}).then((result2) => {
      const pokemon = result2.map((result2) => result2.dataValues);
      const region =  result.map((result) => result.dataValues);
      res.render("../views/pokemones/pokehome.hbs", {
        pagetitle: "Mantenimiento Pokemon",
        pokeActive: true,
        pokemones: pokemon,
        haspokes: pokemon.length > 0,
        region: region,
      });
    });

   })
  
};


exports.GetPokeRegion = (req, res, next) => {
  const regi = req.query.region;
  regiones.findAll().then((result) => {

    pokemon.findAll({include: [{ model: regiones}, {model: tipos}], where: { regionId: regi }}).then((result2) => {
      const pokemon = result2.map((result2) => result2.dataValues);
      const region =  result.map((result) => result.dataValues);
      res.render("../views/pokemones/pokehome.hbs", {
        pagetitle: "Mantenimiento Pokemon",
        pokeActive: true,
        pokemones: pokemon,
        haspokes: pokemon.length > 0,
        region: region,
      });
    });

   })
  
};

exports.GetPokeSearch = (req, res, next) => {

 const busqueda = req.query.search;
 regiones.findAll().then((result1) => {
  pokemon.findAll({include: [{ model: regiones}, {model: tipos}], where: { name: busqueda }}).then((result) => {
    const pokemon =  result.map((result) => result.dataValues);
    const region = result1.map((result1) => result1.dataValues);
    console.log(pokemon)

    res.render("../views/pokemones/pokehome.hbs", {
      pagetitle: "Mantenimiento Pokemon",
      pokeActive: true,
      pokemones: pokemon,
      haspokes: pokemon.length > 0,
      region: region,
    });
  });
})
 
};

exports.GetPokemonList = (req, res, next) => {
    pokemon.findAll({include: [{ model: regiones}, {model: tipos}]}).then((result) => {

      const pokemon = result.map((result) => result.dataValues);

      console.log("nombre",pokemon);

      res.render("pokemones/mantenimientoPokemon-list", {
        pagetitle: "Mantenimiento Pokemon",
        pokeActive: true,
        pokemones: pokemon,
        haspokes: pokemon.length > 0,
      });
   
    });

};

exports.GetAddPokemon = (req, res, next) => {
  regiones
    .findAll()
    .then((result1) => {
      tipos
        .findAll()
        .then((result2) => {
          const region = result1.map((result1) => result1.dataValues);
          const tipos = result2.map((result2) => result2.dataValues);

          //console.log(tipos)
          res.render("pokemones/pokemones-agregar", {
            pagetitle: "Agregar Pokemones",
            editmode: false,
            region: region,
            tipo: tipos,
            hasregion: region.length > 0,
            hastipo: tipos.length > 0,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostAddPokemon = (req, res, next) => {
  const name = req.body.nombrepoke;
  const foto = req.body.fotopoke;
  const description = req.body.descripcion;
  const region = req.body.regions;
  const tipos = req.body.tipos;

  pokemon
    .create({
      name: name,
      URL: foto,
      description: description,
      regionId: region,
      tipoId: tipos,
    })
    .then((result) => {
      return res.redirect("/mantenimiento_poke");
    })
    .catch((err) => {
      console.log("problema", err);
    });
};

exports.GetEditPokemon = (req, res, next) => {
  const edit = req.query.edit;
  const idpokemo = req.params.pokeID;

  if (!edit) {
    return res.redirect("/mantenimiento_poke");
  }

  pokemon
    .findOne({ where: { id: idpokemo } })
    .then((result) => {
      const pokemons = result.dataValues;

      if (!pokemons) {
        return res.redirect("/");
      }

      regiones
        .findAll()
        .then((result1) => {
          tipos
            .findAll()
            .then((result2) => {
              const region = result1.map((result1) => result1.dataValues);
              const tipos = result2.map((result2) => result2.dataValues);

              res.render("pokemones/pokemones-agregar", {
                pagetitle: "Agregar Pokemones",
                editmode: edit,
                region: region,
                pokemon: pokemons,
                tipo: tipos,
                hasregion: region.length > 0,
                hastipo: tipos.length > 0,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditPokemon = (req, res, next) => {
  const name = req.body.nombrepoke;
  const foto = req.body.fotopoke;
  const description = req.body.descripcion;
  const idpokemon = req.body.pokeID;
  const region = req.body.regions;
  const tipos = req.body.tipos;

  console.log("post edit tipos", tipos);
  pokemon
    .update(
      { name: name, description: description, URL: foto, regionId: region, tipoId: tipos },
      { where: { id: idpokemon } }
    )

    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeletePoke = (req, res, next) => {
  const id = req.body.pokeDeleteID;

  pokemon
    .destroy({ where: { id: id } })
    .then((result) => {
      return res.redirect("/mantenimiento_poke");
    })
    .catch((err) => {
      console.log(err);
    });
};
