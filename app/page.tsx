"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Animated Stars Background */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated stars in space */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Shooting stars */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                width: '100px',
                left: '-100px',
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: ['0vw', '120vw'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 4,
                ease: "linear",
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

      {/* Core Problem Section - Flickering Indian Language Letters */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Animated Indian language letters background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {['अ', 'आ', 'க', 'త', 'ಕ', 'ক', 'પ', 'ਅ', 'ମ', 'अ', 'ா', 'ు', 'ಾ', 'া', 'ા', 'ਾ', 'ା'].map((letter, i) => (
            <motion.div
              key={i}
              className="absolute text-white text-4xl font-light"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.6, 0.1],
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

      {/* Features Preview Section - Rotating Cogs Background */}
      <section id="core-components" className="py-32 bg-gradient-to-b from-black to-zinc-900 relative overflow-hidden">
        {/* Animated cogs and machinery */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-4 border-white rounded-full"
              style={{
                width: `${100 + i * 40}px`,
                height: `${100 + i * 40}px`,
                left: `${20 + (i % 3) * 30}%`,
                top: `${10 + Math.floor(i / 3) * 30}%`,
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Cog teeth */}
              {[...Array(8)].map((_, j) => (
                <div
                  key={j}
                  className="absolute w-2 h-4 bg-white"
                  style={{
                    left: '50%',
                    top: '-2px',
                    transform: `translateX(-50%) rotate(${j * 45}deg)`,
                    transformOrigin: `center ${50 + i * 20}px`,
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
