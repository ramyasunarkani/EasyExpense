const Sequilize=require('sequelize');


const connection= new Sequilize('expensetracker','root','root',{
    host:"localhost",
    dialect:'mysql'
})


module.exports = connection;
