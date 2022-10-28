const express = require("express")

const router = express.Router();

const tipoPoke = require("../controllers/tipoController");


router.get("/mantenimiento_tipo", tipoPoke.GetTypeList);
router.get("/agregar_tipo", tipoPoke.GetAddType);
router.post("/crear_tipo", tipoPoke.PostAddType);
router.get("/edit-tipo/:tipoID", tipoPoke.GetEditType);
router.post("/edit-tipo", tipoPoke.PostEditType);
router.post("/delete-tipo", tipoPoke.PostDeleteType);


module.exports = router;