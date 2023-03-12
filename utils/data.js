const users = [
    {
      id: 1,
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      thoughts: [1, 2],
      friends: [2],
    },
    {
      id: 2,
      username: 'janedoe',
      email: 'janedoe@gmail.com',
      thoughts: [3],
      friends: [1],
    },
  ];
  
  const thoughts = [
    {
      id: 1,
      thoughtText: 'Mountain Dew Will Make You Grow 6 Inches!',
      username: 'johndoe',
      createdAt: '2022-03-01T19:36:10.129Z',
      reactions: [{ reactionBody: '👍', username: 'janedoe' }],
    },
    {
      id: 2,
      thoughtText: 'Im Huge In Japan!',
      username: 'johndoe',
      createdAt: '2022-03-01T19:36:10.129Z',
      reactions: [],
    },
    {
      id: 3,
      thoughtText: 'Dunananananananananana BATMAN!',
      username: 'janedoe',
      createdAt: '2022-03-01T19:36:10.129Z',
      reactions: [{ reactionBody: '👎', username: 'johndoe' }],
    },
  ];
  
  module.exports = { users, thoughts };