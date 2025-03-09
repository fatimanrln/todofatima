const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const tasksRouter = require("./routes/tasks");

app.use(express.json());

// Подключение роутов для пользователей
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Подключение роутов для задач (если уже реализовано)
const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Глобальные middleware
app.use(express.json()); // Парсинг JSON-тела запроса
app.use(logger); // Логирование запросов

// Подключение маршрутов
app.use("/tasks", tasksRouter);

// Обработка ошибок 404 (не найден)
app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

module.exports = app;
