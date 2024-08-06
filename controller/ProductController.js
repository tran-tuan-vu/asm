const Product = require('../models/Product');

exports.getList = async (req, res) => {
    try {
        var products = await Product.find();
        res.render('list', { data: products });
    } catch (error) {
        console.log(error);
    }
}

exports.create = (req, res) => {
    res.render('create');
}
exports.home = (req,res)=>{
    res.render('home');
}

exports.save = async (req, res) => {
    try {
        var newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        }
        var product = await Product.create(newProduct);
        if (product) {
            console.log('create success');
            res.redirect('/list');
        }
    } catch (err) {
        console.log(err);
    }
}

exports.edit = async (req, res) => {
    try {
        var product = await Product.findById(req.params.id);
        if (product) {
            res.render('edit', { product });
        } else {
            console.log('Không tìm thấy product tương ứng');
        }
    } catch (error) {
        console.log(error);
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.file) {
            var updateProduct = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            }
            var product = await Product.findByIdAndUpdate(
                req.params.id,
                updateProduct
            );
            if (product) {
                console.log('update success');
                res.redirect('/list');
            }
        } else {
            var updateProduct = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: req.file.filename
            }
            var product = await Product.findByIdAndUpdate(
                req.params.id,
                updateProduct
            );
            if (product) {
                console.log('update success');
                res.redirect('/list');
            }
        }
    } catch (err) {
        console.log(err);
    }
}

exports.detail = async (req, res) => {
    try {
        var detailProduct = await Product.findById(req.params.id);
        if (detailProduct) {
            res.render('detail', { detail: [detailProduct] });
        } else {
            console.log('Không tìm thấy product tương ứng');
        }
    } catch (error) {
        console.log(error);
    }
}

exports.delete = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/list');
    } catch (error) {
        console.log(error);
    }
}

//API
exports.apiGetList = async(req, res) =>{
    try {
        var products = await Product.find();
        res.status(200).json({data: products});
    } catch {
        res.status(400).json({ message: 'Something went wrong'})
    }
}
exports.apiDetail = async(req, res) =>{
    try {
        var product = await Product.findById(req.params.id);
        res.status(200).json({data: product});
    } catch {
        res.status(400).json({ message: 'Something went wrong'})
    }
}
exports.apiCreate = async(req,res) =>{
    try {
        //Lấy data người dùng nhập vào form
        var newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        }
        //lưu data vào db
        var product = await Product.create(newProduct);
        if (product) {
            console.log('create success');
            res.json(product);
        }
    } catch (err) {
        console.log(err);
    }
}
exports.apiDelete = async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({message:'delete done'});
    } catch (error) {
        console.log(error);
    }
}
exports.apiUpdate = async (req,res) =>{
    try {
        //Lấy data người dùng nhập vào form
        var updateProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        }
        //lưu data vào db
        var product = await Product.findByIdAndUpdate(
            req.params.id,
            updateProduct
        );
        if (product) {
            console.log('update success');
            res.json(product);
        }
    } catch (err) {
        console.log(err);
    }
}