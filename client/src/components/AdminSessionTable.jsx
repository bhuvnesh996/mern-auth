import { MagnifyingGlassIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

import { Switch } from "@material-tailwind/react";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionCreateFail, SessionCreateStart, SessionCreateSuccess, deleteSessionStart,deleteSessionEnd, deleteMySession } from "../redux/session/sessionSlice";
import { Select, Option } from "@material-tailwind/react";
import { getAllUniversity } from "../redux/university/universitySlice";
import { useNavigate } from "react-router-dom";
import { DeletePopUp } from "./DeletePopUp";
import Loader from "./Loader";
 
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
 
const TABLE_HEAD = ["University", "Session", , "Status", "action"];
 

  
 
export default function AdminSessionTable({session}) {
  const University = useSelector (state=>state?.center?.unAssigned)
  const dispatch = useDispatch()
  const SessionLoading =  useSelector(state=>state?.session?.loading)
  const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);
  const [sessionID,setSessionID] = useState()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const openStatusPopout =()=>{

  }

  const handleDelete = async (e, id) => {
    e.preventDefault();
    setSessionID(id);
    console.log(id)
    
    setOpenDeleteDialog(true);
  };
  const navigate = useNavigate()
  const handleNavigate= ()=>{
    navigate('/admin/session/create')
  }
  
  const  handleConfirmDelete =async () =>{
   
    dispatch(deleteMySession(sessionID))
    setOpenDeleteDialog(false)
  }
 

  return (
    <div>
      {SessionLoading ? <Loader /> :
      
    <Card className="h-full w-full">
        <DeletePopUp 
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}/>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Session list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all sessions
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm" onClick={(e)=>navigate("/admin/session/create") }>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
            {showAddMemberPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <AddMemberPopupForm handleClosePopup={handleClosePopup} />
                </div>
              </div>
            )}
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
            { 
            session &&  session?.map(
              ({ _id, sessionName, university,status }, index) => {
                const isLast = index === session.length - 1;
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
                            {university?.universityName}
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
                          {sessionName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Switch color="blue" defaultChecked={status ? true :false} onClick={openStatusPopout} />
                        {status}
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
  }</div>
  );
  }
