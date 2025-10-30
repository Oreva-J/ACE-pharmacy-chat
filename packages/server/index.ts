import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 4000;

app.get('/api/health', (req,res)=>{
    res.json({message: "You are Healthy"})
})

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`Server running on http://localhost:${port}!!!`));
}


export default app;