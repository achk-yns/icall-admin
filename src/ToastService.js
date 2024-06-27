// ToastService.js
import { toast } from 'react-toastify';

const ToastService = {
  success: (message) => {
    toast.success(message, {
      position:"top-center",
    });
  },
  error: (message) => {
    toast.error(message, {
      position:"top-center",
    });
  },
};

export default ToastService;
