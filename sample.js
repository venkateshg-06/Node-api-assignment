const express = require("express")
const User = require("./models/productModel")
const app = express();
const axios = require("axios")
const mongoose = require("mongoose")
app.use(express.json())

mongoose.connect("mongodb+srv://venkateshgolla134:Venki%4012345@venkateshapi.tyykj4w.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connected to mongoose")
    app.listen(3000, ()=> {
        console.log("server running ar server http://localhost:3000")
    });
}).catch((e) => {
    console.log(e.message)
})


app.post("/api/users/" ,  async (req, res) => {
        try {
            const existingUser = await User.findOne({ user_id: req.body.user_id });
            if (existingUser !== null){
                try {
                    const {user_id} = req.body
                    
                    const data = req.body
                    const user = await User.findByIdAndUpdate(user_id, data)
                    res.status(200).json(user)
                }catch(e){
                    res.send({message: e.message})
                }
               
                
            }
            else {
                try {
                    let user = await User.create(req.body)
                res.send("new User created succesfully")
                }catch(e){
                    res.send(`DB Error ${e.message}`)
                }
               
            }
        }
        catch(e){
            res.send(400).json({message:e.message})
            console.log(e)
        }
})

app.get('/api/users/:user_id/', async (req, res) => {

    try {
      const user = await User.findOne({ user_id: req.params.user_id });
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

