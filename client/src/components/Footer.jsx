import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold text-white">Cravenings</h2>
            <p className="mt-3 text-sm text-slate-300 max-w-sm">
              Order from your favorite restaurants and get it delivered hot and fresh.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/order-now" className="hover:text-white transition">
                  Order Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <p className="mt-3 text-sm text-slate-300">
              Need help? Reach out and we’ll get back to you as soon as possible.
            </p>
            <p className="mt-3 text-sm">
              <span className="font-semibold text-white">Email:</span>{" "}
              <a
                href="mailto:support@cravenings.com"
                className="hover:text-white transition"
              >
                support@cravenings.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {year} Cravenings. All rights reserved.</p>
          <p>
            Built with care for great food experiences.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
