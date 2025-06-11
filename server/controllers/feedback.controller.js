import Feedback from "../models/feedback.model.js";

// Submit new feedback
export const createFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    const feedback = new Feedback({
      name,
      email,
      message,
      rating,
      user: req.user?._id || null,
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

// Get all feedbacks (Admin only)
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedbacks', error: error.message });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback', error: error.message });
  }
};

// Delete feedback by ID (Admin only)
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    await feedback.deleteOne();
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete feedback', error: error.message });
  }
};