require("dotenv").config();

const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
// const { type } = require("os");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("DB connection error:", err);
    process.exit(1);
  }
};

connectDB();

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating Upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  console.log("Upload endpoint hit");
  console.log(req.file);
  res.json({
    success: 1,
    // image_url: `http://localhost:${port}/images/${req.file.filename}`,
    image_url: `https://e-commerce-2-kyct.onrender.com/images/${req.file.filename}`,
  });
});

// Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Creating API for deleting products

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Creating API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

//Schema creating for User model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Createing Endpoint for registrering the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: {},
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
      console.log("Logged in with user", data);
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

//creating endpoint for new collection data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
});

//creating endpoint for popular in women
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women Fetched");
  res.send(popular_in_women);
});

//creating middelware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      return res
        .status(401)
        .send({ errors: "please authenticate using a valid token" });
    }
  }
};

//creating endpoint for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        error: "itemId and size are required",
      });
    }

    let userData = await Users.findById(req.user.id);

    if (!userData.cartData) {
      userData.cartData = {};
    }

    if (!userData.cartData[itemId]) {
      userData.cartData[itemId] = {};
    }

    if (!userData.cartData[itemId][size]) {
      userData.cartData[itemId][size] = 0;
    }

    userData.cartData[itemId][size] += 1;
    userData.markModified("cartData");

    await userData.save();

    return res.json({ success: true });
  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// creating endpoint to remove product from cart data
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        error: "itemId and size are required",
      });
    }

    const userData = await Users.findById(req.user.id);

    if (userData.cartData?.[itemId] && userData.cartData[itemId][size] > 0) {
      userData.cartData[itemId][size] -= 1;

      // если стало 0 — удаляем размер
      if (userData.cartData[itemId][size] === 0) {
        delete userData.cartData[itemId][size];
      }

      // если у товара нет размеров — удаляем товар
      if (Object.keys(userData.cartData[itemId]).length === 0) {
        delete userData.cartData[itemId];
      }

      // 🔥 ВАЖНО
      userData.markModified("cartData");
      await userData.save();
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("REMOVE FROM CART ERROR:", err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// get cart data

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  console.log("USER ID:", req.user.id);

  let userData = await Users.findOne({ _id: req.user.id });
  console.log("USER DATA:", userData);

  res.json(userData.cartData);
});

// get user data
app.post("/getuser", fetchUser, async (req, res) => {
  try {
    console.log("USER ID:", req.user.id);
    const userData = await Users.findById(req.user.id).select("-password"); // Без пароля
    console.log("USER DATA:", userData);

    // Форматируем для фронта (firstName, lastName из name)
    const user = {
      firstName: userData.name.split(" ")[0] || userData.name || "",
      lastName: userData.name.split(" ").slice(1).join(" ") || "",
      email: userData.email || "",
      phone: "", // Добавь поле phone в схему Users, если нужно
      isGuest: false,
    };

    res.json({ user });
  } catch (error) {
    console.error("GETUSER ERROR:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port" + port);
  } else {
    console.log("Error: " + error);
  }
});
