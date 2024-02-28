import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { config } from "dotenv";

config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();


export async function SignUpUser(userData) {
  
  const existingUser = await pool.query(
    "SELECT * FROM Users WHERE UserName = ? OR Email = ?",
    [userData.UserName,userData.Email]
  );
  if (existingUser[0].length > 0) {
    return {status:-1,message:"Username/Email is already taken. Please choose a different one."};
  }
  // console.log("This is userPassword",userData.Password);
  let hashedPass = await bcrypt.hash(userData.Password, 10);

  const [row] = await pool.query(
    "INSERT INTO Users (Name, UserName,Password, PhoneNo, Email, Address) VALUES  (?, ?,  ?, ?, ?, ?)",
    [
      userData.Name,
      userData.UserName,
      hashedPass,
      userData.PhoneNo,
      userData.Email,
      userData.Address
    ]
  );
  // const result = await getUser(row.insertId);
  return {status:1,message:"SignUp Successfull!"};
}

export async function getUser(id) {
  const [row] = await pool.query("SELECT * FROM Users WHERE UserID =?", [id]);
  return row[0];
}

export async function checkLoginUser(UserName, GivenPassword) {
  let sql = "SELECT * FROM Users WHERE UserName = ?";
  let data = [UserName];
  const [row] = await pool.query(sql, data);
  if (row.length == 0) {
    return {
      status: 0,
      content: "User Does not exist",
    };
  }
  let checkPassword = await bcrypt.compare(GivenPassword, row[0].Password);
  if (checkPassword) {
    // console.log("User Verified");
    const data = {
      user: {
        id: row[0].UserID,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    console.log(process.env.DB_HOST);
    return {
      status: 1,
      userID: row[0].UserID,
      content: "User Verified",
      authToken: authToken,
    };
  } else {
    return {
      status: -1,
      content: "User Password are incorrect!",
    };
  }
}

export async function UploadImages(ImageSrc,UserID) {
  try{
    const [row] = await pool.query("INSERT INTO Images (ImageSrc, UserID) VALUES (?, ?)", [ImageSrc, UserID]);
    return row[0];
  }
  catch (error){
    return -1;
  }
  
}

export async function VerifyToken(token) {
  if(!token) return res.status(400).json({ error: 'Token is missing' });
  try {
    // Verify the token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const userID = decoded.user.id;
    // console.log("UserID should be ",userID);
    // If verification successful, you can perform additional actions here
    // For example, you can check the user's role, permissions, etc.
    // console.log('Token verification successful');
    return { status:200,message: 'Token verified successfully',userID:userID };
  } catch (error) {
    console.error('Token verification failed:', error);
    return {status:401, error: 'Token verification failed' };
  }
  
}
