import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
const [formState, setFormState] = useState({ email: '', password: '' });
const [addUser] = useMutation(ADD_USER);


const handleFormSubmit = async (event) => {
event.preventDefault();
const mutationResponse = await addUser({
variables: {
email: formState.email,
password: formState.password,
firstName: formState.firstName,
lastName: formState.lastName,
linkedin: formState.linkedin,
github: formState.github,
userWebsite: formState.userWebsite,
},
});
const token = mutationResponse.data.addUser.token;
Auth.login(token);
};


const handleChange = (event) => {
const { name, value } = event.target;
setFormState({
...formState,
[name]: value,
});
};


return (
<div>

<div className="flex flex-col items-center justify-center h-screen background-darkBlue">
 
<div>
    <h1 className="font-bold text-7xl color-yellow flex items-center justify-center" >COHORT RETORT</h1>
    <p className="text-white text-lg flex items-center justify-center mb-6">Connect with your classmates</p>
  </div>

  <div className="container w-full max-w-md background-medBlue p-5 rounded-lg shrink-1">

      <form className="mt-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col mb-4">
              <input
              placeholder="First"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label className="text-white text-lg" htmlFor="firstName">First Name:</label>
          </div>
          <div className="flex flex-col mb-4">
              <input
              placeholder="Last"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
              />
               <label className="text-white text-lg" htmlFor="lastName">Last Name:</label>
          </div>
          <div className="flex flex-col mb-4">
          
              <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label className="text-white text-lg" htmlFor="email">Email:</label>
          </div>
          <div className="flex flex-col mb-4">
              <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label className="text-white text-lg" htmlFor="pwd">Password:</label>
          </div>
          <div className="flex flex-col mb-4">
              <input
              placeholder="Linkedin URL"
              name="url"
              type="url"
              id="url"
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label className="text-white text-lg" htmlFor="email">Linkedin URL</label>
          </div>
            <div className="flex flex-col mb-4">
              <input
              placeholder="Github URL"
              name="url"
              type="url"
              id="url"
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label className="text-white text-lg" htmlFor="email">Github URL</label>
          </div>
          <div className="flex flex-col mb-4">
              <input
              placeholder="Personal Website"
              name="url"
              type="url"
              id="url"
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
              />
              <label className="text-white text-lg" htmlFor="email">Personal Website</label>
          </div>
          <div className="flex justify-between items-center">
            <button className="bg-yellow-300 text-blue-900 py-2 px-4 rounded hover:background-medBlue" type="submit">Sign In</button>

            <button className="bg-blue-900 text-white py-2 px-4 rounded hover:color-yellow ml-4" to="/login" type="submit">Back</button>
          </div>
          <Link className="text-white text-lg flex flex-col items-center justify-center" to="/login"><a>Have an account?</a>Log In</Link>
          <div>
           
          </div>
      </form>
  </div>
</div>
</div>
);
}


export default Signup;
