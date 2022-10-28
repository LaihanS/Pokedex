const express = require("express")

const router = express.Router();

const controlleregion = require("../controllers/regionController");


router.get("/mantenimiento_region", controlleregion.GetRegionList);
router.get("/agregar_region", controlleregion.GetAddRegion);
router.post("/crear_region", controlleregion.PostAddRegion);
router.get("/edit-region/:regionID", controlleregion.GetEditRegion);
router.post("/edit-region", controlleregion.PostEditRegion);
router.post("/delete-region", controlleregion.PostDeleteRegion);


module.exports = router;