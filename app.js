const express = require('express');
const morgan = require('morgan')
const model = require('./models/user')
const dbConnection = require('./config/db')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('this is middleware');
  const a = 5;
  const b = 10;
  console.log(`The sum of ${a} and ${b} is ${a + b}`);
  return next();
});
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/result', (req, res) => {
  res.send('result is coming soon');
})
app.get('/register', (req, res) => {
  res.render('register')
})
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await model.create({
    username: username,
    email: email,
    password: password,
  })
  console.log(newUser);
  res.send('User Registered')
})
app.get('/get-users', (req, res) => {
  model.find().then((users) => {
    res.send(users)
  })
  })
app.get('/update-user',async(req,res)=>{
  await model.findOneAndUpdate({username:'purvanshu'},{email:'purvjindal@123'})
  res.send("user updated")
})  


app.post('/get-data', (req, res) => {
  console.log(req.body);
  res.send('data recieved')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});