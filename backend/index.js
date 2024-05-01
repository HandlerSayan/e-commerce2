const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path"); //we can get access to our backend directory
const cors = require("cors");
const { type } = require("os");
const stripe = require("stripe")(
  "sk_test_51PBFXLSCY54XEHwOwjc3nmyHaSK2qiHUZS7gshseZMQ5t2WSx7V6mafe7PTwHT8Reu0pq098RJs3PGhEUjILpBXJ00jROJwIjV"
);
const port = 4000; //using port 4000

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// mongoose.pluralize(null);
app.use(express.static("./static"));

//Storing Images using multer
const dataStorage = multer.diskStorage({
  destination: "./dataUpload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: dataStorage });

//Creating endpoint to upload images
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`,
  });
});
app.use("/images", express.static("dataUpload/images"));

//-----------SCHEMAS-----------
//PRODUCT SCHEMA
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
  },
  old_price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

//MONGOOSE SCHEMA FOR USER
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
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

//CHECKOUT PAGE SCHEMA
const Payment = mongoose.model("Payment", {
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Object,
    required: true,
  },
  cardNum: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Number,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
});

//----------------API's----------------//

app.get("/", (req, res) => {
  res.send("App is Up And Running");
});

//API for user registration
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).send({ message: "User already exists" });
  }
  let cart = {};
  for (let index = 0; index < 350; index++) {
    cart[index] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
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

//User Login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCheck = req.body.password === user.password;
    if (passCheck) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Incorrect Password" });
    }
  } else {
    res.json({ success: false, error: "Enter correct email ID" });
  }
});

//API FOR NEW COLLECTION SECTION
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("Getting new collections...");
  res.send(newcollection);
});

//API FOR TRENDING IN WOMEN CATEGORY
app.get("/trending", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let trending = products.slice(0, 4);
  console.log("Fetching items for trending...");
  res.send(trending);
});

// TO ADD PRODUCTS TO DATABASE
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
  console.log(id);
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
  console.log("Product Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//TO REMOVE PRODUCTS FROM DATABASE
app.post("/removeproduct", async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("Successfully removed");
  res.json({ success: true, name: req.body.name });
});

//TO GET ALL PRODUCTS FROM DATABASE
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("Fetching Products...");
  res.send(products);
});

//MAKING A MIDDLEWARE TO FETCH USER
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "valid token required" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "valid token required" });
    }
  }
};

//TO ADD PRODUCTS IN CART
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Successfully Added");
});

//TO REMOVE PRODUCTS FROM CART
app.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Successfully Removed");
});

//GETTING ADDED PRODUCTS IN CART AFTER LOGOUT/LOGIN
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Get Cart Items");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

//CONNECTING DATABASE
mongoose
  .connect(
    "mongodb+srv://dbSayan:admin_0100@cluster0.tqvg1nu.mongodb.net/e-com"
  )
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(port, (error) => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error Found: ${error}`);
  });
