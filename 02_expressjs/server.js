import express from 'express';

const app = express();
const PORT = 3000;
const router = express.Router();

let cars = [
    {id: 1, make: 'Toyota', model: 'Camry', year: 2020, color: 'Red', price: 25000},
    {id: 2, make: 'Honda', model: 'Civic', year: 2021, color: 'Blue', price: 22000},
    {id: 3, make: 'Ford', model: 'Mustang', year: 2019, color: 'Black', price: 30000},
    {id: 4, make: 'Chevrolet', model: 'Impala', year: 2018, color: 'White', price: 20000},
    {id: 5, make: 'Tesla', model: 'Model 3', year: 2022, color: 'Silver', price: 35000}
];  

app.get('/', (req, res)=>{
    res.send('Hello from the Car API..!');
});

router.get('/', (req, res)=>{
    res.send('Here you can find all the cars..!');
});

router.post('/', (req, res)=>{
    res.send('Here you can create a new car..!');
});

router.put('/:id', (req, res)=>{
    res.send('Here you can update an existing car..!');
});

router.delete('/:id', (req, res)=>{
    res.send('Here you can delete an existing car..!');
});

router.get('/:id', (req, res)=>{
    res.send('Here you can find a specific car..!');
});


app.use('/api/v1', router);

app.listen(PORT, ()=>{
    console.log(`Server is running on the port: ${PORT}`);
});
