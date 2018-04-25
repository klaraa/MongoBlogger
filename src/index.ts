import * as express from "express";
import { MongoClient, Db, ObjectID } from "mongodb";
import { json } from "body-parser";
import * as cors from "cors";

const url = "mongodb://localhost:27777";
const dbName = "blogger";
let db: Db;

const app = express();
app.use(json());
app.use(cors());

app.get("/articles", async (req, res) => {
    const articles = await db.collection("articles")
        .find()
        .project({ comments: 0 })
        .toArray();

    res.send(articles);
});

app.post("/articles", async (req, res) => {
    const article = req.body;
    article.date = article.date ? Date.parse(article.date) : new Date();
    const result = await db.collection("articles").insertOne(article);
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
    const comment = req.body;
    comment.date = comment.date ? Date.parse(comment.date) : new Date();
    const result = await db.collection("articles").updateOne(
        { _id: ObjectID.createFromHexString(req.params.id) },
        { $push: { comments: req.body } }
    );
    res.send(await db.collection("articles").findOne({ _id: ObjectID.createFromHexString(req.params.id) }));

});

(async () => {

    const mongoClient = await MongoClient.connect(url);

    db = mongoClient.db(dbName);

    app.listen(8081);

    console.log("Listening on 8081");

})();
