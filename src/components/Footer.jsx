import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#16A34A] text-white py-5 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold">About Aayurveda</h3>
          <p className="mt-2 text-sm">
            Discover authentic Ayurvedic products crafted with traditional knowledge and modern science for your complete wellness journey.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
          </ul>
        </div>
        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Shipping Information</a></li>
            <li><a href="#" className="hover:underline">Returns Policy</a></li>
            <li><a href="#" className="hover:underline">Track Your Order</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold">Connect With Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-white text-xl hover:text-gray-300"><FaFacebookF /></a>
            <a href="#" className="text-white text-xl hover:text-gray-300"><FaInstagram /></a>
            <a href="#" className="text-white text-xl hover:text-gray-300"><FaTwitter /></a>
          </div>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for updates and exclusive offers.
          </p>
        </div>
      </div>
      <div className="text-center text-base mt-8 border-t border-white/20 pt-4">
        &copy; 2025 Aayurveda. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
