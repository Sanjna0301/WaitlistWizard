import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg className="w-8 h-8 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
              </svg>
              <span className="text-xl font-bold font-inter">Mental Health Tracker</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Your AI-powered companion for mental wellness, providing personalized support on your journey to better health.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 font-inter">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/"><a className="text-neutral-400 hover:text-white transition">Features</a></Link></li>
              <li><Link href="/chatbot"><a className="text-neutral-400 hover:text-white transition">AI Companion</a></Link></li>
              <li><Link href="/dashboard"><a className="text-neutral-400 hover:text-white transition">Dashboard</a></Link></li>
              <li><Link href="/resources"><a className="text-neutral-400 hover:text-white transition">Resources</a></Link></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Privacy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 font-inter">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Blog</a></li>
              <li><Link href="/resources"><a className="text-neutral-400 hover:text-white transition">Mental Health Articles</a></Link></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Research</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Find a Therapist</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 font-inter">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-mail-line text-neutral-400 mt-1 mr-2"></i>
                <span className="text-neutral-400">support@mentalhealthtracker.com</span>
              </li>
              <li className="flex items-start">
                <i className="ri-phone-line text-neutral-400 mt-1 mr-2"></i>
                <span className="text-neutral-400">Emergency: 1800 599 0019</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Get updates on mental wellness</h4>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-neutral-700 text-white px-4 py-2 rounded-l-lg border-none outline-none flex-1" />
                <button className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-lg transition">
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">© 2023 Mental Health Tracker. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
