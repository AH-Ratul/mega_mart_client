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
    <footer className="bg-eerieblack text-white w-full pt-8 pb-20 lg:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About MegaMart
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-white transition-colors">
                  News Center
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/returns"
                  className="hover:text-white transition-colors"
                >
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/policies"
                  className="hover:text-white transition-colors"
                >
                  Policies & Rules
                </Link>
              </li>
              <li>
                <Link
                  to="/report"
                  className="hover:text-white transition-colors"
                >
                  Report Suspicious Activity
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Help</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors"
                >
                  Support Center & FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="hover:text-white transition-colors"
                >
                  Safety Center
                </Link>
              </li>
              <li>
                <Link
                  to="/product-support"
                  className="hover:text-white transition-colors"
                >
                  Product Support
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  className="hover:text-white transition-colors"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Payments */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Connect with Us
            </h3>
            <div className="flex gap-2 mb-6">
              <Link
                to="/instagram"
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {insta}
              </Link>
              <Link
                to="/facebook"
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {facebook}
              </Link>
              <Link
                to="/x"
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {X}
              </Link>
              <Link
                to="/youtube"
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {youtube}
              </Link>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">We Accept</h3>
            <div className="flex flex-wrap gap-2">
              <img src={visa} alt="Visa" className="h-8 object-contain" />
              <img src={ms} alt="Mastercard" className="h-8 object-contain" />
              <img src={pay} alt="Pay" className="h-8 object-contain" />
              <img
                src={bkash}
                alt="bKash"
                className="h-8 object-contain bg-white rounded"
              />
              <img
                src={rocket}
                alt="Rocket"
                className="h-8 object-contain rounded"
              />
              <img
                src={nagad}
                alt="Nagad"
                className="h-8 object-contain bg-white rounded p-1"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-400">
            Copyright © MegaMart 2025 | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
