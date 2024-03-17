import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUniversity } from '../redux/university/universitySlice';
import Loader from '../components/Loader';
import { formCreate } from '../redux/form/formSlice';
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { IconButton, Tooltip } from '@material-tailwind/react';
import { ConformPopUp } from '../components/UI/ConfirmPopup';

export default function AdminFormCreate() {
    const dispatch = useDispatch();
    const { University } = useSelector(state => state.university);
    const [Uni, setUni] = useState(null);
    const [categories, setCategories] = useState([]);

    const [open,setOpen] = useState(false)
    useEffect(() => {
        dispatch(getAllUniversity());
    }, [dispatch]);

    const handleChange = (categoryIndex, fieldIndex, key, value) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].fields[fieldIndex][key] = value;
        setCategories(updatedCategories);
    };

    const handleAddCategory = () => {
        setCategories([...categories, {categoryName : '', fields: [] }]);
    };

    const handleAddField = (categoryIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].fields.push({ label: '', type: 'text', name: '', required: false, options: [] });
        setCategories(updatedCategories);
    };

    const handleRemoveCategory = (categoryIndex) => {
        const updatedCategories = [...categories];
        updatedCategories.splice(categoryIndex, 1);
        setCategories(updatedCategories);
    };

    const handleRemoveField = (categoryIndex, fieldIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].fields.splice(fieldIndex, 1);
        setCategories(updatedCategories);
    };

    const handleAddOption = (categoryIndex, fieldIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].fields[fieldIndex].options.push({ label: '', value: '' });
        setCategories(updatedCategories);
    };

    const handleRemoveOption = (categoryIndex, fieldIndex, optionIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].fields[fieldIndex].options.splice(optionIndex, 1);
        setCategories(updatedCategories);
    };
    const handleOpen = event =>{
        event.preventDefault();
        setOpen(true);
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const handleSubmit = event => {
        event.preventDefault();
        const data = {
            id: Uni,
            categories: categories
        };
         dispatch(formCreate(data));
         handleClose()
        console.log("sending data", categories);
    };

    return (
        <div className='PageContainer'>
            <ConformPopUp open={open} onClose={handleClose} onConfirm={handleSubmit}  />
            <div className='text-5xl font-bold'>
                Create Form
            </div>
            <div className='my-5 p-2 w-[800px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
                <label className='text-sm font-bold'>Select University:</label>
                <select onChange={(e) => setUni(e.target.value)}>
                    {University ? University?.map((university, index) => {
                        return (
                            <option key={index} value={university._id} > {university?.universityName} - {university?.vertical}  </option>
                        )
                    }) : <Loader />}
                </select>
            </div>
            <div className='mt-5'>
                <form className='w-[800px] text-sm p-5 font-bold shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]' onSubmit={handleOpen}>
                    {categories.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <div className="text-xl font-bold mb-3 flex flex-row items-center">
                                <input
                                    type="text"
                                    value={category.categoryName}
                                    placeholder="Category Name"
                                    onChange={(e) => {
                                        const updatedCategories = [...categories];
                                        updatedCategories[categoryIndex].categoryName = e.target.value;
                                        setCategories(updatedCategories);
                                    }}
                                />
                                <MdDeleteForever className='text-cyan-500 text-xl ml-3' onClick={() => handleRemoveCategory(categoryIndex)}>Remove Category</MdDeleteForever>
                            </div>
                            {category.fields.map((field, fieldIndex) => (
                                <div key={fieldIndex}>
                                    <div className='flex flex-row items-center my-2 justify-between'>
                                        <label>Label:</label>
                                        <input
                                            className='border border-black rounded-sm'
                                            type="text"
                                            value={field.label}
                                            onChange={e => handleChange(categoryIndex, fieldIndex, 'label', e.target.value)}
                                        />
                                        <label>Type:</label>
                                        <select
                                            className='border border-black rounded-sm'
                                            value={field.type}
                                            onChange={e => handleChange(categoryIndex, fieldIndex, 'type', e.target.value)}
                                        >
                                            <option value="text">Text</option>
                                            <option value="textarea">Textarea</option>
                                            <option value="checkbox">Checkbox</option>
                                            <option value="dropdown">Dropdown</option>
                                            <option value="select">Select</option>
                                            <option value="date">Date</option>
                                            <option value="file">File</option>
                                            <option value="number">Number</option>
                                        </select>
                                        <label>Name:</label>
                                        <input
                                            className='border border-black rounded-sm'
                                            type="text"
                                            value={field.name}
                                            onChange={e => handleChange(categoryIndex, fieldIndex, 'name', e.target.value)}
                                        />
                                        <label>Required:</label>
                                        <input
                                            type="checkbox"
                                            checked={field.required}
                                            onChange={() => handleChange(categoryIndex, fieldIndex, 'required', !field.required)}
                                        />
                                        <MdDeleteForever className='text-cyan-500 text-xl' onClick={() => handleRemoveField(categoryIndex, fieldIndex)}>Remove</MdDeleteForever>
                                    </div>
                                    {field.type === 'select' && (
                                        <div>
                                            {field.options && field.options.map((option, optionIndex) => (
                                                <div className='flex flex-row items-center my-2 justify-between' key={optionIndex}>
                                                    <label>Label:</label>
                                                    <input
                                                        className='border border-black rounded-sm'
                                                        type="text"
                                                        value={option.label}
                                                        onChange={e => {
                                                            const updatedCategories = [...categories];
                                                            updatedCategories[categoryIndex].fields[fieldIndex].options[optionIndex].label = e.target.value;
                                                            setCategories(updatedCategories);
                                                        }}
                                                    />
                                                    <label>Value:</label>
                                                    <input
                                                        className='border border-black rounded-sm'
                                                        type="text"
                                                        value={option.value}
                                                        onChange={e => {
                                                            const updatedCategories = [...categories];
                                                            updatedCategories[categoryIndex].fields[fieldIndex].options[optionIndex].value = e.target.value;
                                                            setCategories(updatedCategories);
                                                        }}
                                                    />
                                                    <MdDeleteForever className='text-cyan-500 text-xl' onClick={() => handleRemoveOption(categoryIndex, fieldIndex, optionIndex)}>Remove Option</MdDeleteForever>
                                                </div>
                                            ))}
                                            <Tooltip content="Add option">
                                                <IconButton variant='text' >
                                                    <IoIosAddCircle className='w-[50px] text-cyan-500 text-xl cursor-pointer' onClick={() => handleAddOption(categoryIndex, fieldIndex)}>Add Option</IoIosAddCircle>
                                                </IconButton>

                                            </Tooltip>
                                           
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Tooltip content="Add Field">
                                <IconButton variant="text">
                                    <IoIosAddCircle className='w-[50px] text-cyan-500 text-xl cursor-pointer' onClick={() => handleAddField(categoryIndex)}>Add Field</IoIosAddCircle>
                                </IconButton>
                            </Tooltip>
                        </div>
                    ))}
                    <div className='flex justify-between items-center my-5 py-2'>
                        <Tooltip content="Add Category" >
                            <IconButton variant="text">
                                <IoIosAddCircle className='w-[50px] text-cyan-500 text-xl' onClick={handleAddCategory}>Add Category</IoIosAddCircle>
                            </IconButton>
                        </Tooltip>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
