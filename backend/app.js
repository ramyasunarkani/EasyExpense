const express=require('express');
const db=require('./util/db-connection');
const app=express();
require('./models')
const userRoutes=require('./routes/userRoute');
const expenseRoutes=require('./routes/expensesRoutes')
const paymentRoutes = require('./routes/paymentRoutes'); 

const cors = require('cors');


app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send('app started');
})
app.use('/user',userRoutes);
app.use('/expenses',expenseRoutes)
app.use('/payment', paymentRoutes);


db.sync({force:true}).then(() => {

    
    app.listen(3000,()=>{
        console.log('app started at port 3000');
    })
    
}).catch((err) => {
    console.log('error in db sync',err)
    
});