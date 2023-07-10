const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');


async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: app });
    app.use((req, res) => {
        res.send('Hello from express apollo server');
    });

    const mongodbUri = 'mongodb://127.0.0.1:27017/graphql_post_db';
    const port = 8080;

    // Connect to MongoDB
    mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log(`Connected to MongoDB:: ${mongodbUri}`);
            // Start the server
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });

   // app.listen(4000, () => console.log('Server in running on Port: 4000'))
}

startServer();