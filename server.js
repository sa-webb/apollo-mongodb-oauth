const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./src/controllers/userController');

mongoose
  .connect(process.env.MONGO_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connection established'))
  .catch(() => console.log(err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization
      if (authToken) {
        // Find or create a User.
        currentUser = await findOrCreateUser(authToken)
      }
    } catch {
      console.error(`Unable to authentication ${authToken}`)
    }
    return { currentUser }
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
