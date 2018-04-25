import * as express from "express";
import { MongoClient, Db, ObjectID } from "mongodb";

const url = "mongodb://localhost:27777";
const dbName = "blogger";
let db: Db;

const app = express();

app.get("/articles", async (req, res) => {
    const articles = await db.collection("articles")
        .find()
        .project({ comments: 0 })
        .toArray();

    res.send(articles);
});

app.post("/articles", (req, res) => {
    res.send("Hello World");
});

app.delete("/articles/:id", (req, res) => {
    res.send("Hello World");
});

app.get("/articles/:id", async (req, res) => {

    const article = await db.collection("articles").findOne({
        _id: ObjectID.createFromHexString(req.params.id)
    });

    res.send(article);

});

app.post("/articles/:id/comments", (req, res) => {
    res.send("Hello World");
});

(async () => {

    const mongoClient = await MongoClient.connect(url);

    db = mongoClient.db(dbName);

    app.listen(8080);

    console.log("Listening on 8080");

})();
