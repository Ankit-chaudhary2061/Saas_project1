import { Request, Response } from 'express';

import User from '../../../database/models/userModel';
import bcrypt from "bcrypt"
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
        password: bcrypt.hashSync(password,12),
        email: email,
      });
      res.status(200).json({
        message: 'user registered sucessfully',
      });
    }
  }
}

// export {registerUser} yo chai function ko  lagi ho
export default AuthController;
