const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

// connect to db
// mongoose.connect(
//   process.env.DB_CONNECT,
//   { useUnifiedTopology: true, useNewUrlParser: true },
//   () => console.log("connected to db")
// );

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to database'))
  .catch((error) => console.error('connection error:', error));
// Import routes
const productRoutes = require("./routes/product");

// Middlewares
app.use(express.json());


app.use('/api', require("./Routes/Createuser"))
app.use(cors());

// route Middlewares
app.use("/api/products", productRoutes);

app.listen(3000, () => console.log("server up and runing on port 3000!"));
