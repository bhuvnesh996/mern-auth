import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export function ConformPopUp({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>Form Confirmation</DialogHeader>
      <DialogBody>
        Are you sure you want to create this form?
      </DialogBody>
      <DialogFooter>
        <Button color="blue-gray" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}