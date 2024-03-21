import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  // Import Firebase Storage SDK
  import { getStorage, ref, getDownloadURL } from "firebase/storage";

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
    Dialog,
    DialogFooter,
    DialogHeader,
    DialogBody,
  } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUniversity } from "../redux/university/universitySlice";
import { applicationStatus, changeDocStatus } from "../redux/student/studentSlice";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoIosDoneAll } from "react-icons/io";
import { MdCancel } from "react-icons/md";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";


   
  const TABLE_HEAD = ["Payment status","Applicant Name", "Adhar card", "University", "Session", "Course", "Specialization","Center Name","Center Code","Uiversity Code","Doc Status", "Reason for rejection","Application Status","Reason for application Status"];
  function ReasonPopup({ isOpen, onClose, onSubmit ,setReason ,reason}) {
    return (
      
        <Dialog open={isOpen} onClose={onClose} > {/* Add styles for positioning, visibility, etc. */}
          <DialogHeader>Status Confirmation</DialogHeader>
            <DialogBody>
              <input
                type="text"
                className="w-[350px]"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for status change"

              />              
              </DialogBody>
          
          <DialogFooter className="flex flex-row justify-between">
          
                <button className="text-white bg-red-500 cursor pointer w-[70px] rounded-sm" onClick={onClose}>Cancel</button> 
                
                <button className="text-white bg-cyan-500 cursor pointer w-[80px] rounded-sm" onClick={(e) => onSubmit(e)}>Submit</button>
          </DialogFooter>
        </Dialog>
      
    );
  }
  function ReasonPopup2({ isOpen, onClose, onSubmit ,setReason ,reason}) {
    return (
      
        <Dialog open={isOpen} onClose={onClose} > {/* Add styles for positioning, visibility, etc. */}
          <DialogHeader>Status Confirmation</DialogHeader>
            <DialogBody>
              <input
                type="text"
                className="w-[350px]"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for status change"

              />              
              </DialogBody>
          
          <DialogFooter className="flex flex-row justify-between">
          
                <button className="text-white bg-red-500 cursor pointer w-[70px] rounded-sm" onClick={onClose}>Cancel</button> 
                
                <button className="text-white bg-cyan-500 cursor pointer w-[80px] rounded-sm" onClick={(e) => onSubmit(e)}>Submit</button>
          </DialogFooter>
        </Dialog>
      
    );
  }
  
  export async function generatePDF(links) {
    const pdf = new jsPDF();
  
    try {
        // Function to add image to PDF
        const addImageToPDF = (url, index) => {
          
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    const imgWidth = 100; // Adjust as needed
                    const imgHeight = (img.height * imgWidth) / img.width;
                    pdf.addImage(img, "JPEG", 10, index * 110 + 10, imgWidth, imgHeight);
                    resolve();
                };
                img.onerror = (error) => {
                    console.error(`Error loading image from ${url}: ${error.message}`);
                    reject(error);
                };
                img.src = url;
            });
        };
  
        // Loop through each image URL to add images to PDF
        for (let i = 0; i < links.length; i++) {
            await addImageToPDF(links[i], i);
        }
  
        // Save or open the PDF
        pdf.save("documents.pdf");
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}
  

  export function AdminApplicantTable({student}) {
    const dispatch = useDispatch()
    
    const [selectedUniversity, setSelectedUniversity] = useState("");
    const [selectedType,setSelectedType] = useState("")
    const [searchUniversityCode, setSearchUniversityCode] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen2,setIsPopupOpen2] = useState(false)
    const [currentStudentId, setCurrentStudentId] = useState(null);
    const [status,setStatus] = useState("")
    const [reason, setReason] = useState('');
    const {University} = useSelector(state=>state.university)
    const handleDocStatusChange = (studentId, newStatus) => {
      console.log("status ",newStatus)
       // Assuming 'cancelled' status requires a reason
        setIsPopupOpen(true);
        setCurrentStudentId(studentId);
        setStatus(newStatus)
        // Optionally, set the initial reason to an empty string or the current reason if you're editing
        setReason('');
      
        // Place your update logic here
      }
      
      
 
    const handleApplicationChange = (studentId,newStatus) =>{
      setIsPopupOpen2(true)
      setCurrentStudentId(studentId);
      setStatus(newStatus)
    }
    useEffect(()=>{
        dispatch(getAllUniversity())
    },[dispatch])

    const onSubmit = (e) => {
      e.preventDefault() 
      const data ={ 
        id:currentStudentId,
        raw:{
          docStatus:status,
          docStatusReason:reason
        }
      }
      dispatch(changeDocStatus(data))

      // Handle the logic to update the student's status with the reason here
      setIsPopupOpen(false);
      
    }
    const onSubmitApplcation = (e) => {
      e.preventDefault() 
      const data ={ 
        id:currentStudentId,
        raw:{
          applicationStatus:status,
          applicationStatusReason:reason
        }
      }
      dispatch(applicationStatus(data))

      // Handle the logic to update the student's status with the reason here
      setIsPopupOpen2(false);
      
    }
      // Filtering student data based on selected university
    // Filtering student data based on selected university, type, and search university code
    const filteredStudent = student.filter(data => {
        const matchesUniversity = selectedUniversity === "" || data.university.universityName === selectedUniversity;
        const matchesType = selectedType === "" || (data.studentType && data.studentType.toLowerCase() === selectedType.toLowerCase());
        const matchesUniversityCode = searchUniversityCode === "" || (data.unicode && data.unicode.includes(searchUniversityCode.toUpperCase()));
    
        return matchesUniversity && matchesType && matchesUniversityCode;
      });
      console.log("matchesType",filteredStudent)
      const [documentLinks, setDocumentLinks] = useState([]);

      useEffect(() => {
        extractDocumentLinks();
      }, [student]);
      // Extract document links for each student
      const extractDocumentLinks = () => {
        const links = {};
        filteredStudent.forEach(({ _id, dynamicFormData }) => {
          const studentLinks = [];
          if (dynamicFormData) {
            Object.values(dynamicFormData).forEach(value => {
              if (typeof value === 'string' && value.startsWith('http')) {
                studentLinks.push(value);
              }
            });
          }
          links[_id] = studentLinks;
        });
        setDocumentLinks(links);
      };

    
    return (
      <Card className="h-full w-full">
        <ReasonPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubmit={onSubmit}
            setReason = {setReason}
            reason={reason}
        />
         <ReasonPopup2
            isOpen={isPopupOpen2}
            onClose={() => setIsPopupOpen2(false)}
            onSubmit={onSubmitApplcation}
            reason={reason}
            setReason = {setReason}
        />
      
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Applicant List 
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Applicant
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                view all
              </Button>
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Applicant
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
                <select
                    className="w-[170px]  border border-blue-gray-300 rounded-md px-2 py-1"    
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}>
                                <option className="w-[170px]" value="">Select University</option>
                            {University?.map((uni)=>{   
                                return (
                                    <option className="w-[170px]" key={uni.universityName} value={uni.universityName}>{uni.universityName}-{uni.vertical}</option>
                                )
                            })}
                </select>
                <select  className="w-[170px] border border-blue-gray-300 rounded-md px-2 py-1"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">All TYPE</option>
                    <option value="Fresh">FRESH ADMISSION </option>
                    <option value="RR">RR ADMISSION</option>

                </select>
                <select  className="w-[170px]  border border-blue-gray-300 rounded-md px-2 py-1">
                    <option > Session</option>
   
                </select>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search By University Code"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchUniversityCode}
                onChange={(e) => setSearchUniversityCode(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudent?.map(
                ({ _id,university,session,course,specialization,center,paymentStatus,dynamicFormData,unicode,applicationStatus,docStatus , docStatusReason,applicationStatusReason}, index) => {
                  const isLast = index === student.filteredStudent - 1;
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
                              {/* {paymentStatus ==='Pending' && (<MdOutlinePendingActions />)}
                              {paymentStatus ==='Payed' && (<MdOutlinePendingActions />)} */}
                              <select>
                                <option>Pay Now</option>
                                <option>Paid</option>
                                <option>Rejected</option>
                              </select>
                            </Typography>
              
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                         
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {dynamicFormData?.Name}
                            </Typography>
              
                          </div>
                        </div>
                      </td>
                      {/* <td>
                          {dynamicFormData && Object.values(dynamicFormData).map((value, index) => (
                            <div>
                               
                            </div>
                            // <div key={index}>{typeof value === 'string' && value.startsWith('http') && value}</div>
                          ))}
                        </td> */}
                        <td>
                          <button onClick={() => generatePDF(documentLinks[_id])}>
                                Download PDF
                               </button>
                        </td>

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
                            {session.sessionName}
                          </Typography>
                        
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                         
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                                {course.name}
                            </Typography>
              
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                                {specialization}
                            </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                                {center.OwnerName}
                            </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                                {center.CenterCode}
                            </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                         {unicode}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                         <select onChange={(e)=>handleDocStatusChange(_id,e.target.value)} defaultChecked={docStatus}defaultValue={docStatus}>
                            <option value="pending">Pending</option>
                            <option value='verified'>Verified</option>
                            <option value='revert'>Reverted</option>
                            <option value="recheck">Re-Check</option>
                         </select>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="red"
                          className="font-normal"
                        >
                         {docStatusReason}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                         <select onChange={(e)=>handleApplicationChange(_id,e.target.value) } defaultValue={applicationStatus} defaultChecked ={applicationStatus}>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="cancelled">Cancelled</option>
                         </select>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="red"
                          className="font-normal"
                        >
                         {applicationStatusReason}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
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