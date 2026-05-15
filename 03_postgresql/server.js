import express from 'express';
import { db } from './db.js';
import { cars } from './schema.js';

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
})
// In-memory data store for cars
  

// view all cars
app.get('', (req, res)=>{
    res.send('Hello from the Car API..!');
});
// use the router for all routes starting with /api/v1/cars
app.use('/api/v1/cars', router);

router.get('/', async (req, res)=>{
    allCar = await db.select().from(cars);
    res.json(allCar);
});

// ====== CRUD operations for cars =======

// view a specific car
router.get('/:id', (req, res)=>{
    const carId = Number(req.params.id);
    const car = cars.find((car)=> car.id === carId);

    if(car){
        res.json(car); 
     }else{
        res.status(404).send('Car not found..!');
    }
  }
);


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
router.put('/:id', (req, res)=>{
    const carId = Number(req.params.id);
    const carIndex = cars.findIndex((car)=> car.id === carId);
    if(carIndex === -1){
        return res.status(404).send('Car not found..!');
    }
    const {make, model, year, color, price} = req.body;

    if(!make || !model || !year || !color || !price){
        return res.status(400).send('All fields are required..!');
    }
    const updatedCar = {
        id: carId, 
        make,
        model,
        year: parseInt(year),
        color,
        price: parseFloat(price)
    };
    cars[carIndex] = updatedCar;

    res.json(updatedCar);
    
});

// delete an existing car
router.delete('/:id', (req, res)=>{
    const carId = Number(req.params.id);
    const carIndex = cars.findIndex((car)=> car.id === carId);

    if(carIndex === -1){
        return res.status(404).send('Car not found..!');
    }

    cars.splice(carIndex, 1);
    res.send('Car deleted successfully..!');
});


// start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on the port: ${PORT}`);
});
