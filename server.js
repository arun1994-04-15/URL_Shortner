const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./views/models/shortUrl");
const app = express();

mongoose.connect(
  "mongodb+srv://arunkumarpandi:URL123@cluster0.lgtsl.mongodb.net/test?authSource=admin&replicaSet=atlas-7fly0k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// mongoose.connect('mongodb://127.0.0.1/urlShortener', {
//   useNewUrlParser: true, useUnifiedTopology: true
// })

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async function (req, res) {
 try {
  const shortUrls = await ShortUrl.find();
  //console.log(shortUrls);
  res.render("index", { shortUrls: shortUrls });
 } catch (error) {
   console.log(error);
 }
});

app.post("/shortUrls", async function (req, res) {
  await ShortUrl.create({ full: req.body.originalURL });

  res.redirect("/");
});

app.get("/:shortUrl", async function (req, res) {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000);
