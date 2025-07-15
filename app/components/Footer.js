import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='bg-gray-900 h-16 text-white flex items-center justify-center'>
      <p className='text-center'>
        Copyright &copy; {year} Get Me A Chai - All rights reserved
      </p>
    </footer>
  );
}

export default Footer
