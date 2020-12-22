import './env';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';

import nextApp from '@stream-me/app';

import createSchema from '../schema';
import createSession from '../session';

const handle = nextApp.getRequestHandler();

async function createServer() {
  try {
    // 1. Create mongoose connection
    await createSession();
    // 2. Create express server
    const app = express();

    const corsOptions = {
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

    // Create server app request handler
    // prepare the next app
    await nextApp.prepare();
    app.get('*', (req, res) => handle(req, res));

    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

createServer();
