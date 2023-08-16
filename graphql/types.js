import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';
import { User, Comment, Post } from '../models/index.js';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'User type definition',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent) => {
        return await Post.find({ authorId: parent.id });
      },
    },
  }),
});

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  description: 'Post type definition',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: (parent) => {
        return User.findById(parent.authorId);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: (parent) => {
        return Comment.find({ postId: parent.id });
      },
    },
  }),
});

export const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  description: 'Comment type definition',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: { type: UserType, resolve: (parent) => User.findById(parent.userId) },
    post: { type: PostType, resolve: (parent) => Post.findById(parent.postId) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

//este archivo es para definir los tipos de datos que se van a usar en el schema, y que se puede usar en los resolvers(consultas)
