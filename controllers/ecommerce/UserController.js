import User from '../../models/UserModel.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import {config} from '../../config/connect.js';

const userController = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create a new user
      user = new User({ username, email, password });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      // Create and return a JSON web token (JWT) for authentication
      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        config.app.jwtSecret, // Access config from connectDB
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Verify the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Create and return a JSON web token (JWT) for authentication
      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        config.app.jwtSecret,
        { expiresIn: '1h' }, // Adjust token expiration as needed
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ message:"login success", token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  getUserProfile: async (req, res) => {
    try {
      // Fetch user profile from the database
      const user = await User.findById(req.user.id).select('-password');
      console.log(user);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { username, email } = req.body;

      // Build an update object based on provided data
      const profileFields = {};
      if (username) profileFields.username = username;
      if (email) profileFields.email = email;

      // Update user profile in the database
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: profileFields },
        { new: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  // Add routes and methods for password reset functionality here...
};

export default userController;
