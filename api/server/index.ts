import './env';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';

import createSchema from '../schema';
import createSession from '../session';

const port = process.env.port || 8000;

async function createServer() {
  try {
    // 1. Create mongoose connection
    await createSession();
    // 2. Create express server
    const app = express();

    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
    };

    app.use(cors(corsOptions));

    // use JSON requests
    app.use(express.json());

    const schema = await createSchema();

    // 3. Create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,

      // Enable GraphQL Playgroung
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // Start the server
    app.listen({ port }, () => {
      console.log(
        `Server is running at http://localhost:${port}${apolloServer.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

createServer();
