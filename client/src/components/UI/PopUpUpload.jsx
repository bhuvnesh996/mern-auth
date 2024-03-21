import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';

export function PopUpUpload({ open, onClose, docStatusReason }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const updatedSelectedFiles = [...selectedFiles];
    updatedSelectedFiles[index] = file;
    setSelectedFiles(updatedSelectedFiles);
  };

  const handleAddFileInput = () => {
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, null]);
  };

  const handleRemoveFileInput = (index) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleUpload = async () => {
    const storage = getStorage(app);
    const uploads = [];
    setUploadProgress(new Array(selectedFiles.length).fill(0));

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(prevProgress => {
              const updatedProgress = [...prevProgress];
              updatedProgress[i] = progress;
              return updatedProgress;
            });
          }, 
          (error) => {
            setUploadError(error.message);
          }, 
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            uploads.push({ fileName, downloadURL });
          }
        );

        await uploadTask;
      }
    }

    return uploads;
  };

  const handleSubmit = async () => {
    try {
      const uploadedFiles = await handleUpload();
      // Do something with uploadedFiles, like save to Firestore or display them
      console.log("Uploaded files:", uploadedFiles);
      onClose();
    } catch (error) {
      setUploadError(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>Revert Document Upload</DialogHeader>
      {docStatusReason && <p className="font-bold">Reason for revert Status: {docStatusReason}</p>}
      <DialogBody>
        {selectedFiles.map((file, index) => (
          <div key={index} className="flex items-center gap-4">
            <input
              type='file'
              onChange={(e) => handleFileChange(e, index)}
              accept='image/*'
            />
            <Button onClick={() => handleRemoveFileInput(index)}>Remove</Button>
            {uploadProgress[index] > 0 && <span>{uploadProgress[index]}% Uploaded</span>}
          </div>
        ))}
        <Button onClick={handleAddFileInput}>Add File</Button>
        
        {uploadError && <p className="text-red-600">{uploadError}</p>}
      </DialogBody>
      <DialogFooter>
        <Button color="blue-gray" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={handleSubmit}>
          Upload
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
