const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");

const errorcontr = require("./controllers/error404");
const pokeRouter = require('./routes/pokemones');
const regionRouter = require('./routes/region');
const tipoRouter = require('./routes/tipos');

const sequelize = require("./models/conexión");
const pokemon = require("./models/pokemones");
const region = require("./models/regiones");
const tipos = require("./models/tipos");
const { Http2ServerResponse } = require("http2");

const comparehelper = require("./helpers/helper");

const app = express();

app.engine("hbs", 
expressHbs({
layoutsDir: "views/layouts", 
defaultLayout: "index",
extname: "hbs",
helpers: {
 comparation: comparehelper.compare,
}
})
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));


app.use(pokeRouter);
app.use(regionRouter);
app.use(tipoRouter);

app.use(errorcontr.Get404);


pokemon.belongsTo(region,{constraint: true, onDelete: "CASCADE"});
region.hasMany(pokemon);

pokemon.belongsTo(tipos,{constraint: true, onDelete: "CASCADE"});
tipos.hasMany(pokemon);

//sequelize.sync({force: true}).then(function (result)
sequelize.sync().then(function (result) {

}).catch(error => {
    console.log(error);
})

app.listen(5000);
