import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { createAssignUniversity } from "../../redux/center/centerSlice";
 
export default function PopUpFrom({centerID,open,handleClose,University}) {

  const [selectUniversity,setSelectedUniversity] = useState() 
  const [commissionPercentage,setCommissionPercentage] = useState(0) 
  const dispatch = useDispatch()
  console.log("unasigned University",University)
 const handleChange = (e)=>{
    setSelectedUniversity(e)
    console.log("my event in sleecet",e)
 }
 const handleShare = (e)=>{
  setCommissionPercentage(e.target.value)
 }
const handleSubmit = ()=>{
  const data = { 
    centerId:centerID,
    commissionPercentage:commissionPercentage,
    universityId:selectUniversity._id
  }
  console.log("sending data",data)
  dispatch(createAssignUniversity(data))
}
  return (
    <>  
    { University ? 
      <Dialog open={open} >
        <DialogHeader>Assign Univsersity With share</DialogHeader>
        <Card>
          <form className="p-3 m-4">
                <Select value={selectUniversity} onChange={e=>handleChange(e)}>
                  {  University?.map((uni,index)=>{
                    return (
                      <div>
                        <Option key={index} value={uni}>{uni.universityName}</Option>
                     
                      </div>
                    )
                  })
                 
                  }
                </Select>
              <div className="p-2 m-2">
                <span class="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle">MODE -</span>
                <span class="text-sm font-medium py-1 px-2 rounded text-red-800 align-middle">{selectUniversity?.vertical}</span>
              </div>

                <Input value={commissionPercentage} 
                onChange={e=>handleShare(e)}
                className="p-2 m-2" variant="standard" label="SHARE" type ="number" placeholder="SHARE"/>
                

          </form>
        </Card>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>: 
      <div>
        loading ..
      </div>
      // <Loader />
      }
    </>
  );
}