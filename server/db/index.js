const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true, required: true },
    password: String,
});

const User = mongoose.model("User", userSchema);

const recipeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Title: String,
    Ingredients: [String],
    Instructions: String,
    Image: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = {User, Recipe};

const bookmark = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    id : String,
    image : String,
    title : String,

})

const Bookmark = mongoose.model("Bookmark" , bookmark);
module.exports = {  User,Recipe , Bookmark };
