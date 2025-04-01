import React, { useContext, useState } from 'react'
import AuthLayout from "../../components/layout/AuthLayout"
import { useNavigate } from 'react-router-dom';
import AuthInput from '../../components/input/AuthInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
// import axios from 'axios';
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    const {updateUser} = useContext(UserContext)
    const navigate = useNavigate();

    // Handel Login from Submit 
    const handelLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Plase enter a valid Email Address");
            return;
        }
        if (!password) {
            setError("Plase enter the password");
            return;
        }
        setError("");

        //Ligin API
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;
            if (token) {
                // console.log({ token, user });
                localStorage.setItem("token",token);
                updateUser(user)
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            }else{
                setError("something went wrong. Please try again.");
            }
        }
    };
    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Please enter your details to log in
                </p>
                <form onSubmit={handelLogin}>
                    <AuthInput
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="example@gmail.com"
                        type="text"
                    />
                    <AuthInput
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="password"
                        placeholder="Min 8 Characters"
                        type="password"
                    />

                    {error && <p className='text-red-500 text-xs  pb-2.5'>{error}</p>}

                    <button type="submin" className='btn-primary'>
                        LOGIN
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Don't have an account?{""}

                        <Link className='font-medium text-primary underline' to="/signup">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default LoginForm
