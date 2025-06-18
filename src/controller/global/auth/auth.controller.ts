import { Request, Response } from 'express';

import User from '../../../database/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// const registerUser = async(req: Request, res: Response) => { // const username = req.body.username;
//   // const password = req.body.password;
//   // const email = req.body.email;
//   const {username,password,email} = req.body
//   if(!username|| !password|| !email){
//     res.status(400).json({
// message:"please provide me username, password, email"
//     })
//   }else{
//    await User.create({
//       username: username,
//       password: password,
//       email: email,

//     })
//     res.status(200).json({
//       message : 'user registered sucessfully'
//     })
//   }

//   };

class AuthController {
  static async registerUser(req: Request, res: Response) {
    console.log('🔥 req.body:', req.body);
    if (req.body == undefined) {
      console.log('trigired');
      res.status(400).json({
        message: 'no data was sent',
      });
      return;
    }
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({
        message: 'please provide me username, password, email',
      });
    } else {
      await User.create({
        username: username,
        password: bcrypt.hashSync(password, 12),
        email: email,
      });
      res.status(200).json({
        message: 'user registered sucessfully',
      });
    }
  }
  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: 'please provide email and password',
      });
      return;
    }

    const data = await User.findAll({
      where: { email },
    });

    if (data.length === 0) {
      res.status(400).json({
        message: 'User not registered',
      });
      return;
    }

    const isPasswordMatch = bcrypt.compareSync(password, data[0].password);
    if (isPasswordMatch) {
      const token = jwt.sign(
        { id: data[0].id },
        'thisissecreatehai', // ⚠️ Move this to .env
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token: token,
      });
    } else {
      res.status(400).json({
        message: 'Invalid email or password',
      });
    }
  }
}

// export {registerUser} yo chai function ko  lagi ho
export default AuthController;
