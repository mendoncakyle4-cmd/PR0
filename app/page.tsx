"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Black Gradient with Twinkling Stars */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black">
        {/* Dense twinkling starfield - 350 stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(350)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 2 + 0.5 + 'px',
                height: Math.random() * 2 + 0.5 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 5 === 0 ? '#60a5fa' : i % 7 === 0 ? '#93c5fd' : '#ffffff',
                boxShadow: i % 4 === 0 ? '0 0 3px rgba(96, 165, 250, 0.6)' : 'none',
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              THE CHORUS BOT
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-4 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Contextual and Conversational ROI
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              AI-powered intelligence platform connecting fragmented Indian media ecosystems 
              to quantifiable business outcomes. Transform PR from cost-center to profit-driver.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <button
                onClick={() => document.getElementById('core-components')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                Explore Platform
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link
                href="/conversion-attribution"
                className="px-8 py-4 border border-white text-white font-light rounded-sm hover:bg-white hover:text-black transition-all"
              >
                View ROI Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Core Problem Section - Flickering Pearl White Letters */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Animated Indian language letters background - pearl white */}
        <div className="absolute inset-0 overflow-hidden">
          {['अ', 'आ', 'இ', 'க', 'త', 'ಕ', 'ক', 'પ', 'ਅ', 'ମ', 'ഇ', 'অ', 'ா', 'ு', 'ಾ', 'া', 'ા', 'ਾ', 'ା', 'ी', 'ं', 'ம', 'ल', 'र', 'न', 'వ', 'ನ', 'দ', 'ત', 'ਨ', 'ର'].map((letter, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl md:text-6xl font-light"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'brightness(1.2)',
              }}
              animate={{
                opacity: [0.25, 0.8, 0.25],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">The Hair-on-Fire Problem</h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Indian PR operates in a fragmented, multi-lingual ecosystem where proving business impact 
              is manual, relationship-dependent, and hampered by regional media diversity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Loss Aversion",
                feature: "Crisis Predictor",
                description: "Early signal detection saves reputation before crisis escalates"
              },
              {
                icon: TrendingUp,
                title: "Jobs-to-be-Done",
                feature: "Conversion Attribution",
                description: "Quantify PR impact on traffic, sign-ups, and business metrics"
              },
              {
                icon: Users,
                title: "Cognitive Ease",
                feature: "Narrative Engine",
                description: "Automate multi-lingual content adaptation across regions"
              },
              {
                icon: Shield,
                title: "Social Proof",
                feature: "Impact Benchmarker",
                description: "Data-driven scores to justify fees and prove superiority"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-effect p-8 rounded-lg hover:bg-white/10 transition-all group"
              >
                <item.icon className="w-12 h-12 mb-4 text-white group-hover:scale-110 transition-transform" />
                <h3 className="text-sm text-gray-500 mb-2 font-light">{item.title}</h3>
                <h4 className="text-2xl font-medium mb-3">{item.feature}</h4>
                <p className="text-gray-400 font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview Section - Subtle Gears Background */}
      <section id="core-components" className="py-32 bg-gradient-to-b from-black to-zinc-900 relative overflow-hidden">
        {/* Animated subtle gears - less prominent */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
          {/* Large center gear */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '180px',
              height: '180px',
              left: '50%',
              top: '40%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at 30% 30%, #e5e7eb, #d1d5db)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 2px 6px rgba(200,200,200,0.15)',
              border: '2px solid rgba(200,200,200,0.25)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Center hub */}
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shadow-inner" />
            {/* Gear teeth */}
            {[...Array(12)].map((_, j) => (
              <div
                key={j}
                className="absolute bg-gradient-to-br from-gray-200 to-gray-300"
                style={{
                  width: '20px',
                  height: '30px',
                  left: '50%',
                  top: '-15px',
                  transform: `translateX(-50%) rotate(${j * 30}deg)`,
                  transformOrigin: 'center 105px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </motion.div>

          {/* Smaller gears positioned around */}
          {[
            { size: 100, x: '15%', y: '25%', teeth: 10, duration: 15, reverse: true },
            { size: 120, x: '80%', y: '30%', teeth: 12, duration: 18, reverse: false },
            { size: 80, x: '25%', y: '65%', teeth: 8, duration: 12, reverse: false },
            { size: 90, x: '75%', y: '70%', teeth: 10, duration: 14, reverse: true },
            { size: 70, x: '10%', y: '55%', teeth: 8, duration: 10, reverse: false },
            { size: 85, x: '88%', y: '60%', teeth: 9, duration: 13, reverse: true },
          ].map((gear, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${gear.size}px`,
                height: `${gear.size}px`,
                left: gear.x,
                top: gear.y,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle at 30% 30%, #e5e7eb, #d1d5db)',
                boxShadow: 'inset 0 1px 6px rgba(0,0,0,0.25), 0 2px 6px rgba(200,200,200,0.12)',
                border: '2px solid rgba(200,200,200,0.2)',
              }}
              animate={{ rotate: gear.reverse ? -360 : 360 }}
              transition={{ duration: gear.duration, repeat: Infinity, ease: "linear" }}
            >
              {/* Center hub */}
              <div className="absolute inset-0 m-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shadow-inner"
                style={{ width: `${gear.size * 0.3}px`, height: `${gear.size * 0.3}px` }}
              />
              {/* Gear teeth */}
              {[...Array(gear.teeth)].map((_, j) => (
                <div
                  key={j}
                  className="absolute bg-gradient-to-br from-gray-200 to-gray-300"
                  style={{
                    width: `${gear.size * 0.18}px`,
                    height: `${gear.size * 0.28}px`,
                    left: '50%',
                    top: `${-gear.size * 0.14}px`,
                    transform: `translateX(-50%) rotate(${j * (360 / gear.teeth)}deg)`,
                    transformOrigin: `center ${gear.size / 2}px`,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Four Core Components</h2>
            <p className="text-xl text-gray-400 font-light">
              Modular AI systems designed for the Indian PR ecosystem
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              {
                title: "Regional Narrative Engine",
                description: "Multilingual LLM trained on Indian regional media. Generate culturally-nuanced pitch summaries in Hindi, Marathi, Tamil, Telugu, Bengali instantly.",
                link: "/regional-narrative",
                stat: "30 seconds",
                statLabel: "Multi-lingual adaptation"
              },
              {
                title: "Conversion Link Attribution",
                description: "Track unique URLs from pitch to sign-up. Prove ROI by linking PR activity directly to business metrics and sales funnel.",
                link: "/conversion-attribution",
                stat: "₹X Value",
                statLabel: "Per placement tracked"
              },
              {
                title: "Relationship-Assist Agent",
                description: "AI-powered journalist profiling with social listening. Get personalized pitch timing and context based on real-time activity.",
                link: "/relationship-agent",
                stat: "100+ Score",
                statLabel: "Hot opportunity alerts"
              },
              {
                title: "Early Signal Crisis Predictor",
                description: "Detect localized crisis sparks across regional media before national escalation. Proactive risk mitigation for reputation management.",
                link: "/crisis-predictor",
                stat: "45 min",
                statLabel: "Alert lead time"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Link
                  href={feature.link}
                  className="block glass-effect p-10 rounded-lg hover:bg-white/10 transition-all group h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-light group-hover:text-gray-300 transition-colors">
                      {feature.title}
                    </h3>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                  
                  <p className="text-gray-400 font-light mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="border-t border-gray-800 pt-6">
                    <div className="text-4xl font-light mb-2">{feature.stat}</div>
                    <div className="text-sm text-gray-500 font-light">{feature.statLabel}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="py-32 bg-zinc-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-100 rounded-3xl p-12 shadow-2xl border border-gray-200"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black text-center">
              Ready to Transform Your PR Strategy?
            </h2>
            <p className="text-xl text-gray-700 mb-12 font-light text-center max-w-2xl mx-auto">
              Join hundreds of PR professionals who've already revolutionized their workflow with Chorus Bot. 
              Start your free trial today.
            </p>

            <div className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 rounded-lg text-black font-light focus:border-black focus:outline-none"
                />
                <button className="px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all whitespace-nowrap">
                  Start Free Trial
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-light">14-day free trial • No credit card required • Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-32 bg-zinc-900 overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-4"
          >
            Loved by PR Professionals
          </motion.h2>
          <p className="text-center text-gray-400 font-light text-xl">
            See what our customers are saying
          </p>
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 flex-shrink-0">
                {[
                  {
                    name: "Priya Sharma",
                    title: "PR Director, TechCorp India",
                    text: "Chorus Bot transformed how we measure PR impact. We're now showing ₹5L+ in attributed value monthly. The board finally sees PR as revenue-driving.",
                    rating: 5
                  },
                  {
                    name: "Rahul Menon",
                    title: "Founder, Media Bridge PR",
                    text: "The regional narrative engine cut our content creation time by 70%. We're now serving 3x more clients with the same team size.",
                    rating: 5
                  },
                  {
                    name: "Anjali Patel",
                    title: "Communications Lead, FinanceMax",
                    text: "The crisis predictor saved us during a potential PR disaster. Detected negative sentiment 4 hours before it hit mainstream media. Invaluable.",
                    rating: 5
                  },
                  {
                    name: "Vikram Singh",
                    title: "Agency Head, Narrative Labs",
                    text: "Client retention improved by 40% after we started using Chorus Bot. The ROI dashboards make renewals effortless.",
                    rating: 5
                  },
                  {
                    name: "Meera Krishnan",
                    title: "PR Manager, RetailHub",
                    text: "The relationship agent is like having a personal assistant. Our journalist pitch response rate doubled in 3 months.",
                    rating: 5
                  },
                  {
                    name: "Arjun Desai",
                    title: "Senior VP, Impact Communications",
                    text: "Best investment we made this year. The multilingual capabilities alone are worth 10x the subscription cost.",
                    rating: 5
                  },
                ].map((testimonial, i) => (
                  <div
                    key={i}
                    className="w-[400px] flex-shrink-0 bg-gradient-to-br from-white to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-200"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <svg key={j} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 font-light mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t border-gray-300 pt-4">
                      <p className="font-medium text-black">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 font-light">{testimonial.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
