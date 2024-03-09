import React, { useEffect, useRef, useState } from 'react'

import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
  import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default  function AdminUniAdd() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    useEffect(() => {
        if (image) {
          handleFileUpload(image);
        }
      }, [image]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePercent(Math.round(progress));
          },
          (error) => {
            setImageError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
              setFormData({ ...formData, UniLogo: downloadURL })
            );
          }
        );
      };
      const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("i am hit")
            try {
            setLoading(true);
            setError(false);
            const res = await fetch('/api/admin/university/create', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            setLoading(false);
            if (data.success === false) {
                setError(true);
                return;
            }
            navigate('/admin/university');
            } catch (error) {
            setLoading(false);
            setError(true);
            }

      }

  return (
    <div className="PageContainer" >
        <div className='mb-10'>
           <span>University Onboarding System </span>
        </div>
        <form class="w-full max-w-lg" onSubmit={handleSubmit}>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    University Name
                    </label>
                    <input 
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="universityName"
                        type="text" 
                        placeholder="Jane"
                        onChange={handleChange}
                      />
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Short Name
                    </label>
                    <input 
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="univserityShortName" 
                    type="text" 
                    placeholder="Doe"
                    onChange={handleChange}
                    />
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Vertical
                    </label>
                    <input 
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="vertical" 
                        type="text"
                        placeholder="Doe"
                        onChange={handleChange}
                     />
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Address
                    </label>
                    <input 
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="addresss" 
                        type="text" 
                        
                        placeholder="Doe"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Dealing with
                </label>
                <input 
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    d="DealingWith"
                     type="text" 
                     placeholder=""
                     onChange={handleChange}
                     
                     />
                
                </div>
            </div>
            <div class="flex items-center space-x-6 justify-center">
               
                <label class="flex flex-row align-middle justify-items-center items-center">
                    <img
                        src={formData.UniLogo || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                        alt='profile'
                        className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
                        onClick={() => fileRef.current.click()}
                        />
                        <p className='text-sm self-center'>
                            {imageError ? (
                                <span className='text-red-700'>
                                Error uploading image (file size must be less than 2 MB)
                                </span>
                            ) : imagePercent > 0 && imagePercent < 100 ? (
                                <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
                            ) : imagePercent === 100 ? (
                                <span className='text-green-700'>Image uploaded successfully</span>
                            ) : (
                                ''
                            )}
                        </p>
                    <input type="file" class="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    "
                    id='UniLogo'
                    ref={fileRef}
                    hidden
                    accept='image/*'
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
            </div>
            <div className='flex align-middle justify-between mt-7'>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  >RESET</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  type='submit' >SUBMIT</button>
            </div>
          
            
        </form>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  )
}

