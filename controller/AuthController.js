const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');//tạo token

exports.register = async (req,res) =>{
    try {
        //lấy thông tin người dùng gửi lên
    const {email, username, password} = req.body;

    //kiểm tra đã tồn tại email người dùng đăng ký
    const existedEmail = await User.findOne({ email });
    if (existedEmail){
        return res.status(400).json({
            message: 'Email dã được sử dụng'
        })
    }
    //mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Lưu thông tin tài khoản vào db
    const newUser = User.create({
        username,
        email,
        password: hashedPassword
    });
    if(newUser){
        res.status(200).json({
            message: 'Đăng ký thành công'
        })
    }
    } catch (error) {
        console.log(error);
    }

}

exports.login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        //Kiểm tra có email trong hệ thống không
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message:'Email không tồn tại'});

        }
        //kiểm tra password
        const checkedPassword = await bcrypt.compare(password, user.password);
        if(!checkedPassword){
            return res.status(400).json({ message: 'Sai thông tin đăng nhập'});
        }
        //tạo token
        //jwt.sign(data, secretkey, {expiresIn: })
        //expiresIn: 60*60*24 | expiresIn: '1h' | '1d'
         const token = jwt.sign({}, 'wd18412', {expiresIn: 60*60*24});
         res.status(200).json({
            message: 'Đăng nhập thành công',
            token
         })
    } catch  {
        res.status(400).json({
            message: 'Something went wrong'
        });
    }
}