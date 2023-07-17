const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {

  await User.deleteMany({});

    await User.create({
    firstName: 'Germaine',
    lastName: 'Williams',
    email: 'canibus@gmail.com',
    password: 'password12345',
    phone: '6198675309',
    website: 'google.com',
    employer: 'google',
    linkedin: 'checkmylinkedin.com',
    github: 'checkmygithub.com',
    bio: 'Dev @ google',
    posts: [
        {
            postText: 'Post 1',
            createdAt: '2023-07-16T03:27:44.194+00:00',
            comments: [{
                        commentText:'1.1', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},
                       {
                        commentText:'1.2', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},]
          },
          {
            postText: 'Post 2',
            createdAt: '2023-07-16T03:27:44.194+00:00',
            comments: [{
                        commentText:'2.1', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},
                       {
                        commentText:'2.2', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},]
          }
    ]
  });

  await User.create({
    firstName: 'Charlize',
    lastName: 'Theron',
    email: 'aeon@gmail.com',
    password: 'password12345',
    phone: '6198675309',
    website: 'google.com',
    employer: 'google',
    linkedin: 'checkmylinkedin.com',
    github: 'checkmygithub.com',
    bio: 'Dev @ google',
    posts: [
        {
            postText: 'Post 3',
            createdAt: '2023-07-16T03:27:44.194+00:00',
            comments: [{
                        commentText:'3.1', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},
                       {
                        commentText:'3.2', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},]
          },
          {
            postText: 'Post 4',
            createdAt: '2023-07-16T03:27:44.194+00:00',
            comments: [{
                        commentText:'4.1', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},
                       {
                        commentText:'4.2', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},]
          }
    ]
  });

  await User.create({
    firstName: 'Furly',
    lastName: 'Ghost',
    email: 'mac@gmail.com',
    password: 'password12345',
    phone: '6198675309',
    website: 'google.com',
    employer: 'google',
    linkedin: 'checkmylinkedin.com',
    github: 'checkmygithub.com',
    bio: 'Dev @ google',
    posts: [
        {
            postText: 'Post 5',
            createdAt: '2023-07-16T03:25:44.194+00:00',
            comments: [{
                        commentText:'5.1', 
                        createdAt: '2023-07-16T03:25:25.194+00:00'},
                       {
                        commentText:'5.2', 
                        createdAt: '2023-07-16T03:25:51.194+00:00'},]
          },
          {
            postText: 'Post 6',
            createdAt: '2023-07-16T03:27:44.194+00:00',
            comments: [{
                        commentText:'6.1', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},
                       {
                        commentText:'6.2', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},]
          }
    ]
  });

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@gmail.com',
    password: 'password12345',
    phone: '6198675309',
    website: 'google.com',
    employer: 'google',
    linkedin: 'checkmylinkedin.com',
    github: 'checkmygithub.com',
    bio: 'Dev @ google',
    posts: [
        {
            postText: 'Post 7',
            createdAt: '2023-07-16T03:27:44.194+00:00',
            comments: [{
                        commentText:'7.1', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},
                       {
                        commentText:'7.2', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},]
          },
          {
            postText: 'Post 8',
            createdAt: '2023-07-16T03:27:44.194+00:00',
            comments: [{
                        commentText:'8.1', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},
                       {
                        commentText:'8.2', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},]
          }
    ]
  });

  await User.create({
    firstName: 'Hillary',
    lastName: 'Clinton',
    email: 'hilldog420@gmail.com',
    password: 'password12345',
    phone: '6198675309',
    website: 'google.com',
    employer: 'google',
    linkedin: 'checkmylinkedin.com',
    github: 'checkmygithub.com',
    bio: 'Dev @ google',
    posts: [
        {
            postText: 'Post 9',
            createdAt: '2023-07-16T03:27:44.194+00:00',
            comments: [{
                        commentText:'9.1', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},
                       {
                        commentText:'9.2', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},]
          },
          {
            postText: 'Post 10',
            createdAt: '2023-07-16T03:27:44.194+00:00',
            comments: [{
                        commentText:'10.1', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},
                       {
                        commentText:'10.2', 
                        createdAt: '2023-07-16T03:25:21.194+00:00'},]
          }
    ]
  });


  console.log('users seeded');

  process.exit();
});
