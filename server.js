const { ApolloServer } = require('apollo-server');
require('dotenv').config();
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

mongoose
  .connect(process.env.MONGO_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connection established'))
  .catch(() => console.log(err))

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
