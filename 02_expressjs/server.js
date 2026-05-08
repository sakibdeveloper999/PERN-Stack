import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.send('Hello from the Car API..!');
});

app.get('api/v1/cars', (req, res)=>{
    res.send('Here you can find all the cars..!');
});

app.post('api/v1/cars', (req, res)=>{
    res.send('Here you can create a new car..!');
});

app.put('api/v1/cars/:id', (req, res)=>{
    res.send('Here you can update an existing car..!');
});

app.delete('api/v1/cars/:id', (req, res)=>{
    res.send('Here you can delete an existing car..!');
});

app.get('api/v1/cars/:id', (req, res)=>{
    res.send('Here you can find a specific car..!');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on the port: ${PORT}`);
});
