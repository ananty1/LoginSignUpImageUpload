import express from 'express';
import multer from "multer";
import { config } from "dotenv";

config();
import {checkLoginUser,SignUpUser,UploadImages,VerifyToken} from '../database/database.js'
const router = express.Router();
import path from 'path';

router.get('/',(req,res)=>{
    return res.status(200).send('This is home page');
})

router.post("/login", async (req, res) => {
  // console.log("we have got body as ",req.body);
  try{
    
    const result = await checkLoginUser(req.body.username, req.body.password);
    // console.log("Eth result: ",result);
    return res.status(200).send(result);
  }
  catch(error){
    return res.status(500).send(error);
  }
});
router.post('/signup', async (req, res) => {
  try{
    const result = await SignUpUser(req.body);
    
    return res.status(200).send(result);
  }catch(error){
    return res.status(500).send("Internal server error",error);
  }
});


router.post('/verify', async (req, res) => {
  // console.log("wecame",req.body.token);
  try{
    const result = await VerifyToken(req.body.token);
    if(result.status===200){
      return res.status(200).send({message:result.message,userID: result.userID});
    }
    return res.status(401).send(result.error);
  } catch(error){
    return res.status(500).send("Internal server error",error);
  }
});

const storage = multer.diskStorage( {
  destination: (req,file,cb)=>{
    cb(null,'public/images')
  },
  filename: (req,file,cb)=>{
    cb(null,file.fieldname + '_' +Date.now() + path.extname(file.originalname));
  }
  
})

const upload = multer({
  storage:storage
})

router.post('/upload',upload.single("image"), async (req, res) => {
  try{
    const imgsrc = `${process.env.REACT_APP_URL}images/` + req.file.filename;
    var userID =req.body.userID
    const result = await UploadImages(imgsrc,userID);
    if(result===-1) return res.status(400).send("Bad Request");
    return res.status(200).send(result);
  }
  catch(error){
    return res.status(500).send("Internal Server Error");
  }
});


export default router;

