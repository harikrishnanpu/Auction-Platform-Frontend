"use client";

import React, { useState } from 'react';

const HammrDownLanding = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-b from-blue-200 via-gray-50 to-orange-50 dark:from-blue-900 dark:via-gray-900 dark:to-purple-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {/* Navigation */}
        <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center z-50 relative">
          <div className="text-2xl font-serif font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.82v8c0 4.14-2.97 8.02-7 9.45-4.03-1.43-7-5.31-7-9.45V8l6-2.82zm-1 5.82v8h2v-8h-2z"/>
            </svg>
            Hammr.Down
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#features">Features</a>
            <a className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#solutions">Solutions</a>
            <a className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#why-us">Why Us</a>
          </div>
          <div className="flex items-center space-x-4">
            <a className="hidden md:block text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#">Log In</a>
            <a className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-md" href="#">Get Started</a>
            <button 
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 md:px-8 pb-20">
          {/* Hero Section */}
          <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 md:p-16 mb-20 shadow-lg border border-white/50 dark:border-white/10 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 z-10 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                Next-Gen Auction Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight font-serif">
                Bidding Reimagined <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">For the Future.</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed max-w-lg">
                Experience the worlds most reliable, secure, and scalable auction infrastructure. Real-time updates with zero latency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a className="bg-gray-900 text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" href="#">
                  Get Started / Login
                </a>
                <a className="bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center" href="#">
                  Contact Us
                </a>
              </div>
              <div className="mt-8 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white dark:border-gray-800"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white dark:border-gray-800"></div>
                </div>
                <span>Trusted by 500+ Auction Houses</span>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="lg:w-1/2 relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 relative z-10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs font-mono text-gray-400">live_bid_stream_v2.0</div>
                  </div>
                  <div className="flex gap-4 mb-6">
                    <div className="w-1/3 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="w-2/3 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                      <div className="flex justify-between items-end mt-4">
                        <div className="h-8 bg-blue-100 dark:bg-blue-900/40 rounded w-24"></div>
                        <div className="h-8 w-8 bg-gray-900 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Bidder #4029</span>
                      <span className="text-green-500 font-bold">New Bid Placed</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-3/4 h-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 flex items-center gap-3 z-20 border border-gray-50 dark:border-gray-700 animate-bounce" style={{animationDuration: '3s'}}>
                  <span className="text-green-500 bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                  </span>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Security Check</div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">Verified 100%</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Solutions Section */}
          <section className="mb-24 text-center" id="solutions">
            <div className="max-w-3xl mx-auto mb-16">
              <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 block">Our Mission</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                Bridging the Gap Between <br/>
                <span className="italic text-gray-500">Legacy</span> and <span className="italic text-blue-500">Innovation</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">We provide a seamless infrastructure that solves the complexities of digital auctions, transforming how assets are exchanged globally.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group text-left">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Problem</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Traditional auctions suffer from latency, lack of transparency, and geographical limitations that hinder fair value discovery.</p>
              </div>
              <div className="flex flex-col justify-center items-center md:pt-12">
                <svg className="w-10 h-10 text-gray-300 dark:text-gray-600 hidden md:block transform rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group text-left">
                <div className="w-14 h-14 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Solution</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">An automated, real-time ecosystem that ensures sub-second bidding, immutable audit trails, and global accessibility.</p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-24" id="features">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Engineered for Peak Performance</h2>
                <p className="text-gray-600 dark:text-gray-400">Everything you need to run professional auctions at scale.</p>
              </div>
              <a className="hidden md:flex items-center text-blue-500 font-semibold hover:text-blue-700 transition-colors mt-4 md:mt-0" href="#">
                View full specs
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '⚡', color: 'purple', title: 'Ultra-Low Latency', desc: 'Real-time WebSocket infrastructure delivering bid updates in under 50ms globally.' },
                { icon: '🔒', color: 'blue', title: 'Bank-Grade Security', desc: 'AES-256 encryption, 2FA, and automated fraud detection systems built-in.' },
                { icon: '📈', color: 'green', title: 'Infinite Scalability', desc: 'Cloud-native architecture that auto-scales to handle millions of concurrent users.' },
                { icon: '🤖', color: 'orange', title: 'Smart Automation', desc: 'Set it and forget it. Automated extensions, notifications, and payment processing.' },
                { icon: '📊', color: 'pink', title: 'Deep Analytics', desc: 'Comprehensive dashboards tracking bidder behavior, revenue forecasts, and more.' },
                { icon: '👆', color: 'teal', title: 'Intuitive UX', desc: 'Design-led interface ensuring zero learning curve for admins and bidders alike.' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Us Section */}
          <section className="mb-24 relative" id="why-us">
            <div className="absolute inset-0 bg-white/50 dark:bg-white/5 rounded-3xl -z-10 blur-xl"></div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">Why Industry Leaders Trust Hammr.Down</h2>
                  <div className="space-y-6">
                    {[
                      { icon: '⚡', color: 'blue', title: 'Unmatched Speed', desc: 'Our proprietary engine processes bids 10x faster than standard e-commerce platforms.' },
                      { icon: '✓', color: 'purple', title: 'Reliability Guaranteed', desc: '99.99% Uptime SLA ensures your high-stakes auctions are never interrupted.' },
                      { icon: '💡', color: 'orange', title: 'Continuous Innovation', desc: 'We ship updates weekly, keeping you ahead of market trends and technology.' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className={`w-12 h-12 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/30 flex items-center justify-center shrink-0`}>
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2 font-serif">₹100Cr+</div>
                    <div className="text-sm uppercase tracking-widest text-gray-500 mb-8">Asset Value Processed</div>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div className="bg-white dark:bg-black/40 p-4 rounded-xl backdrop-blur-sm">
                        <div className="text-2xl font-bold text-blue-600">50k+</div>
                        <div className="text-xs text-gray-500">Active Bidders</div>
                      </div>
                      <div className="bg-white dark:bg-black/40 p-4 rounded-xl backdrop-blur-sm">
                        <div className="text-2xl font-bold text-green-600">0.01s</div>
                        <div className="text-xs text-gray-500">Avg. Response</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12">
            <div className="bg-gray-900 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ready to Transform Your Auctions?</h2>
                <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">Join the platform that is defining the future of digital asset exchange. Start your journey with Hammr.Down today.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-white text-gray-900 px-8 py-4 text-sm uppercase tracking-widest font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Login Now
                  </button>
                  <button className="bg-transparent border border-gray-600 text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold rounded-xl hover:bg-white/10 transition-all">
                    Contact Sales
                  </button>
                </div>
                <p className="mt-6 text-xs text-gray-500 uppercase tracking-wide">No credit card required for demo</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 py-12 border-t border-gray-100 dark:border-gray-700">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-1">
                <span className="text-2xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  Hammr.Down
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  The premium SaaS solution for modern auctioneers. Secure, fast, and scalable.
                </p>
                <div className="flex space-x-4">
                  <a className="text-gray-400 hover:text-blue-500 transition-colors" href="#">🌐</a>
                  <a className="text-gray-400 hover:text-blue-500 transition-colors" href="#">@</a>
                  <a className="text-gray-400 hover:text-blue-500 transition-colors" href="#">📡</a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-6">Platform</h4>
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <li><a className="hover:text-blue-500 transition-colors" href="#">Features</a></li>
                  <li><a className="hover:text-blue-500 transition-colors" href="#">Integrations</a></li>
                  <li><a className="hover:text-blue-500 transition-colors" href="#">Pricing</a></li>
                  <li><a className="hover:text-blue-500 transition-colors" href="#">API Docs</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-6">Company</h4>
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <li><a className="hover:text-blue-500 transition-colors" href="#">About Us</a></li>
                  <li><a className="hover:text-blue-500 transition-colors" href="#">Careers</a></li>
                  <li><a className="hover:text-blue-500 transition-colors" href="#">Blog</a></li>
                  <li><a className="hover:text-blue-500 transition-colors" href="#">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-6">Contact</h4>
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">📧 hello@hammr.down</li>
                  <li className="flex items-center gap-2">📞 +1 (555) 123-4567</li>
                  <li className="flex items-center gap-2">📍 San Francisco, CA</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Hammr.Down Inc. All rights reserved.</p>
                      </div>
            </div>
          </footer>
        </div>
      </div>
  ) };

export default HammrDownLanding;