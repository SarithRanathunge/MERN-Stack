import React, {useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {name, email, password}
            );
            console.log(response);
        }catch(error){
            console.log(error);
        }
    };
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              onChange={(e)=>{setName(e.target.value)}}
              required
              className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              onChange={(e)=>{setEmail(e.target.value)}}
              required
              className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="*********"
              onChange={(e)=>{setPassword(e.target.value)}}
              required
              className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
          <p className='text-center'>
            Already Have Account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
