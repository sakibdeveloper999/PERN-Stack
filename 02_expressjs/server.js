import express from 'express';

const app = express();
const PORT = 3000;
const router = express.Router();

app.use(express.json());

let cars = [
    {id: 1, make: 'Toyota', model: 'Camry', year: 2020, color: 'Red', price: 25000},
    {id: 2, make: 'Honda', model: 'Civic', year: 2021, color: 'Blue', price: 22000},
    {id: 3, make: 'Ford', model: 'Mustang', year: 2019, color: 'Black', price: 30000},
    {id: 4, make: 'Chevrolet', model: 'Impala', year: 2018, color: 'White', price: 20000},
    {id: 5, make: 'Tesla', model: 'Model 3', year: 2022, color: 'Silver', price: 35000}
];  

// view all cars
app.get('/', (req, res)=>{
    res.send('Hello from the Car API..!');
});
// use the router for all routes starting with /api/v1/cars
app.use('/api/v1/cars', router);

router.get('/', (req, res)=>{
    res.json(cars);
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
router.post('/', (req, res)=>{
    const newCar = req.body;
    newCar.id = cars.length + 1; // assign a new id to the car
    cars.push(newCar);
    res.status(201).json(newCar);
    
});

// update an existing car
router.put('/:id', (req, res)=>{
    res.send('Here you can update an existing car..!');
});

// delete an existing car
router.delete('/:id', (req, res)=>{
    res.send('Here you can delete an existing car..!');
});


// start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on the port: ${PORT}`);
});
