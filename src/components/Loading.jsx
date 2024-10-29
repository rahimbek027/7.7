import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-8 border-t-8 border-blue-500  rounded-full animate-spin"></div>
      <span className="ml-4">Loading...</span>
    </div>
  );
}

export default Loading;
