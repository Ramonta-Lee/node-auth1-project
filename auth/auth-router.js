const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");

// Add a user
router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 13);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack });
    });
});

// sends login data
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      console.log("user", user);
      if (user && bcrypt.compareSync(password, user.password)) {
        res.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.json({ message: "Unable to logout at this time" });
      } else {
        res.status(200).json({ message: "You are logged out" });
      }
    });
  } else {
    res.status(200).json({ message: "You were never logged in" });
  }
});

module.exports = router;
