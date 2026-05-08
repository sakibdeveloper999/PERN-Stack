import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.send('You just built a server with Express.js');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on the port: ${PORT}`);
});
