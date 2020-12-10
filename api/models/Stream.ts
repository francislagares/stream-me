import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Ref } from '../types/Ref';

@ObjectType({ description: 'Stream embedded post content' })
export class Stream {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  title: string;

  @Field()
  @Property({ required: true })
  description: string;

  @Field()
  @Property()
  url: string;

  @Field()
  @Property({ ref: User, required: true })
  author: Ref<User>;
}

export const StreamModel = getModelForClass(Stream);
