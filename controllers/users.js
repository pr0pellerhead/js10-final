const User = require("../models/user");

module.exports = {
  fetchAll: async (req, res) => {
    // assume try catch
    const users = await User.find();

    res.status(200).send({
      error: false,
      message: 'All users are fetched',
      users
    });
  },

  fetchOne: async (req, res) => {
    // assume try catch
    const user = await User.findById(req.params.id);

    res.status(200).send({
      error: false,
      message: `User with id #${req.params.id} fetched`,
      user
    });
  },

  orderByAge: async (req, res) => {
    const users = await User.find().sort({ age: 1 });

    res.send({
      users: users
    });
  }
}