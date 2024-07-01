import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddRendez from "../pages/AddRendez";
import CloseIcon from '@mui/icons-material/Close';
const Header = ({ category, title, Route }) => {
  const [openDialogIndex, setOpenDialogIndex] = useState(null);

  const handleClickOpen = (index) => {
    setOpenDialogIndex(index);
  };

  const handleClose = () => {
    setOpenDialogIndex(null);
  };

  return (
    <div className="container p-4 flex justify-between items-center">
      <div>
        <p className="text-gray-400">{category}</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </p>
      </div>
      {Route && (
        <div>
          <Button
            onClick={() => handleClickOpen(0)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {Route.text}
          </Button>
        </div>
      )}
      <Dialog
        open={openDialogIndex !== null}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleClose();
          }
        }}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: "30%",
            bgcolor: "background.paper",
            m: 4,
            p: 4,
          },
        }}
        BackdropProps={{
          sx: { backdropFilter: "blur(4px)" },
        }}
        disableEscapeKeyDown
      >
        <DialogTitle className="flex justify-between">
          <div>Ajouter un rendez-vous</div>
      
          <div>

        <CloseIcon  onClick={handleClose} />
          </div>
         
        </DialogTitle>
        <DialogContent>
          <AddRendez />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
