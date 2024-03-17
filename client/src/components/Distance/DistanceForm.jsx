import React from 'react';

const DistanceForm = ({ data }) => {
    const handleInputChange = (event, fieldName) => {
        // Handle input change here
        console.log(`Field ${fieldName} changed value to:`, event.target.value);
        // Add your custom logic here
    };

    const handleCheckboxChange = (event, fieldName) => {
        // Handle checkbox change here
        console.log(`Field ${fieldName} changed checked state to:`, event.target.checked);
        // Add your custom logic here
    };

    const handleSelectChange = (event, fieldName) => {
        // Handle select change here
        console.log(`Field ${fieldName} changed selected option to:`, event.target.value);
        // Add your custom logic here
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'text':
            case 'textarea':
            case 'date':
            case 'file':
            case 'image':
            case 'number':
                return (
                    <div className='flex flex-col' key={field._id}>
                        <label className='font-bold' htmlFor={field.name}>{field.label} {field.required ? <>*</>:<></>} :</label>
                        <input 
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                            type={field.type} 
                            id={field.name} 
                            name={field.name} 
                            required={field.required} 
                            onChange={(event) => handleInputChange(event, field.name)}
                        />
                    </div>
                );
            case 'checkbox':
                return (
                    <div key={field._id}>
                        <input 
                            className='flex flex-col'
                            type="checkbox" 
                            id={field.name} 
                            name={field.name} 
                            required={field.required} 
                            onChange={(event) => handleCheckboxChange(event, field.name)}
                        />
                        <label htmlFor={field.name}>{field.label}</label>
                    </div>
                );
            case 'select':
                return (
                    <div  className='flex flex-col' key={field._id}>
                        <label className='font-bold' htmlFor={field.name}>{field.label} : </label>
                        <select 
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                            id={field.name} 
                            name={field.name} 
                            required={field.required}
                            onChange={(event) => handleSelectChange(event, field.name)}
                        >
                            {field.options.map(option => (
                                <option key={option._id} value={option.value}>{option.label}</option>
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
            <h2 className='text-2xl font-bold'>{data.categoryName}</h2>
            <form className='bg-gray-200  grid grid-cols-4 gap-5 p-4 m-6 rounded-sm'>
                {data.fields.map(field => renderField(field))}
            </form>
           
        </div>
    );
};

export default DistanceForm;
