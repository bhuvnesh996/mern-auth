import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export function DeletePopUp({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>Delete Confirmation</DialogHeader>
      <DialogBody>
        Are you sure you want to delete this item?
      </DialogBody>
      <DialogFooter>
        <Button color="blue-gray" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}