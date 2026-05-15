import express from 'express';
import { db } from './db.js';
import { cars } from './schema.js';
import { eq } from 'drizzle-orm';

// Create an Express application
const app = express();
const PORT = 3000;
const router = express.Router();
app.use(express.json());
// Middleware to log request details
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});
  

// view all cars
app.get('', (req, res)=>{
    res.send('Hello from the Car API..!');
});
// use the router for all routes starting with /api/v1/cars
app.use('/api/v1/cars', router);

router.get('/', async (req, res)=>{
    const allCar = await db.select().from(cars);
    res.json(allCar);
});

// ====== CRUD operations for cars =======

// view a specific car by ID
router.get("/:id", async (req, res) => {
  const carId = Number(req.params.id);

  if (isNaN(carId)) {
    return res.status(400).send("Invalid car ID");
  }

  const car = await db
    .select()
    .from(cars)
    .where(eq(cars.id, carId));

  if (car.length === 0) {
    return res.status(404).send("Car not found");
  }

  res.json(car[0]);
});


// create a new car
router.post('/', async (req, res)=>{
    const {make, model, year, color, price} = req.body;

    if(!make || !model || !year || !color || !price){
        return res.status(400).send('All fields are required..!');
    }

    const [newCar] = await db.insert(cars).values({
        make,
        model,
        year,
        color,
        price
    }).returning();


    res.status(201).json(newCar);
    
});

// update an existing car
router.put("/:id", async (req, res) => {
  const carId = Number(req.params.id);

  const { make, model, year, color, price } = req.body;

  if (!make || !model || !year || !color || !price) {
    return res.status(400).send("All fields are required..!");
  }

  const updatedCar = await db
    .update(cars)
    .set({
      make,
      model,
      year,
      color,
      price,
    })
    .where(eq(cars.id, carId))
    .returning();

  if (updatedCar.length === 0) {
    return res.status(404).send("Car not found..!");
  }

  res.json(updatedCar[0]);
});

// delete an existing car
router.delete("/:id", async (req, res) => {
  const carId = Number(req.params.id);

  const deletedCar = await db
    .delete(cars)
    .where(eq(cars.id, carId))
    .returning();

  if (deletedCar.length === 0) {
    return res.status(404).send("Car not found..!");
  }

  res.send("Car deleted successfully..!");
});


// start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on the port: ${PORT}`);
});
