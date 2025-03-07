
import React, { useState } from 'react'
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../../components/input/ProfilePhotoSelector';
import AuthInput from '../../components/input/AuthInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
function SignUpFrom() {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //Handle Sing Up from Submit
  const handleSignup = async (e) => {

    e.preventDefault();
    if (!fullName) {
      setError("Plase enter the fullName");
      return;
    }

    if (!validateEmail(email)) {
      setError("Plase enter a valid Email Address");
      return;
    }
    if (!username) {
      setError("Plase enter user name");
      return;
    }
    if (!password) {
      setError("Plase enter the password");
      return;
    }
    setError("");

    //sing up API
    try {

    } catch (error) {

    }
  }
  return (
    <AuthLayout>
      <div className='lg-w-[100] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today  by entring your details below.
        </p>
        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>

            <AuthInput
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Urvi"
              type="texts"
            />
            <AuthInput
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="urvi@example.com"
              type="text"
            />
            <AuthInput
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              label="Username"
              placeholder="@"
              type="text"
            />
            <AuthInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="password"
              placeholder="Min 8 Characters"
              type="password"
            />
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            CREATE ACCOUNT
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{""}

            <Link className='font-medium text-primary underline' to="/login">
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUpFrom
