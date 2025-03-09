const users = require('../data/usersData');

module.exports = {
  getAll() {
    return users;
  },

  getById(id) {
    return users.find(user => user.id === id);
  },

  create(userData) {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...userData };
    users.push(newUser);
    return newUser;
  },

  update(id, updateData) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updateData };
    return users[index];
  },

  delete(id) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
};
