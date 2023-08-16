import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { User, Post, Comment } from '../models/index.js';
import { createToken } from '../util/auth.js';
import { UserType, PostType, CommentType } from './types.js';

export const register = {
  type: GraphQLString,
  description: 'Register new user',
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { username, password, email, displayName } = args;
    const newUser = new User({ username, password, email, displayName });
    await newUser.save();
    const token = createToken({
      _id: newUser._id,
      username: newUser.username,
      displayName: newUser.displayName,
      time: new Date().toISOString(),
    });
    return token;
  },
};

export const login = {
  type: GraphQLString,
  description: 'Login user',
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const userFound = await User.findOne({
      email: args.email,
      password: args.password,
    });

    if (!userFound) throw new Error('Invalid credentials');

    const token = createToken({
      _id: userFound._id,
      username: userFound.username,
      time: new Date().toISOString(),
    });
    return token;
  },
};

export const createPost = {
  type: PostType,
  description: 'create a new post',
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error('You must be logged in to do that');

    const userFound = await User.findById(verifiedUser._id);
    if (!userFound) throw new Error('Unauthorized');

    const post = new Post({
      title: args.title,
      body: args.body,
      authorId: verifiedUser._id,
    });

    return post.save();
  },
};

export const updatePost = {
  type: PostType,
  description: 'update a post',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve: async (_, { id, title, body }, verifiedUser) => {
    if (!verifiedUser) throw new Error('You must be logged in to do that');

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id, authorId: verifiedUser._id }, // si es el autor que creo el post puede actualizarlo
      { title, body },
      { new: true, runValidators: true }
    );

    if (!updatedPost) throw new Error('Post not found');

    return updatedPost;
  },
};

export const deletePost = {
  type: GraphQLString,
  description: 'delete a post',
  args: {
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { postId }, { verifiedUser }) => {
    if (!verifiedUser) throw new Error('You must be logged in to do that');
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      authorId: verifiedUser._id,
    });

    if (!deletedPost) throw new Error('Post not found');

    return 'Post deleted';
  },
};

export const addComment = {
  type: CommentType,
  description: 'Add a new comment to a post',
  args: {
    comment: { type: new GraphQLNonNull(GraphQLString) },
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, { comment, postId }, { verifiedUser }) {
    if (!verifiedUser) throw new Error('You must be logged in to do that');
    const postFound = await Post.findById(postId);
    if (!postFound) throw new Error('Post not found');

    const newComment = new Comment({
      comment,
      postId,
      userId: verifiedUser._id,
    });

    return newComment.save();
  },
};

export const updateComment = {
  type: CommentType,
  description: 'update a comment',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    comment: { type: GraphQLString },
  },
  resolve: async (_, { id, comment }, verifiedUser) => {
    if (!verifiedUser) throw new Error('You must be logged in to do that');

    const updatedComment = await Comment.findByIdAndUpdate(
      { _id: id, userId: verifiedUser._id },
      { comment },
      { new: true, runValidators: true }
    );
    if (!updatedComment) throw new Error('Comment not found');
    return updatedComment;
  },
};

export const deleteComment = {
  type: GraphQLString,
  description: 'delete a comment',
  args: {
    commentId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { commentId }, { verifiedUser }) => {
    if (!verifiedUser) throw new Error('You must be logged in to do that');
    const deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
      userId: verifiedUser._id,
    });

    if (!deletedComment) throw new Error('Comment not found');

    return 'Comment deleted';
  },
};
