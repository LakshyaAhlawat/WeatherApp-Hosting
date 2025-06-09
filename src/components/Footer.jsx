const Footer=()=>(
  <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
    <div className="text-sm mb-2">
      © {new Date().getFullYear()} WeatherWise. All rights reserved.
    </div>
    <div className="mt-1 flex flex-col md:flex-row gap-2 justify-center text-xs text-gray-400">
      <span>Privacy Policy</span>
      <span>Terms of Service</span>
      <span>Contact Us</span>
    </div>
  </footer>
);

export default Footer;