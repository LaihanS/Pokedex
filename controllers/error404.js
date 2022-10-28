exports.Get404 = (req, res, next) => {
res.status(404).render("error", {pagetitle: "Error klk"});
};