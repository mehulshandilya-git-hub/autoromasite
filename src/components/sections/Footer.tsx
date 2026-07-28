"use client";

import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin, FiSend } from "react-icons/fi";

const footerLinks = {
  mainMenu: [
    { label: "Home", href: "#" },
    { label: "Shop", href: "#featured" },
    { label: "Fragrance Guide", href: "#" },
    { label: "About Us", href: "#story" },
    { label: "Contact", href: "#" },
  ],
  policies: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Return & Refund Policy", href: "#" },
  ],
  account: [
    { label: "My Profile", href: "#" },
    { label: "Orders", href: "#" },
    { label: "Sign In", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer id="footer" className="bg-ink border-t border-white/5 text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24 py-16 md:py-20">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1.4fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <a href="#" className="inline-flex items-center gap-0.5">
              <span
                className="text-2xl tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300 }}
              >
                <span className="text-red" style={{ fontWeight: 400 }}>Auto</span>
                <span className="text-white">Roma</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[1.3rem] leading-relaxed text-white/40 font-sans font-light">
              Luxury car fragrances crafted for every journey. Transform your
              drive with the finest scents from around the world.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-6">
              {[
                { icon: FiInstagram, href: "#" },
                { icon: FiFacebook, href: "#" },
                { icon: FiTwitter, href: "#" },
                { icon: FiLinkedin, href: "#" },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-red hover:text-ink transition-all duration-250 hover:-translate-y-0.5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-[1.2rem] font-sans font-medium uppercase tracking-[0.18em] text-red/70 mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919072555565" className="text-[1.3rem] text-white/50 hover:text-red/70 transition-colors font-sans font-light">
                  +91 90725 55565
                </a>
              </li>
              <li>
                <a href="mailto:info@autoroma.in" className="text-[1.3rem] text-white/50 hover:text-red/70 transition-colors font-sans font-light">
                  info@autoroma.in
                </a>
              </li>
            </ul>
          </div>

          {/* Main Menu */}
          <div>
            <h3 className="text-[1.2rem] font-sans font-medium uppercase tracking-[0.18em] text-red/70 mb-5">
              Main Menu
            </h3>
            <ul className="space-y-3">
              {footerLinks.mainMenu.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[1.3rem] text-white/50 hover:text-red/70 transition-colors font-sans font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-[1.2rem] font-sans font-medium uppercase tracking-[0.18em] text-red/70 mb-5">
              Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.policies.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[1.3rem] text-white/50 hover:text-red/70 transition-colors font-sans font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-[1.2rem] font-sans font-medium uppercase tracking-[0.18em] text-red/70 mb-5">
              My Account
            </h3>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[1.3rem] text-white/50 hover:text-red/70 transition-colors font-sans font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-14 pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <p className="text-[1.3rem] font-sans text-white/50 shrink-0">
              Subscribe for exclusive offers & new drops
            </p>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 bg-white/5 border border-white/10 text-white text-[1.3rem] font-sans placeholder-white/30 outline-none focus:border-red/50 transition-colors"
              />
              <button className="px-6 py-3 bg-red text-ink flex items-center justify-center hover:bg-red-light transition-colors">
                <FiSend className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[1.1rem] text-white/30 font-sans font-light">
            &copy; {new Date().getFullYear()} AutoRoma. All rights reserved.
          </p>
          <p className="text-[1.1rem] text-white/30 font-sans font-light">
            Designed with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
