require('dotenv').config({ quiet: true });

const express=require('express');
const db=require('./util/db-connection');
const app=express();
require('./models')
const userRoutes=require('./routes/userRoute');
const expenseRoutes=require('./routes/expensesRoutes')
const paymentRoutes = require('./routes/paymentRoutes'); 
const premiumRoutes=require('./routes/premiumRoutes');
const pasRoutes=require('./routes/passRoutes')
const cors = require('cors');


app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send('app started');
})
app.use('/user',userRoutes);
app.use('/expenses',expenseRoutes)
app.use('/payment', paymentRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',pasRoutes);


db.sync().then(() => {

    
    app.listen(process.env.PORT||3000,()=>{
        console.log('app started at port 3000');
    })
    
}).catch((err) => {
    console.log('error in db sync',err)
    
});