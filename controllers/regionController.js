const region = require("../models/regiones");

exports.GetRegionList = (req, res, next) => {
  region.findAll().then((result) => {
    const pokeregion = result.map((result) => result.dataValues);

    console.log(pokeregion);

    res.render("regiones/MantenimientoRegion", {
      pagetitle: "Mantenimiento Region",
      regionActive: true,
      region: pokeregion,
      hasregion: pokeregion.length > 0,
    });
  });
};

exports.GetAddRegion = (req, res, next) => {
  res.render("regiones/regiones-agregar", {
    pagetitle: "Agregar Regiones",
    editmode: false,
  });
};

exports.PostAddRegion = (req, res, next) => {
  const name = req.body.nombreregion;
  const foto = req.body.fotoregion;

  region
    .create({ name: name, URL: foto })
    .then((result) => {
      return res.redirect("/mantenimiento_region");
    })
    .catch((err) => {
      console.log("problema", err);
    });
};

exports.GetEditRegion = (req, res, next) => {
  const edit = req.query.edit;
  const idRegion = req.params.regionID;

  if (!edit) {
    return res.redirect("/mantenimiento_region");
  }

  region
    .findOne({ where: { id: idRegion } })
    .then((result) => {
      const regions = result.dataValues;

      if (!regions) {
        return res.redirect("/mantenimiento_region");
      }

      console.log("este es el edit", regions);

      res.render("regiones/regiones-agregar", {
        pagetitle: "Editar Region",
        regiactive: true,
        editmode: edit,
        region: regions,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditRegion = (req, res, next) => {
  const name = req.body.nombreregion;
  const foto = req.body.fotoregion;
  const idRegion = req.body.regionID;

  region
    .update({ name: name, URL: foto }, { where: { id: idRegion } })

    .then((result) => {
      return res.redirect("/mantenimiento_region");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteRegion = (req, res, next) => {
  const id = req.body.regionDeleteID;

  region
    .destroy({ where: { id: id } })
    .then((result) => {
      return res.redirect("/mantenimiento_region");
    })
    .catch((err) => {
      console.log(err);
    });
};
