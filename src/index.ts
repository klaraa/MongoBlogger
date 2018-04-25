import * as express from "express";
import { MongoClient, Db, ObjectID } from "mongodb";
import { json } from "body-parser";

const url = "mongodb://localhost:27777";
const dbName = "blogger";
let db: Db;

const app = express();
app.use(json());

app.get("/articles", async (req, res) => {
    const articles = await db.collection("articles")
        .find()
        .project({ comments: 0 })
        .toArray();

    res.send(articles);
});

app.post("/articles", async (req, res) => {
    const result = await db.collection("articles").insertOne(req.body);
    res.send(await db.collection("articles").findOne({ _id: result.insertedId }));
});

app.delete("/articles/:id", async (req, res) => {
    const article = await db.collection("articles").deleteOne({
        _id: ObjectID.createFromHexString(req.params.id)
    });
    res.status(204).end();
});

app.get("/articles/:id", async (req, res) => {

    const article = await db.collection("articles").findOne({
        _id: ObjectID.createFromHexString(req.params.id)
    });

    res.send(article);

});

app.post("/articles/:id/comments", async (req, res) => {
    const result = await db.collection("articles").updateOne({
        _id: ObjectID.createFromHexString(req.params.id)
    },
    {
        $push: {
            comments: req.body
        }
    });
    res.send(await db.collection("articles").findOne({ _id: ObjectID.createFromHexString(req.params.id) }));

});

(async () => {

    const mongoClient = await MongoClient.connect(url);

    db = mongoClient.db(dbName);

    app.listen(8080);

    console.log("Listening on 8080");

})();
