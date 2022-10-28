const tipos = require("../models/tipos");

exports.GetTypeList = (req, res, next) => {
  tipos.findAll().then((result) => {
    const tipoPoke = result.map((result) => result.dataValues);

    console.log(tipoPoke);

    res.render("tipos/MantenimientoTipos", {
      pagetitle: "Mantenimiento Tipos",
      tipoActive: true,
      tipo: tipoPoke,
      hastipo: tipoPoke.length > 0,
    });
  });
};

exports.GetAddType = (req, res, next) => {
  res.render("tipos/tipos-agregar", {
    pagetitle: "Agregar Tipos",
    editmode: false,
  });
};

exports.PostAddType = (req, res, next) => {
  const name = req.body.nombretipo;
  const foto = req.body.fototipo;

  tipos
    .create({ name: name, URL: foto })
    .then((result) => {
      return res.redirect("/mantenimiento_tipo");
    })
    .catch((err) => {
      console.log("problema", err);
    });
};

exports.GetEditType = (req, res, next) => {
  const edit = req.query.edit;
  const idType = req.params.tipoID;

  if (!edit) {
    return res.redirect("/mantenimiento_tipo");
  }

  tipos
    .findOne({ where: { id: idType } })
    .then((result) => {
      const tipos = result.dataValues;

      if (!tipos) {
        return res.redirect("/mantenimiento_tipo");
      }

      console.log("este es el edit", tipos);

      res.render("tipos/tipos-agregar", {
        pagetitle: "Editar Tipo",
        regiactive: true,
        editmode: edit,
        tipo: tipos,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditType = (req, res, next) => {
  const name = req.body.nombretipo;
  const foto = req.body.fototipo;
  const tipoID = req.body.tipoID;

  tipos
    .update({ name: name, URL: foto }, { where: { id: tipoID } })

    .then((result) => {
      return res.redirect("/mantenimiento_tipo");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteType = (req, res, next) => {
  const id = req.body.tipoDeleteID;

  tipos
    .destroy({ where: { id: id } })
    .then((result) => {
      return res.redirect("/mantenimiento_tipo");
    })
    .catch((err) => {
      console.log(err);
    });
};
