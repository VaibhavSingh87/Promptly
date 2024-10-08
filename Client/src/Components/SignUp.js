import { React, useState } from 'react'
import { motion } from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'; 
const Signup = ({formType, setFormType}) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    try{
      const details = {
        username: username,
        email: email,
        password: password
      };
      
      setEmail('');setPassword('');setUsername('');
  
      const response = await fetch('http://localhost:3030/user/register',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(details),
        });
  
        const data = await response.json();
  
        if(data.status === 'ok'){
          localStorage.removeItem('token');
          localStorage.setItem('token', data.user);
          toast.success(data.message);
          setTimeout(() => {
            navigate('/explore');
          }, 3000); 
        }else{
          toast(data.message);
        }
    }
    catch(err){
      toast.error("ERROR!!!");
    }
  }
  
  function toggleForm(){
        setFormType(!formType);
    }

  return (
    <motion.div
          className="w-full md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.form
            className="w-3/4 md:w-2/3 lg:w-1/2 bg-transparent rounded-lg p-6 shadow-lg border border-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            onSubmit={handleSubmit}
          >
            <motion.h3
              className="text-3xl mb-6 text-center text-white font-bold py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Register
            </motion.h3>
            <motion.input
              type="text"
              placeholder="Username"
              className="mb-4 p-2 block w-full bg-transparent text-white rounded border-0 border-b-2 border-gray-600 focus:outline-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}
            />
              <motion.input
              type="email"
              placeholder="Email"
              className="mb-4 p-2 block w-full bg-transparent text-white rounded border-0 border-b-2 border-gray-600 focus:outline-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
              <motion.input
              type="password"
              placeholder="Password"
              className="mb-8 p-2 block w-full bg-transparent text-white rounded border-0 border-b-2 border-gray-600 focus:outline-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.button
                type="submit"
                className="text-white py-3 px-5 rounded border-2 border-transparent"
                style={{
                  backgroundColor: '#1A1A2E',
                }}
                whileHover={{
                  backgroundColor: 'transparent',
                  // borderColor: 'white',
                  // borderWidth: '0.25px',
                }}
               
              >
                Sign Up
              </motion.button>
            </motion.div>
            <motion.p
              className="text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              Already have an account? <span onClick={toggleForm} className="text-white underline cursor-pointer">Sign In</span>
            </motion.p>
          </motion.form>
          <Toaster
        toastOptions={{
          className: '',
          style: {
            background: 'rgba(201, 174, 243, 1)',
            color: 'black',
            fontWeight: 600,
          },
        }}
      />
        </motion.div>
  )
}

export default Signup