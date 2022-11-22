const express=require('express')
const app=express();
const PORT=process.env.PORT||3500;
require('dotenv').config()
const mongoose=require('mongoose')
const connect_db=require('./config/connect_db')
const register_route=require('./routes/authetication/register_route')
const verify=require('./middleware/verify_token')
const cookieparser=require('cookie-parser')

app.use(express.json());

connect_db()
//middle ware for cookies
app.use(cookieparser())
//routes


app.use('/register',register_route)
app.use('/login',require('./routes/authetication/login_route.js'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/authetication/logout_route'))
app.use(verify)
app.use('/customer',require('./routes/api/enhet_post_detail'))

mongoose.connection.once('open',()=>{
    console.log('connected to mongodb');
    app.listen(PORT,()=>console.log('server running'))

})