
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: Number,

  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "John",
  age: 25,
  favoriteFoods: ["Rice", "Chicken"]
});

person.save()
  .then((data) => {
    console.log("Person saved successfully:", data);
  })
  .catch((err) => {
    console.log("Error saving person:", err);
  });
Person.create([
  {
    name: "Mary",
    age: 22,
    favoriteFoods: ["Pizza", "Rice"]
  },
  {
    name: "Peter",
    age: 30,
    favoriteFoods: ["Burritos", "Chicken"]
  },
  {
    name: "Sarah",
    age: 19,
    favoriteFoods: ["Rice", "Burritos"]
  }
])
  .then((data) => {
    console.log("People created successfully:", data);
  })
  .catch((err) => {
    console.log("Error creating people:", err);
  });
Person.find({ name: "Mary" })
  .then((data) => {
    console.log("People named Mary:", data);
  })
  .catch((err) => {
    console.log("Error finding person:", err);
  });
Person.findOne({ favoriteFoods: "Burritos" })
  .then((data) => {
    console.log("Person who likes Burritos:", data);
  })
  .catch((err) => {
    console.log("Error finding person:", err);
  });
Person.findById("6ad0a3c10d90e9abf4df38b3")
  .then((data) => {
    console.log("Person found by ID:", data);
  })
  .catch((err) => {
    console.log("Error finding person:", err);
  });
Person.findById("6ad0a3c10d90e9abf4df38b3")
  .then((person) => {
    if (!person) {
      console.log("Person not found");
      return;
    }

    person.favoriteFoods.push("hamburger");

    return person.save();
  })
  .then((updatedPerson) => {
    if (updatedPerson) {
      console.log("Updated person:", updatedPerson);
    }
  })
  .catch((err) => {
    console.log("Error updating person:", err);
  });
  Person.findOneAndUpdate(
  { name: "Sarah" },
  { age: 20 },
  { new: true }
)
  .then((updatedPerson) => {
    console.log("Person after age update:", updatedPerson);
  })
  .catch((err) => {
    console.log("Error updating age:", err);
  });
Person.findByIdAndDelete("6ad0a3c10d90e9abf4df38b3")
  .then((deletedPerson) => {
    if (deletedPerson) {
      console.log("Person deleted successfully:", deletedPerson);
    } else {
      console.log("Person not found");
    }
  })
  .catch((err) => {
    console.log("Error deleting person:", err);
  });
  Person.deleteMany({ name: "Mary" })
  .then((result) => {
    console.log("Mary records deleted:", result.deletedCount);
  })
  .catch((err) => {
    console.log("Error deleting Mary records:", err);
  });
  Person.find({ favoriteFoods: "Burritos" })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((data) => {
    console.log("Query results:", data);
  })
  .catch((err) => {
    console.log("Error running query:", err);
  });