// testConnection.js

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Use your MONGO_URI from .env, or define it directly like this for testing
const uri = "mongodb+srv://Viren:Viren@cluster0.5aenm.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0"; // This can also be stored in .env

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        // Send a ping to confirm a successful connection
        await client.db("expense-tracker").command({ ping: 1 });
        console.log("Pinged your deployment. Connection is successful!");

    } catch (error) {
        console.error("Connection error:", error);
    } finally {
        await client.close();
    }
}

// Execute the run function and handle any errors
run().catch(console.dir);
