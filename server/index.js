require("dotenv").config();
const mongoose = require("mongoose");

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  cors: {
    origin: process.env.FRONTEND_URL,
  },
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: process.env.PORT || 80 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
