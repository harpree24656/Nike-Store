// backend using express.js and mongoDB
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// declaration
const app = express()
const PORT = process.env.PORT

// using middleware
app.use(cors())
app.use(express.json())

// connection
mongoose.connect("mongodb://127.0.0.1:27017/userDB")
    .then(() => console.log("MongoDB working properly"))
    .catch(error => console.log(error))

// creating a schema for payment method
const userdetailSchema = new mongoose.Schema({
    email: String,
    card: String,
    expDate: String,
    cvv: String
})

// using model
const userdetail = mongoose.model("userdetail", userdetailSchema);

app.post("/checkout", async (req, res) => {
  try {
    console.log("Checkout Data:", req.body);
    const { email, card, expDate, cvv } = req.body;
    await userdetail.create({
      email,
      card,
      expDate,
      cvv
    });
    res.json({ message: "User Saved Successfully" });

  } catch (error) {
    console.log("Checkout Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// creating a schema for suggestion submission
const suggestionSchema = new mongoose.Schema({
    username: String,
    sugemail: String,
    messagebox: String
})

// creating model
const sugMsg = mongoose.model("sugMsg", suggestionSchema);

app.post("/submit", async (req, res) => {
    try {
        const { username, sugemail, messagebox } = req.body;
        await sugMsg.create({
            username, sugemail, messagebox
        });
        res.json({ message: "Submit data of Suggestion" });
    }
    catch (error) {
        console.log("An error is shown which is ", error);
        res.status(500).json({ error: "Server error" });
    }
})

// 2. Define how a User looks (Schema)
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// // 3. The "Register" Route
// app.post('/register', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Scramble the password (Hashing)
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save to Database
//         const newUser = new User({ email, password: hashedPassword });
//         await newUser.save();
//         res.json({ message: "User Registered Successfully" });

//     } catch (err) {
//         res.status(500).json({ message: "Error: Email might already exist." });
//     }
// });

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Scramble the password (Hashing)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save to Database
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // create JWT token 
        const token = jwt.sign(
            {
                userId: newUser._id,
                email:newUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
         )
        res.json({ token, userId: newUser._id , email: newUser.email});
        res.json({ message: "User Registered Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error: Email might already exist." });
    }
});


// listener
app.listen(PORT, () => {
    console.log(`Server is running on Port http://localhost:${PORT}`);
})