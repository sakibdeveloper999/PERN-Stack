import express from 'express';

const app = express();
const PORT = 3000;
const router = express.Router();

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
