const express = require('express')
const app = express();
const multer = require('multer');
const port = 3000;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');//tạo token
const AuthController = require('./controller/AuthController');
const ProductController = require('./controller/ProductController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: storage })

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/productshop')
    .then(result => {
        //router cho giao diện
        app.get('/list', ProductController.getList);
        app.get('/create', ProductController.create);
        app.post('/save', upload.single('image'), ProductController.save);
        app.get('/edit/:id', ProductController.edit);
        app.post('/update/:id', upload.single('image'), ProductController.update);
        app.get('/delete/:id', ProductController.delete);
        app.get('/detail/:id', ProductController.detail);
        app.get('/home', ProductController.home);

        //router cho API
        app.get('/products', ProductController.apiGetList);
        app.get('/products/:id', ProductController.apiDetail);
        app.post('/products', upload.single('image'), ProductController.apiCreate);
        app.delete('/products/:id', ProductController.apiDelete);
        app.put('/products/:id', upload.single('image'), ProductController.apiUpdate);
        app.get('/register', AuthController.register);
        app.get('/login', AuthController.login);

        //register/login
        app.post('/product/register', AuthController.register);
        app.post('/product/login', AuthController.login);

        app.listen(port, () => {
            console.log(`Ứng dụng đag chạy với port:${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    })

