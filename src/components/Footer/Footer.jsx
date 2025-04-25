import React from "react";
import { Link } from "react-router-dom";
import { allIcons } from "../../data/all-icons";
import visa from "../../../public/visa.png";
import ms from "../../../public/ms.png";
import pay from "../../../public/pay.png";
import bkash from "../../../public/BKash.svg";
import rocket from "../../../public/rocket.png";
import nagad from "../../../public/nagad.svg";

const Footer = () => {
  const { facebook, insta, X, youtube } = allIcons;

  return (
    <footer className="hidden bg-eerieblack lg:flex flex-col justify-center items-center text-white mt-14 2xl:mt-72 pt-7 pb-3 w-full">
      <div className="flex gap-20 xl:gap-32">
        {/* INFO */}
        <div>
          <h1 className="mb-4 font-semibold">Company Info</h1>
          <ul className="flex flex-col gap-1 text-sm text-white/70">
            <li className="hover:text-white w-fit">
              <Link>About MegaMart</Link>
            </li>
            <li className="hover:text-white w-fit">
              <Link>Contact us</Link>
            </li>
            <li className="hover:text-white w-fit">
              <Link>News center</Link>
            </li>
            <li className="hover:text-white w-fit">
              <Link>Careers</Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h1 className="mb-4 font-semibold">Customer Service</h1>
          <ul className="flex flex-col text-sm text-white/70 gap-1">
            <li className="hover:text-white w-fit">
              <Link>Return & Refund</Link>
            </li>
            <li className="hover:text-white w-fit">
              <Link>Shipping Info</Link>
            </li>
            <li className="hover:text-white w-fit">
              <Link>Policies & Rules</Link>
            </li>
            <li className="hover:text-white w-fit">
              <Link>Report suspicious activity</Link>
            </li>
          </ul>
        </div>

        {/* HELP section */}
        <div>
          <h1 className="mb-4 font-semibold">Help</h1>
          <ul className="flex flex-col text-sm text-white/70 gap-1">
            <li className="hover:text-white w-fit">
              <Link>Support center & FAQ</Link>
            </li>
            <li className="hover:text-white w-fit">
              <Link>Safety Center</Link>
            </li>
            <li className="hover:text-white w-fit">
              <Link>Product support</Link>
            </li>
            <li className="hover:text-white w-fit">
              <Link>Sitemap</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h1 className="mb-3 font-semibold">Connect with us</h1>
          <div className="flex items-center gap-2 text-2xl">
            <Link className="hover:bg-white/10 rounded-full p-2">{insta}</Link>
            <Link className="hover:bg-white/10 rounded-full p-2">
              {facebook}
            </Link>
            <Link className="hover:bg-white/10 rounded-full p-2">{X}</Link>
            <Link className="hover:bg-white/10 rounded-full p-2">
              {youtube}
            </Link>
          </div>

          {/* Payment Methods */}
          <div>
            <p className="font-semibold text-base mt-4">We accept</p>
            <div className=" mt-2 flex items-center gap-2">
              <img src={visa} alt="visa" className="w-10" />

              <img src={ms} alt="ms" className="w-10" />

              <img src={pay} alt="pay" className="w-10" />

              <img src={bkash} alt="bkash" className="w-10 bg-white rounded" />

              <img src={rocket} alt="rocket" className="w-10 rounded" />

              <img
                src={nagad}
                alt="nagad"
                className="w-10 bg-white py-1.5 px-1 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-t-white/20 w-full flex items-center justify-center mt-12">
        <p className="text-sm my-5 text-white/70">
          Copyright &copy; MegaMart 2025 | All Right Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
