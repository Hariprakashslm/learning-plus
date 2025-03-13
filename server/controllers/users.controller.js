const computeMockUsersData = require("../utils/user.utils");

module.exports = {
  getUsers: (req, res) => {
    const users = computeMockUsersData();
    res.status(200).json({ data: users });
  },
};
