const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
const methodOverride = require('method-override')
app.use(methodOverride('_method'));
const http = require('http').createServer(app);
const { Server } = require("socket.io"); // socket.io
const io = new Server(http); // socket.io


require('dotenv').config()

const appRouter = require('./routes/app');
const loginRouter = require('./routes/loginRoute');
const socketRouter = require('./routes/socket')(io);





app.set('io',io) // router = > io
http.listen(process.env.PORT);

app.use('/', appRouter);

app.post('/chat',socketRouter);

app.use('/about', appRouter);

app.use('/qna',appRouter);

app.use('/newmodule/:id',appRouter);

app.get('/login',appRouter);

app.post('/login',loginRouter);

app.use('/sign_up',appRouter);

app.use('/scam',appRouter);

app.use('/best',appRouter);

app.use('/new',appRouter);

app.use('/poca',appRouter);

app.use('/poca/:middle',appRouter);

app.use('/pocadetail/:id',appRouter);

app.use('/bestLike',appRouter);

app.post('/add',loginRouter);

app.use('/search',appRouter);


app.use('/like',loginRouter);

app.use('/sign',appRouter);

app.post('/profile/delete',loginRouter);

app.get('/mypage',loginRouter);

app.get('/mypage/products',loginRouter);

app.get('/mypage/profile',loginRouter);

app.put('/mypage/profile/update',loginRouter);

app.get('/write',loginRouter);

app.get('/write/:id',loginRouter);

app.get('/detail/:id',loginRouter);

app.use('/detail/delete',loginRouter);

app.post('/comment',loginRouter);

app.get('/scam/add',loginRouter);

app.get('/pocawrite',loginRouter);

app.use('/login',loginRouter);

app.post('/addwirte',loginRouter);


