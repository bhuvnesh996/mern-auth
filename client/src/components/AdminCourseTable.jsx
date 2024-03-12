import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Switch,
  } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCourse, fetchCourse } from '../redux/course/courseSlice';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { DeletePopUp } from './DeletePopUp';
  const TABLE_HEAD = ["Name", "Specialization", , "Universtiy", "Graduation Level","status",""];
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];
export default function AdminCourseTable() {

    const course = useSelector(state =>state.course.Course)
    const [courseID,setCourseID] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const [openDeleteDialog,setOpenDeleteDialog] = useState(false)
    const handlePageChange = (page) => {
        if (page > 0) {
            setCurrentPage(page);
        }
    };
    const handleConfirmDelete = ()=>{
        dispatch(DeleteCourse(courseID))
        setOpenDeleteDialog(false)
    }
    
  const handleDelete = async (e, id) => {
    e.preventDefault();
    setCourseID(id);
    console.log(id)
    
    setOpenDeleteDialog(true);
  };
    useEffect(()=>{
        dispatch(fetchCourse(setCurrentPage))
    },[dispatch])
  return (
    <div>
    <div>
      {!course ? <Loader /> :
      
    <Card className="h-full w-full">
        <DeletePopUp 
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}/>

      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
                Course list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all course
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm" onClick={(e)=>navigate("/admin/course/create") }>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add course
            </Button>
        
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {  Array.isArray(course)  ?  course?.map(
              ({ _id, name, specializations, university,isActive,graducationLevel }, index) => {
                const isLast = index === course.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                     
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                  
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-row">
                        {specializations?.map((item)=>{
                            return (
                                 <Typography
                                 variant="small"
                                 color="blue-gray"
                                 className="font-normal"
                               >
                                {item}{','}
                               </Typography>
                            )
                        })}
                       
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        
                        {university?.universityName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        
                        {graducationLevel}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        
                        <Switch color="blue" defaultChecked={isActive ? true :false}  />
                      </Typography>
                    </td>
                
                    <td className={classes}>
                      <Tooltip content="Delete Session">
                        <IconButton variant="text" onClick={e=>handleDelete(e,_id)} >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                     
                    </td>
                  </tr>
                );
              },
            ): <Loader /> }
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Current Page - {currentPage}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={()=> handlePageChange(currentPage-1)}>
            Previous
          </Button>
          <Button variant="outlined" size="sm" onClick={()=> handlePageChange(currentPage+1)}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  }</div>
    </div>
  )
}
