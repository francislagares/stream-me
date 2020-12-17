import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { ObjectId } from 'mongodb';
import path from 'path';

import { UserResolver } from '../resolvers/UserResolver';
import { AuthResolver } from '../resolvers/AuthResolver';
import { StreamResolver } from '../resolvers/StreamResolver';
import { ObjectIdScalar } from './object-id-scalar';
import { TypegooseMiddleware } from '../middleware/typegoose';

// Build TypeGraphQL executable schema
export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // 1. Add all typescript resolvers
    resolvers: [UserResolver, AuthResolver, StreamResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    // 2. Use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // 3. Use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });
  return schema;
}
