import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '../components/UI/SnackBar';
import Logo from '../public/Images/Logo.png'
import Loader from '../components/Loader';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        setSnackbarOpen(true);
        setSnackbarMessage(error.message || 'Something went wrong');
        setSnackbarSeverity('error');
        return;
      }
      dispatch(signInSuccess(data));
      setSnackbarOpen(true);
      setSnackbarMessage('University added successfully!');
      setSnackbarSeverity('success');
      setTimeout(()=>{
        
      },5000);
      // setTimeout(() => {
      //   navigate('/');
      //   console.log('Timeout completed');
      // }, 5000);
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className='bg-Login-image bg-cover bg-center flex justify-start items-center h-screen'>
    <div className='p-3 max-w-lg mx-auto flex justify-start  items-center h-screen float-left'>
      <Snackbar    
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}/>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[400px] float-right bg-white p-4 rounded-xl shadow-secondary-1 dark:bg-surface-dark dark:text-white'>
        <img className='w-[70px]' alt="Logo" src ={Logo}  />
        <spam className="font-bold text-2xl">Hello , Welcome back</spam>
        <spam className="font-bold text-sm">Login to your account</spam>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg border border-amber-500 focus:border-blue-500'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg border border-amber-500 focus:border-blue-500'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-amber-700 text-black font-bold p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? <Loader /> : 'Log-In'}
        </button>
       
      </form>
    
      <p className='text-red-700 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
    </div>
    </div>
  );
}
