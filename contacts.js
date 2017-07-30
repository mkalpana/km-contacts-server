const clone = require('clone');
const config = require('./config');

const db = {};

const defaultData = {
  contacts: [
    {
      id: 'john',
      name: 'John Doe',
      email: 'john@mail.com',
      avatarURL: config.origin + '/john.jpg'
    },
    {
      id: 'jane',
      name: 'Jane Doe',
      email: 'jane@mail.com',
      avatarURL: config.origin + '/jane.jpg'
    },
    {
      id: 'joe',
      name: 'Joe Smith',
      email: 'joe@mail.com',
      avatarURL: config.origin + '/joe.jpg'
    }
  ]
};

const get = (token) => {
  let data = db[token];

  if (data == null) {
    data = db[token] = clone(defaultData);
  }

  return data;
}

const add = (token, contact) => {
  if (!contact.id) {
    contact.id = Math.random().toString(36).substr(-8);
  }

  get(token).contacts.push(contact);

  return contact;
}

const remove = (token, id) => {
  const data = get(token);
  const contact = data.contacts.find(c => c.id === id);

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact);
  }

  return { contact };
}

module.exports = {
  get,
  add,
  remove
};