import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
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
import { useState } from "react";
import { PopUpUpload } from "../UI/PopUpUpload";
   
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
   
  const TABLE_HEAD = ["Payment status","Applicant Name", "University", "Session", "Course", "Specialization","Center Name","Center Code","Uiversity Code","Doc Status","Application Status"];
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'verified':
        return 'text-green-500';
      case 'revert':
        return 'text-red-500';
      case 'recheck':
        return 'text-blue-500';
      default:
        return 'text-gray-500'; // Default color for unknown status
    }
  };

  export function DistanceShowApplicantTable({studentFresh}) {
    const [docStatusReason, setDocStatusReason] = useState(''); // State variable to store the reason for the current row
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State variable to manage the popup's open/close state


    const handlePopupButtonClick = (docStatusReason) => {
      setDocStatusReason(docStatusReason); // Set the docStatusReason for the current row
      setIsPopupOpen(true); // Open the popup
  };
    return (
      <Card className="h-full w-full">
          <PopUpUpload open={isPopupOpen} onClose={() => setIsPopupOpen(false)} docStatusReason={docStatusReason} />
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Applicant List for Fresh Applicant
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
              {studentFresh?.map(
                ({ university,session,course,specialization,center,dynamicFormData,unicode,applicationStatus,docStatus,docStatusReason }, index) => {
                  const isLast = index === studentFresh.length - 1;
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
                              Not payed
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
                      <td className={classes} title={docStatusReason} style={{ position: "relative" }}>
                          <div className="flex flex-row items-center justify-between">
                              <Typography variant="small" color="blue-gray" className={`font-bold ${getStatusColorClass(docStatus)}`}>
                                  {docStatus}
                              </Typography>
                              {docStatus === "revert" && (
                                  <div>
                                      {/* Popup button */}
                                      <button onClick={() => handlePopupButtonClick(docStatusReason)} className="bg-blue-500 text-white px-3 py-1 rounded-md">
                                          Reply
                                      </button>
                                      {/* Popup */}
                                   
                                          
                                     
                                  </div>
                              )}
                          </div>
                      </td>
                      
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                         {applicationStatus}
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