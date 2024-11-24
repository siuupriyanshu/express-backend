import Message from '../models/message.model.js';

// Create a new message
export const createMessage = async (req, res) => {
  const { sender, receiver, text } = req.body;

  try {
    const newMessage = new Message({
      sender,
      receiver,
      text,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating message', error });
  }
};

// Get all messages between two users (by sender and receiver)
export const getMessages = async (req, res) => {
  const { sender, receiver } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};
