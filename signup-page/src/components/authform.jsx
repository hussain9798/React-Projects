import React, { useState } from 'react'
import './authform.css'

const authform = () => {
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({})

    const toggleMode = () => {
        setIsSignup(!isSignup);
        setFormData({name: "", email: "", password: "", confirmPassword: ""})
        setError({})
    }

    const validate = () => {
        const newErrors = {}

        if(isSignup && !formData.name.trim()) newErrors.name = "Name id required"
        if(!formData.email.includes("@gmail.com")) newErrors.email = "email is invalid"
        if(formData.password.length < 8) newErrors.password = "password must be 8 characters"
        if(isSignup && formData.password !== formData.confirmPassword) newErrors.confirmPassword = "password do not match"

        return newErrors


    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validate();
        setError(validationError);

        if(Object.keys(validationError).length === 0) {
            alert (
                isSignup ? "Signup sccessfully 🎉"
                : "Login success"
            );
        }
    };

  return (
    <div className={`auth-container ${isSignup ? "active" : ""}`}>
        <div className='form-box login-box'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                name='email'
                value={formData.email}
                placeholder='Enter emailId'
                onChange={handleChange}
                 />
                {error.email && <p className='error'>{error.email}</p> }

                <input 
                type="password"
                name='password'
                value={formData.password}
                placeholder='Enter password'
                onChange={handleChange}
                 />
                {error.password && <p className='error'>{error.password}</p> }

                <button type='submit'>Login</button>
                <p>
                    Don't have account? {" "}
                    <span onClick={toggleMode}>SignUp</span>
                </p>
                
            </form>
        </div>

        <div className=' form-box signup-box'>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <input type="text"
                name='name'
                value={formData.name}
                placeholder='Full Name'
                onChange={handleChange}
                 />
                {error.name && <p className='error'>{error.name} </p> }

                <input type="email"
                name='email'
                value={formData.email}
                placeholder='Enter your email'
                onChange={handleChange}
                 />
                {error.email && <p className='error'>{error.email}</p> }

                <input 
                type="password"
                name='password'
                value={formData.password}
                placeholder='create password'
                onChange={handleChange} />
                {error.password && <p className='error'>{error.password}</p> }

                <input type="password"
                name='confirmPassword'
                value={formData.confirmPassword}
                placeholder='re-create password'
                onChange={handleChange} />
                {error.confirmPassword && <p className='error'>{error.confirmPassword}</p> }
                
                <button type='submit'>SignUp</button>
                <p>
                    Already hanve an Account? {" "}
                    <span onClick={toggleMode}>Login</span>
                </p>
            </form>

        </div>
    </div>
  )
}

export default authform