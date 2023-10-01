import React from 'react';
import { motion } from 'framer-motion';

interface UploadBtnProps {
  onClick: any;
  text: string;
  disabled?: boolean;
  disabledClassName?: string;
}

const UploadBTN: React.FC<UploadBtnProps> = ({
  onClick,
  text,
  disabled,
  disabledClassName,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`m-6 mx-10 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${disabledClassName}`}
    >
      <span className="relative flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        {text}
      </span>
    </motion.button>
  );
};

export default UploadBTN;
