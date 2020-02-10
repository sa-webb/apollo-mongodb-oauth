const user = {
  _id: '1',
  name: 'austin webb',
  email: 'stevenaustinwebb@gmail.com',
  picture: 'https://cloudinary.com/nendsudes.jpg'
};

module.exports = {
  Query: {
    me: () => user
  }
};
