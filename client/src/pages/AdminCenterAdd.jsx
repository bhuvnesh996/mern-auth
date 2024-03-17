import React, { useEffect, useRef, useState } from 'react'
import Pincode from 'react-pincode';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
  import { app } from '../firebase';
import { createCenter, resetCreate } from '../redux/center/centerSlice';
import Snackbar from '../components/UI/SnackBar';
export default function AdminCenterAdd() {
    const {createStatus} =  useSelector(state =>state.center)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [pincodeData, setPincodeData] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [OwnerName, setOwnerName] = useState('');
    const [OwnerFatherName, setOwnerFatherName] = useState('');
    const [InstitutionName, setInstitutionName] = useState('');
    const [ContactNumber, setContactNumber] = useState('');
    const [WhatsAppNumber, setWhatsAppNumber] = useState('');
    const [CenterCode, setCenterCode] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [state,setState] = useState('');
    const [username,setUsername] = useState('')
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
   
    const [address, setAddress] = useState('');
    const adharFRef = useRef(null);
    const adharBRef = useRef(null);
    const PanCardRef = useRef(null);
    const ProfilePhotoRef = useRef(null);
    const VistOfficeRef = useRef(null);
    const [FrontAdhar,setFrontAdhar] = useState(undefined)
    const [BackAdhar,setBackAdhar] = useState(undefined)
    const [PanCard,setPanCardImage] = useState(undefined)
    const [ProfilePhoto,setProfilePhoto] = useState(undefined)
    const [VistOffice,setVistOffice] = useState(undefined)
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
  };
    useEffect(() => {
        if(createStatus===200){ 
         
            setSnackbarOpen(true);
            setSnackbarMessage('Center added successfully!');
            setSnackbarSeverity('success');
      
            setTimeout(()=>{

                navigate('/admin/center')
            },5000)
          dispatch(resetCreate())
        }
        if (FrontAdhar) {
          handleFileUpload(FrontAdhar,'FrontAdhar');
        }
        if (BackAdhar) {
            handleFileUpload(BackAdhar,'BackAdhar');
          }
          if (PanCard) {
            handleFileUpload(PanCard,'PanCard');
          }
          if (ProfilePhoto) {
            handleFileUpload(ProfilePhoto,'ProfilePhoto');
          }
          if (VistOffice) {
            handleFileUpload(VistOffice,'VistOffice');
          }
      }, [FrontAdhar,BackAdhar,PanCard,ProfilePhoto,VistOffice,createStatus]);
      const handleFileUpload = async (image,imageName) => {
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                switch (imageName) {
                    case 'FrontAdhar':
                    setFrontAdhar(downloadURL);
                    break;
                    case 'BackAdhar':
                    setBackAdhar(downloadURL);
                    break;
                    case 'PanCard':
                    setPanCardImage(downloadURL);
                    break;
                    case 'ProfilePhoto':
                    setProfilePhoto(downloadURL);
                    break;
                    case 'VistOffice':
                    setVistOffice(downloadURL);
                    break;
                    default:
                    break;
                }
          });
          }
        );
      };
    
      const handleUserNameChange = (e)=>{
        setUsername(e.target.value)
      }
    const handleOwnerNameChange = (e) => {
        setOwnerName(e.target.value);
      };
    
      const handleOwnerFatherNameChange = (e) => {
        setOwnerFatherName(e.target.value);
      };
    
      const handleInstitutionNameChange = (e) => {
        setInstitutionName(e.target.value);
      };
    
      const handleContactNumberChange = (e) => {
        setContactNumber(e.target.value);
      };
    
      const handleWhatsAppNumberChange = (e) => {
        setWhatsAppNumber(e.target.value);
      };
    
      const handleCenterCodeChange = (e) => {
        setCenterCode(e.target.value);
      };
    
      const handleDateOfBirthChange = (e) => {
        setDateOfBirth(e.target.value);
      };
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
      const handleCityChange = (e) => {
        setCity(e.target.value);
      };
      const handlePincodeChange = (data) =>{
        console.log("pincodedaa",data)
        console.log("MY PINCODE",data.pincode)
        setPincodeData(data.pincode)
        setCity(data.city)
        setState(data.stateName)
        
      }

      const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
      };
    
      const handleAddressChange = (e) => {
        setAddress(e.target.value);
      };
    function handleSubmit(e){
        e.preventDefault()
            const data = {
                zipCode : pincodeData,
                DateOfBirth: startDate,
                OwnerName: OwnerName,
                OwnerFatherName: OwnerFatherName,
                InstitutionName: InstitutionName,
                ContactNumber: ContactNumber,
                WhatsAppNumber: WhatsAppNumber,
                CenterCode: CenterCode,
                address:address,
                email: email,
                password: password,
                username:username,
                city: city,
                state: state,
                FrontAdhar:FrontAdhar,
                BackAdhar:BackAdhar,
                PanCard:PanCard,
                ProfilePhoto:ProfilePhoto,
                VistOffice:VistOffice
              };
        console.log("data",data)
        dispatch(createCenter(data))
    }
    console.log("check",pincodeData)

  return (
    <div className="PageContainer"> 
    <span className='text-3xl font-bold'>ON-BOARD CENTER </span>
    <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        <form class="w-full max-w-screen-lg mt-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-4" onSubmit={handleSubmit}>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Owner Name
                    </label>
                    <input onChange={handleOwnerNameChange} value ={OwnerName} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Owner Father Name
                    </label>
                    <input onChange={handleOwnerFatherNameChange} value={OwnerFatherName}class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Insitution Name
                    </label>
                    <input onChange={handleInstitutionNameChange} value = {InstitutionName} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Contact Number
                    </label>
                    <input onChange={handleContactNumberChange} value ={ContactNumber} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Whatapp Number
                    </label>
                    <input onChange={handleWhatsAppNumberChange} value = {WhatsAppNumber} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Center Code
                    </label>
                    <input onChange={handleCenterCodeChange} value={CenterCode} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Date of Birth
                    </label>
                    <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                       < DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Username
                    </label>
                    <input
                    onChange={handleUserNameChange} 
                    value={username} 
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                    
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        EMAIL*
                    </label>
                    <input onChange={handleEmailChange} value={email} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="example@gmail.com"/>
                   
                </div>
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Password
                    </label>
                    <input onChange={handlePasswordChange} value={password} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                    <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        <span>City</span>
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" value={city} onChange={e=>setCity(e.target.value)} />
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        <span>State</span>
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" value={state} onChange ={e=>setState(e.target.value)}/>
                </div>
          
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                        Zip
                    </label>
                    <div className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                        <Pincode  className="mt-20"
                        invalidError="Please check pincode"
                        lengthError="check length"
                        getData={(data) => handlePincodeChange(data)}
                        showArea ={false}
                        showDistrict = {false}
                        showCity = {false}
                        showState = {false}
                        
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Address
                    </label>
                    <input value={address} onChange={handleAddressChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="textbox" placeholder="example@gmail.com"/>
              </div>     
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                
                    <div class="flex items-center space-x-6">
                        <div class="shrink-0">
                            <img 
                            class="h-12 w-12 object-cover rounded-full"
                            src={FrontAdhar}
                            alt="Current adhar front photo" 
                            onClick={() => adharFRef.current.click()} />
                        </div>
                        <label class="block">
                            Front of Adhar Card
                            <span class="sr-only">Chose front of adhar</span>
                            <input
                              type='file'
                              ref={adharFRef}
                              hidden
                              accept='image/*'
                              onChange={(e) => setFrontAdhar(e.target.files[0])}
                            class="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                            "/>
                        </label>
                    </div>
                    <div class="flex items-center space-x-6">
                            <div class="shrink-0">
                                <img 
                                class="h-12 w-12 object-cover rounded-full" 
                                
                                src={BackAdhar}
                                alt="Current adhar front photo" 
                                onClick={() => adharBRef.current.click()} 
                                
                                />
                            </div>
                            <label class="block">
                                Back of Adhar Card
                                <span class="sr-only">Choose profile photo</span>
                                <input 
                                 type='file'
                                 ref={adharBRef}
                                 hidden
                                 accept='image/*'
                                 onChange={(e) => setBackAdhar(e.target.files[0])}
                                
                                class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                                "/>
                            </label>
                    </div>
                    <div class="flex items-center space-x-6">
                            <div class="shrink-0">
                                <img
                                 class="h-12 w-12 object-cover rounded-full" 
                                 
                                 src={PanCard}
                                 alt="Current adhar back photo" 
                                 onClick={() => PanCardRef.current.click()} 
                              />
                            </div>
                            <label class="block">
                                PAN CARD
                                <span class="sr-only">Choose profile photo</span>
                                <input
            
                                type='file'
                                ref={PanCardRef}
                                hidden
                                accept='image/*'
                                onChange={(e) => setPanCardImage(e.target.files[0])} 
                                class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                                "/>
                            </label>
                    </div>
                    <div class="flex items-center space-x-6">
                            <div class="shrink-0">
                                <img 
                                class="h-12 w-12 object-cover rounded-full" 
                                src={ProfilePhoto}
                                alt="Current Profile photo" 
                                onClick={() => ProfilePhotoRef.current.click()} 
                               
                                />
                            </div>
                            <label class="block">
                                OWNER PHOTO
                                <span class="sr-only">Choose profile photo</span>
                                <input type="file" 
                                  ref={ProfilePhotoRef}
                                  hidden
                                  accept='image/*'
                                  onChange={(e) => setProfilePhoto(e.target.files[0])} 
                                class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                                "/>
                            </label>
                    </div>
                    <div class="flex items-center space-x-6">
                            <div class="shrink-0">
                                <img class="h-12 w-12 object-cover rounded-full" 
                                 src={VistOffice}
                                 alt="Current Profile photo" 
                                 onClick={() => VistOfficeRef.current.click()} 
                                />
                            </div>
                            <label class="block">
                                VISITING CARD/OFFICE PHOTO
                                <span class="sr-only">Choose profile photo</span>
                                <input 
                               
                                type='file'
                                ref={VistOfficeRef}
                                hidden
                                accept='image/*'
                                onChange={(e) => setVistOffice(e.target.files[0])}  
                                class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                                "/>
                            </label>
                    </div>
                
                </div>
            <div className='flex flex-row justify-between mb-6 mt-10'>
                <button  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">RESET</button>
                <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">SUBMIT</button>
            </div>        
        </form>
    </div>
  )
}
 