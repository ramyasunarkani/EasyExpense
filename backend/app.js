const express=require('express');
const db=require('./util/db-connection');
const app=express();
const userModel=require('./models/userModel')
const expensesModel=require('./models/expenseModel')
const userRoutes=require('./routes/userRoute');
const cors = require('cors');


app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send('app started');
})
app.use('/user',userRoutes);

db.sync().then(() => {

    
    app.listen(3000,()=>{
        console.log('app started at port 3000');
    })
    
}).catch((err) => {
    console.log('error in db sync',err)
    
});