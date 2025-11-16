import UserModel from '../models/Users.js'; 
export const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

export const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "User deleted" }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

export const createUser = (req, res) => {
  const newUser = new UserModel(req.body);
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

export const updateUser = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
