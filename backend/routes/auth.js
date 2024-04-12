import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';

import User from '../models/registration.js';

router.post('/Register', async (req, res) => {
    try {
        const { UserName, Mobile, Email, Password, ConfirmPassword } = req.body;  
        console.log(req.body);      

        if (!UserName || !Mobile || !Email || !Password || !ConfirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (Password !== ConfirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password do not match' });
        }

        const hashedPwd = await bcrypt.hash(Password, 10);
        const newUser = { UserName, Mobile, Email, Password: hashedPwd, ConfirmPassword: hashedPwd };

        const user = await User.create(newUser);
        res.status(200).json(user);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/Login", async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });

        if (!user || !(await bcrypt.compare(req.body.Password, user.Password))) {
            return res.status(400).json({ error: 'Wrong Credentials' });
        }

        const { Password,ConfirmPassword, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default  router;
