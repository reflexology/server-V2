import express from 'express';
import bcrypt from 'bcryptjs';
import { userManager } from '../../managers';
import * as jwtService from '../../services/jwtService';
import auth from '../middlewares/authMiddleware';
import { Errors } from '../../utils/errors';
import { IUser } from '../../models/userModel';

const router = express.Router();

/**
 * POST /api/user/login
 * Public
 * Login with username and password
 */
router.post<never, Tokens | ResErr, IUser>('/login', async function(req, res) {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) return res.status(400).json({ msg: Errors.AllFieldsRequired });

  // Check for existing user
  const user = await userManager.getUserByUsername(username);
  if (!user) return res.status(400).json({ msg: Errors.UserNotExist });

  // Validate password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ msg: Errors.InvalidPassword });

  // Create tokens
  const [accessToken, refreshToken] = jwtService.generateAuthTokens(user);

  res.status(200).json({ accessToken, refreshToken });
});

/**
 * POST /api/user/register
 * Private
 * Creates new user and return tokens
 */
router.post<never, Tokens | ResErr, IUser>('/register', auth, async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) return res.status(400).json({ msg: Errors.AllFieldsRequired });

  // Check for existing user
  let user = await userManager.getUserByUsername(username);
  if (user) return res.status(400).json({ msg: Errors.UserAlreadyRegistered });

  user = await userManager.createUser({ username, password });

  // Create tokens
  const [accessToken, refreshToken] = jwtService.generateAuthTokens(user);

  res.status(201).json({ accessToken, refreshToken });
});

export default router;
