const User = require('../models/User');
const Task = require('../models/Task');

module.exports = {
  getUsers(req, res) {
    const users = User.getAll();
    res.json(users);
  },

  getUser(req, res) {
    const id = Number(req.params.id);
    const user = User.getById(id);
    if (!user) {
      return res.status(404).json({ error: `Пользователь с ID ${id} не найден` });
    }
    res.json(user);
  },

  createUser(req, res) {
    const { fullName, job, age, city } = req.body;
    // Проверка обязательных полей
    if (!fullName || !job || !age || !city) {
      return res.status(400).json({ error: "Отсутствуют обязательные поля: fullName, job, age, city" });
    }
    const newUser = User.create({ fullName, job, age, city });
    res.status(201).json(newUser);
  },

  updateUser(req, res) {
    const id = Number(req.params.id);
    const { fullName, job, age, city } = req.body;
    if (!fullName || !job || !age || !city) {
      return res.status(400).json({ error: "Отсутствуют обязательные поля: fullName, job, age, city" });
    }
    const updatedUser = User.update(id, { fullName, job, age, city });
    if (!updatedUser) {
      return res.status(404).json({ error: `Пользователь с ID ${id} не найден` });
    }
    res.json(updatedUser);
  },

  deleteUser(req, res) {
    const id = Number(req.params.id);
    const user = User.getById(id);
    if (!user) {
      return res.status(404).json({ error: `Пользователь с ID ${id} не найден` });
    }
    Task.deleteAllByUserId(id);
    User.delete(id);
    res.json({ message: "Пользователь и связанные задачи удалены" });
  }
};
