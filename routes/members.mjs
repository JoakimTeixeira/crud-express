import express from "express";
import { database } from "../database.mjs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Get all members
router.get("/", (req, res) => {
  res.json(database);
});

// Get single member
router.get("/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.filter(user => {
    if (user.id === parseInt(id)) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(400).json("User not found");
  }
});

// Create member
router.post("/", (req, res) => {
  const { name, email } = req.body;

  const newMember = {
    id: uuidv4(),
    name,
    email,
    status: "active",
  };

  if (!name || !email) {
    return res.status(400).json("Please enter a name and email");
  }

  database.push(newMember);
  res.redirect("/");
});

// Update member
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, status } = req.body;

  let found = false;

  database.filter(user => {
    if (user.id === parseInt(id)) {
      found = true;

      if (name) {
        Object.assign(user, { name });
      }
      if (email) {
        Object.assign(user, { email });
      }
      if (status) {
        Object.assign(user, { status });
      }

      res.json({ msg: "Member updated", user });
    }
  });

  if (!found) {
    res.status(400).json(`No member with id ${req.params.id}`);
  }
});

// Delete member
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  const index = database.findIndex(user => {
    if (user.id === parseInt(id)) {
      found = true;
      res.json({ msg: "Deleted user", user });
      return user;
    }
  });

  found ? database.splice(index, 1) : res.status(400).json("User not found");
});

export { router };
