import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <FaSpinner className="animate-spin text-blue-500 text-4xl" />
    </div>
  );
};

export default Spinner;
