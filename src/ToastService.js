// ToastService.js
import { toast } from 'react-toastify';

const ToastService = {
  success: (message) => {
    toast.success(message, {
      position: "bottom-right", // Position of the toast container
      autoClose: 2000, // Time until the toast auto closes in milliseconds (0 will keep it open indefinitely)
      hideProgressBar: false, // Whether to hide the progress bar
      closeOnClick: true, // Close the toast when clicked
      pauseOnHover: true, // Pause closing when hovered over
      draggable: true, // Allow toasts to be dragged
    });
  },
  error: (message) => {
    toast.error(message, {
      position: "bottom-right",
    });
  },
};

export default ToastService;
