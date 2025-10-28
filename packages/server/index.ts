import express from "express";

const app = express();
app.use(express.json());


const port = process.env.PORT || 4000;

app.get('/api/health', (req,res)=>{
    res.json({message: "You are Healthy"})
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});


