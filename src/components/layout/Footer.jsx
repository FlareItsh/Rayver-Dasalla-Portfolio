import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="bg-primary p-4 text-white sm:p-8 md:p-12 lg:p-20">
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:justify-around lg:gap-0">
          {/* Left Section: Contact & Tagline */}
          <div className="order-2 flex flex-col items-center gap-4 text-center lg:order-1 lg:items-start lg:gap-20 lg:text-left">
            <div className="space-y-2">
              <p className="text-base sm:text-lg">rayverdasalla@gmail.com</p>{' '}
              {/* Bumped base to text-base (16px) for better mobile readability */}
              <p className="text-base sm:text-lg">+63 932 129 6896</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold sm:text-xl">A Creative Developer</h4>{' '}
              {/* Increased base to text-lg (18px) */}
              <p className="text-sm sm:text-base">Based in Davao City, Philippines</p>
            </div>
          </div>

          {/* Center Section: Logo & Name */}
          <div className="order-1 flex flex-col items-center gap-4 lg:order-2">
            <img
              src="/public/RD Logo Light.png"
              alt="Rayver Dasalla"
              className="h-auto w-40 sm:w-52 lg:w-64"
            />{' '}
            {/* Increased base to w-40 (160px) for larger mobile logo */}
            <h2 className="text-center text-4xl leading-tight font-bold sm:text-6xl lg:text-7xl">
              {' '}
              {/* Bumped base to text-4xl (36px) for bigger mobile name */}
              RAYVER <br /> DASALLA
            </h2>
          </div>

          {/* Right Section: Social Links */}
          <div className="order-3 flex flex-col items-center gap-3 sm:gap-5 lg:order-3">
            <p className="mb-3 text-lg font-semibold sm:mb-5 sm:text-xl">Follow Me</p>{' '}
            {/* Increased base to text-lg (18px) */}
            <div className="flex flex-col gap-3 sm:gap-5">
              <a href="" className="transition-opacity hover:opacity-80">
                <i className="fa-brands fa-github text-3xl sm:text-4xl"></i>{' '}
                {/* Bumped base to text-3xl (30px) for larger mobile icons */}
              </a>
              <a href="" className="transition-opacity hover:opacity-80">
                <i className="fa-brands fa-facebook text-3xl sm:text-4xl"></i>
              </a>
              <a href="" className="transition-opacity hover:opacity-80">
                <i className="fa-brands fa-linkedin text-3xl sm:text-4xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
