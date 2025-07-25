import Food from '../models/foodModel.js';

export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({ restaurant: req.user.restaurantId });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving food items', error });
  }
};

export const addFood = async (req, res) => {
  const { name, price, isAvailable } = req.body;
  const restaurantId = req.user.restaurantId;
  const image = req.file ? req.file.path : null;

  const newFood = new Food({
    name,
    price,
    isAvailable,
    image,
    restaurant: restaurantId,
  });

  try {
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ message: 'Error adding food item', error });
  }
};

export const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, price, isAvailable } = req.body;
  const image = req.file ? req.file.path : req.body.image;

  try {
    const updatedFood = await Food.findByIdAndUpdate(
      id,
      { name, price, isAvailable, image },
      { new: true }
    );
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: 'Error updating food item', error });
  }
};

export const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting food item', error });
  }
};
