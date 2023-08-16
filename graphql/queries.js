import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { UserType, PostType, CommentType } from './types.js';
import { User, Post, Comment } from '../models/index.js';

export const hello = {
  type: GraphQLString,
  description: 'Hello World',
  resolve: async () => {
    return 'World';
  },
};

export const getAllUsers = {
  type: new GraphQLList(UserType), // GraphQLList(GraphQLString
  description: 'Get all users',
  resolve: async () => {
    return await User.find();
  },
};

export const getUser = {
  type: UserType,
  description: 'Get a user',
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    const userFound = await User.findById(args.id);
    if (!userFound) throw new Error('User not found');
    return userFound;
  },
};

export const getAllposts = {
  type: new GraphQLList(PostType),
  description: 'Get all posts',
  resolve: async () => {
    return await Post.find();
  },
};

export const getPost = {
  type: PostType,
  description: 'Get a post',
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    const postFound = await Post.findById(args.id);
    if (!postFound) throw new Error('Post not found');
    return postFound;
  },
};

export const getPostsByUser = {
  type: new GraphQLList(PostType),
  description: 'Get all posts by user',
  args: {
    userId: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    return await Post.find({ userId: args.userId });
  },
};

export const getAllComments = {
  type: new GraphQLList(CommentType),
  description: 'Get all comments',
  resolve: async () => {
    return await Comment.find();
  },
};

export const getComment = {
  type: CommentType,
  description: 'Get a comment',
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    const commentFound = await Comment.findById(args.id);
    if (!commentFound) throw new Error('Comment not found');
    return commentFound;
  },
};
