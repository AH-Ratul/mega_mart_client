import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-eerieblack flex flex-col justify-center items-center text-white mt-14 pt-5 pb-3 w-full">
      <div className="flex gap-32">
        <div>
          <h1 className="mb-4">Company Info</h1>
          <ul className="flex flex-col gap-1 text-sm text-white/70">
            <li className="hover:text-white">
              <Link>About MegaMart</Link>
            </li>
            <li className="hover:text-white">
              <Link>Contact us</Link>
            </li>
            <li className="hover:text-white">
              <Link>News center</Link>
            </li>
            <li className="hover:text-white">
              <Link>Careers</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="mb-4">Customer Service</h1>
          <ul className="flex flex-col text-sm text-white/70 gap-1">
            <li className="hover:text-white">
              <Link>Return & Refund</Link>
            </li>
            <li className="hover:text-white">
              <Link>Shipping Info</Link>
            </li>
            <li className="hover:text-white">
              <Link>Policies & Rules</Link>
            </li>
            <li className="hover:text-white">
              <Link>Report suspicious activity</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="mb-4">Help</h1>
          <ul className="flex flex-col text-sm text-white/70 gap-1">
            <li className="hover:text-white">
              <Link>Support center & FAQ</Link>
            </li>
            <li className="hover:text-white">
              <Link>Safety Center</Link>
            </li>
            <li className="hover:text-white">
              <Link>Product support</Link>
            </li>
            <li className="hover:text-white">
              <Link>Sitemap</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1>Find us</h1>
          <div className="flex items-center gap-5">
            <Link>in</Link>
            <Link>f</Link>
            <Link>x</Link>
            <Link>y</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-t-white/20 w-full flex items-center justify-center mt-12">
        <p className="text-sm my-5 text-white/70">
          Copyright &copy; MegaMart 2025 | All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
