import { toast } from 'react-hot-toast';

export interface ToastProps {
  msg: string;
  position?:
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right'
    | 'top-center';
}

const toastStyle = {
  fontSize: '14px',
  borderRadius: '16px',
  padding: "16px",
  fontWeight: '600',
  boxShadow: "none",
  maxWidth: "411px"
};

export const Toast = {
  success: ({ msg, position = 'top-center' }: ToastProps) =>
    toast.success(msg, {
      position,
      icon: null,
      style: {
        ...toastStyle,
        color: '#026412',
        backgroundColor: '#DBFAE0',
      }
    }),

  error: ({ msg, position = 'top-center' }: ToastProps) =>
    toast.error(msg, { 
      position, 
      icon: null,
      style: {
        ...toastStyle,
        color: '#A10603',
        backgroundColor: '#FFE6E6'
    } }),

  warn: ({ msg, position = 'top-center' }: ToastProps) =>
    toast.custom(msg, {
      position,
      icon: null,
      style: {
      ...toastStyle
    }
    }),
};
