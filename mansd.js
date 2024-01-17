let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.get("/", (req, res) => {
  // this is the home page route
  //res.send("Hello Express"); devuelve un string como respuesta
  res.sendfile(__dirname + "/views/index.html"); //Devuelve un archivo como respuesta
});
app.use("/", function (req, res, next) {
  // middleware functions sirven para manipular las peticiones
  // Poner siempre las funciones middleware en rutas superiores
  // Esto es para que no se pierda la informacion de las peticiones
  // Es decir q siempre debe ir primero la raiz luego public etc etc
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
app.use("/", bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public")); // sirve para que el servidor pueda acceder a archivos estáticos
app.get("/json", (req, res) => {
  // responde a una petición GET a la ruta /json
  process.env.MESSAGE_STYLE != "uppercase"
    ? res.json({ message: "Hello json" })
    : res.json({ message: "HELLO JSON" });
});
app.get(
  // responde a una petición GET a la ruta /now
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  }, // middleware encadenados
  (req, res) => {
    res.json({
      time: req.time,
    });
  },
);
app.get("/:word/echo", (req, res) => {
  //req.params se usa con /: y elige de los parametros esos valores
  word = req.params.word;
  res.json({ echo: word });
});
app.get("/name", (req, res) => {
  // req.query se usa con /name?first=firstname&last=lastname y elige de los parametros esos valores
  // req.query.first y req.query.last
  var first = req.query.first;
  var last = req.query.last;
  res.json({ name: first + " " + last });
});
app.post("/name", (req, res) => {
  var first = req.body.first;
  var last = req.body.last;
  res.json({ name: first + " " + last });
});
module.exports = app;
console.log("Hello World");
