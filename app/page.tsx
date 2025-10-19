"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
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
              className="text-6xl md:text-8xl font-light mb-6 tracking-tight"
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
              <Link
                href="/regional-narrative"
                className="group px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                Explore Platform
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
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

      {/* Core Problem Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-light mb-6">The Hair-on-Fire Problem</h2>
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

      {/* Features Preview Section */}
      <section className="py-32 bg-gradient-to-b from-black to-zinc-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-light mb-6">Four Core Components</h2>
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

      {/* CTA Section */}
      <section className="py-32 bg-zinc-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-light mb-6">
              Transform PR into a Profit Driver
            </h2>
            <p className="text-xl text-gray-400 mb-12 font-light">
              Stop calculating Ad Value Equivalency. Start proving business impact.
            </p>
            <Link
              href="/conversion-attribution"
              className="inline-block px-12 py-5 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all text-lg"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
