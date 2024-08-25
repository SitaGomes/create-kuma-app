import Link from 'next/link';
import React from 'react';

const AppNotFound = () => {
  return (
    <div>
      <h1>404 - App Page Not Found</h1>
      <p>The page you are looking for in the app does not exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default AppNotFound;
