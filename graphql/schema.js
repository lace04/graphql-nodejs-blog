import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import {
  hello,
  getAllUsers,
  getUser,
  getAllposts,
  getPost,
  getAllComments,
  getComment,
  getPostsByUser,
} from './queries.js';
import {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
} from './mutations.js';

const rootType = new GraphQLObjectType({
  name: 'Root',
  description: 'Root of the Schema',
  fields: {
    hello,
    getAllUsers,
    getUser,
    getAllposts,
    getPost,
    getAllComments,
    getComment,
    getPostsByUser,
  },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'The root mutation type',
  fields: {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment,
  },
});

export const schema = new GraphQLSchema({
  query: rootType,
  mutation: MutationType,
});

//este archivo es el que se exporta para usarlo en el index.js
