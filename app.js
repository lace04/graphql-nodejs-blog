import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema.js';
import { authenticate } from './middlewares/auth.middleware.js';

const app = express();

app.use(authenticate); // middleware to authenticate user

app.get('/', (req, res) => {
  res.send('GraphQL API for a Blog');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

export default app;
