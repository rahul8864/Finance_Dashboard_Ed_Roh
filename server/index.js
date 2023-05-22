import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import kpiRoutes from './routes/kpi.js';
import KPI from './models/KPI.js';
import { kpis, products } from './data/data.js';
import productRoutes from './routes/product.mjs'
import Product from './models/Product.mjs';

// CONFIGURATION

dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
    // ADD DATA ONE TIME ONLY AS NEEDED

    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
})
.catch(err => console.log(`${err} did not Connected`));

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));