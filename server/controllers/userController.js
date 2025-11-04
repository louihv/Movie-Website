const UserModel = require('../models/Users'); // Ensure the filename is correct

// Get all users
const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// Delete a user by ID
const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "User deleted" }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// Create a new user
const createUser = (req, res) => {
  const newUser = new UserModel(req.body);
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// Update a user by ID
const updateUser = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = { getUsers, deleteUser, createUser, updateUser };
