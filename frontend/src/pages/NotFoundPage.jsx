// src/pages/NotFoundPage.jsx
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-2">Page Not Found</p>
      <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
