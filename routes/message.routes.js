import express from 'express';
import { createMessage, getMessages } from '../controllers/message.controller.js';

const router = express.Router();

// Create a new message
router.post('/', createMessage);

// Get all messages between two users (by sender and receiver)
router.get('/', getMessages);

export default router;

