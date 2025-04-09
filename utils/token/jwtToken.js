
import jwt from 'jsonwebtoken';
const generateToken = ({_id,email,role}) => {
 
  
  
  return jwt.sign({ _id,email,role }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
}
export  {generateToken};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}
export {verifyToken};

