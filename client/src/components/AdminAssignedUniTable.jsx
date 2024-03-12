import { MagnifyingGlassIcon,TrashIcon } from "@heroicons/react/24/outline";
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
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUniversityFail, deleteUniversityStart, deleteUniversitySuccess } from "../redux/university/universitySlice";
import { DeletePopUp } from "./DeletePopUp";
import { useEffect, useState } from "react";
import { assignUniversity, deleteCenter, fetchCenter } from "../redux/center/centerSlice";
import Loader from "./Loader";
import PopUpFrom from "./UI/PopUpFrom";
 
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
 
const TABLE_HEAD = ["University Name", "Short Name", "Vertical", "Address","status","Action"];

 
export default function AdminAssignedUniTable({centerID, university}) {
    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()
    const University = useSelector (state=>state?.center?.unAssigned)
    const handleClose = ()=>{
      setOpen(false)
    }
    useEffect(()=>{
        dispatch(assignUniversity(centerID))
    },[])
   
    const center = []
  return (
    
    <Card className="h-full w-full">
      <DeletePopUp 
     />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Assign University
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all University
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm"  onClick={() => setOpen(true)} >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Assign University
            </Button>
            {
             Array.isArray(University) ?  < PopUpFrom centerID={centerID} open={open} handleClose={handleClose} University = {University} />
              : <Loader />
                          }             </div>
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
            {!university || Array.isArray(!university) ? <Loader /> : university?.map(
              ({ university,commissionPercentage}, index) => {
                const isLast = index === university?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                       
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {university.universityName}
                          </Typography>
                         
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {university.univserityShortName}
                        </Typography>
                       
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {university.vertical}
                        </Typography>
                       
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {university.address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        {/* <Chip
                          variant="ghost"
                          size="sm"
                          value={status ==="active" ? "online" : "offline"}
                          color={status ==="check" ? "green" : "blue-gray"}
                        /> */}
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            >
                            {university.status}
                        </Typography>
                      </div>
                    </td>
        
         
                
                    <td className={classes}>
                    
                      <Tooltip content="Edit User">
                        <IconButton  onClick={e=>handleDelete(e,_id)} variant="text">
                          <TrashIcon  className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}