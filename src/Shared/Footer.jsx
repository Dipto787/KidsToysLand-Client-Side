import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">KidsToysLand 🌈</h2>
          <p className="text-sm leading-6">
            Bringing happiness, creativity, and imagination to kids everywhere
            with fun, safe, and high-quality toys. ❤️
          </p>
          {/* Socials */}
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="bg-slate-800 p-2 rounded-full hover:bg-[#f85606] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-slate-800 p-2 rounded-full hover:bg-[#f85606] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-slate-800 p-2 rounded-full hover:bg-[#f85606] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-slate-800 p-2 rounded-full hover:bg-[#f85606] transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#f85606] transition">About Us</a></li>
            <li><a href="#" className="hover:text-[#f85606] transition">Our Mission</a></li>
            <li><a href="#" className="hover:text-[#f85606] transition">Our Vision</a></li>
            <li><a href="#" className="hover:text-[#f85606] transition">Careers</a></li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#f85606] transition">All Toys</a></li>
            <li><a href="#" className="hover:text-[#f85606] transition">By Age</a></li>
            <li><a href="#" className="hover:text-[#f85606] transition">By Brand</a></li>
            <li><a href="#" className="hover:text-[#f85606] transition">Special Offers</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#f85606] transition">FAQs</a></li>
            <li><a href="#" className="hover:text-[#f85606] transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-[#f85606] transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-[#f85606] transition">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} KidsToysLand. All Rights Reserved. 🌟
      </div>
    </footer>
  );
};

export default Footer;
