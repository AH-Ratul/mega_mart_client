import React from 'react';
import toast from 'react-hot-toast';

const CustomToast = ({type, message}) => {
    return (
        toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-sm w-full border border-l-4 ${
                type === 'success' ? 'border-l-green-500 bg-white text-green-700' : 'bg-white border-l-red-500 text-red-700'
              } shadow-lg rounded-md flex`}
            >
              <div className="flex-1 w-0 py-2">
                <div className="flex items-start">
                  <div className="ml-3 flex-1">
                    <p className="mt-1 text-sm">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          ), { duration: 2000 })
    );
};

export default CustomToast;