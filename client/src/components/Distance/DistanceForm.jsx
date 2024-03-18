import React from 'react';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';

const DistanceForm = ({ data, formData, setFormData }) => {
    const storage = getStorage(); // Get Firebase Storage reference

    // Function to handle file upload
    const handleFileUpload = (event, fieldName) => {
        const file = event.target.files[0]; // Get the uploaded file
        const fileName = new Date().getTime() + '-' + file.name; // Generate a unique file name
        const fileRef = ref(storage, fileName); // Create a reference to the storage location

        // Upload the file to Firebase Storage
        const uploadTask = uploadBytesResumable(fileRef, file);

        // Listen for state changes, errors, and completion of the upload
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Handle upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                // Handle upload error
                console.error('Upload error:', error);
            },
            () => {
                // Handle successful upload
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // Update the form data state with the download URL of the uploaded file
                    setFormData({ ...formData, [fieldName]: downloadURL });
                });
            }
        );
    };

    // Function to handle input field changes
    const handleInputChange = (event, fieldName) => {
        // Handle input change here
        setFormData({ ...formData, [fieldName]: event.target.value });
        console.log(`Field ${fieldName} changed value to:`, event.target.value);
        // Add your custom logic here
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (event, fieldName) => {
        // Handle checkbox change here
        console.log(`Field ${fieldName} changed checked state to:`, event.target.checked);
        setFormData({ ...formData, [fieldName]: event.target.checked });
        // Add your custom logic here
    };

    // Function to handle select field changes
    const handleSelectChange = (event, fieldName) => {
        // Handle select change here
        console.log(`Field ${fieldName} changed selected option to:`, event.target.value);
        setFormData({ ...formData, [fieldName]: event.target.value });
        // Add your custom logic here
    };

    // Function to render form fields based on field type
    const renderField = (field) => {
        switch (field?.type) {
            case 'text':
            case 'textarea':
            case 'date':
            case 'number':
                return (
                    <div className='flex flex-col' key={field?._id}>
                        <label className='font-bold' htmlFor={field?.name}>{field?.label} {field?.required ? '*' : ''} :</label>
                        <input
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type={field?.type}
                            id={field?.name}
                            name={field?.name}
                            required={field?.required}
                            onChange={(event) => handleInputChange(event, field?.name)}
                        />
                    </div>
                );
            case 'file':
                return (
                    <div className='flex flex-col' key={field?._id}>
                        <label className='font-bold' htmlFor={field?.name}>{field?.label} {field?.required ? '*' : ''} :</label>
                        <input
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type={field?.type}
                            id={field?.name}
                            name={field?.name}
                            required={field?.required}
                            onChange={(event) => handleFileUpload(event, field?.name)} // Call handleFileUpload for file fields
                        />
                    </div>
                );
            case 'checkbox':
                return (
                    <div key={field?._id}>
                        <input
                            className='flex flex-col'
                            type="checkbox"
                            id={field?.name}
                            name={field?.name}
                            required={field?.required}
                            onChange={(event) => handleCheckboxChange(event, field?.name)}
                        />
                        <label htmlFor={field?.name}>{field?.label}</label>
                    </div>
                );
            case 'select':
                return (
                    <div className='flex flex-col' key={field?._id}>
                        <label className='font-bold' htmlFor={field?.name}>{field?.label} :</label>
                        <select
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            id={field?.name}
                            name={field?.name}
                            required={field?.required}
                            onChange={(event) => handleSelectChange(event, field?.name)}
                        >
                            {field?.options?.map(option => (
                                <option key={option?._id} value={option?.value}>{option?.label}</option>
                            ))}
                        </select>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='p-2'>
            <h2 className='text-2xl font-bold'>{data?.categoryName}</h2>
            <form className='bg-gray-200 grid grid-cols-4 gap-5 p-4 m-6 rounded-sm'>
                {data?.fields?.map(field => renderField(field))}
            </form>
        </div>
    );
};

export default DistanceForm;
