const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000;


app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://CRUD-Server:i0pqEvT2ANsgfBGg@cluster0.utyjjjr.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();

        const db = client.db('CRUD')
        const userCollection = db.collection('users')

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const users=await userCollection.findOne(query)
            console.log('userid', id)
            res.send(users)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('CRUD Server is Running')
})

app.get('/user', (req, res) => {
    res.send(users)
})
app.listen(port, () => {
    console.log(`CRUD listenning on Port ${port}`)
})