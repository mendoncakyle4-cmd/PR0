"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Flame, ThermometerSun, Snowflake, TrendingUp, Mail, Twitter, Calendar, Target, Send, Sparkles } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  publication: string;
  impactScore: number;
  hotScore: number;
  sectors: string[];
  lastPitched: string;
  recentActivity: string;
  sentiment: "positive" | "neutral" | "negative";
}

export default function RelationshipAgent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showNudgeDetail, setShowNudgeDetail] = useState(false);

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Rahul Sharma",
      publication: "The Economic Times",
      impactScore: 94,
      hotScore: 88,
      sectors: ["Fintech", "Banking"],
      lastPitched: "21 days ago",
      recentActivity: "Posted about HDFC's new credit policy 2 hours ago",
      sentiment: "positive",
    },
    {
      id: 2,
      name: "Priya Menon",
      publication: "The Hindu",
      impactScore: 87,
      hotScore: 92,
      sectors: ["Technology", "Startups"],
      lastPitched: "12 days ago",
      recentActivity: "Covered startup funding story yesterday",
      sentiment: "positive",
    },
    {
      id: 3,
      name: "Arjun Patel",
      publication: "Mint",
      impactScore: 91,
      hotScore: 76,
      sectors: ["Finance", "Markets"],
      lastPitched: "45 days ago",
      recentActivity: "Tweeted about market volatility 1 day ago",
      sentiment: "neutral",
    },
  ];

  const priorityNudges = [
    {
      id: 1,
      contact: contacts[1],
      message: "Pitch Priya Menon NOW - Hot Score 92/100",
      reason: "Posted about startup ecosystem 2 hours ago. Your client's Series A announcement aligns perfectly.",
      urgency: "hot" as const,
    },
    {
      id: 2,
      contact: contacts[0],
      message: "Pitch Rahul Sharma TODAY - Hot Score 88/100",
      reason: "Banking reporter at ET posted about HDFC policy. You haven't pitched in 3 weeks. Reference his post.",
      urgency: "hot" as const,
    },
    {
      id: 3,
      contact: contacts[2],
      message: "Follow up with Arjun Patel - Warm Score 76/100",
      reason: "Last pitched 45 days ago. Covered your sector recently. Good time for gentle re-engagement.",
      urgency: "warm" as const,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-500";
    if (score >= 60) return "text-orange-500";
    return "text-blue-500";
  };

  const getUrgencyIcon = (urgency: string) => {
    if (urgency === "hot") return Flame;
    if (urgency === "warm") return ThermometerSun;
    return Snowflake;
  };

  const getUrgencyColor = (urgency: string) => {
    if (urgency === "hot") return "border-red-600 bg-red-600/10";
    if (urgency === "warm") return "border-orange-600 bg-orange-600/10";
    return "border-blue-600 bg-blue-600/10";
  };

  return (
    <main className="min-h-screen pt-20 bg-black">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-light mb-4">Relationship-Assist Agent</h1>
          <p className="text-xl text-gray-400 font-light">
            AI-powered journalist profiling with real-time social listening and personalized pitch timing
          </p>
        </motion.div>

        {/* Priority Nudges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-light mb-6">Priority Nudges - Action Now</h2>
          <div className="grid gap-4">
            {priorityNudges.map((nudge, index) => {
              const UrgencyIcon = getUrgencyIcon(nudge.urgency);
              return (
                <motion.div
                  key={nudge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => {
                    setSelectedContact(nudge.contact);
                    setShowNudgeDetail(true);
                  }}
                  className={`glass-effect p-6 rounded-lg border-2 ${getUrgencyColor(
                    nudge.urgency
                  )} hover:bg-white/10 transition-all cursor-pointer group`}
                >
                  <div className="flex items-start gap-4">
                    <UrgencyIcon className="w-8 h-8 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-medium">{nudge.message}</h3>
                        <span className="text-sm text-gray-500 font-light">{nudge.contact.lastPitched}</span>
                      </div>
                      <p className="text-gray-400 font-light mb-3">{nudge.reason}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{nudge.contact.publication}</span>
                        <span>•</span>
                        <span>Impact Score: {nudge.contact.impactScore}/100</span>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-white text-black font-medium rounded-sm opacity-0 group-hover:opacity-100 transition-all">
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect p-6 rounded-lg mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Sector or Name..."
                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded text-white font-light focus:border-white focus:outline-none"
              />
            </div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-3 bg-black border border-gray-700 rounded text-white font-light focus:border-white focus:outline-none"
            >
              <option value="">All Sectors</option>
              <option value="fintech">Fintech</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="banking">Banking</option>
            </select>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-3 bg-black border border-gray-700 rounded text-white font-light focus:border-white focus:outline-none"
            >
              <option value="">All Regions</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
            </select>
          </div>

          <div className="flex gap-2 mt-4">
            {["Fintech", "Technology", "Banking", "Startups"].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-gray-800 rounded-sm text-sm font-light hover:bg-gray-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-light">Media Contacts ({contacts.length})</h2>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate Fintech Narrative for All
              </button>
              <button className="px-6 py-3 border border-white text-white font-light rounded-sm hover:bg-white hover:text-black transition-all">
                View Segment Report
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => {
                  setSelectedContact(contact);
                  setShowNudgeDetail(true);
                }}
                className="glass-effect p-6 rounded-lg hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-1">{contact.name}</h3>
                    <p className="text-sm text-gray-400 font-light">{contact.publication}</p>
                  </div>
                  <div className={`text-3xl font-light ${getScoreColor(contact.hotScore)}`}>
                    {contact.hotScore}
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  {contact.sectors.map((sector) => (
                    <span
                      key={sector}
                      className="px-2 py-1 bg-gray-800 rounded-sm text-xs font-light"
                    >
                      {sector}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="font-light">Last pitched: {contact.lastPitched}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Twitter className="w-4 h-4" />
                    <span className="font-light">{contact.recentActivity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-light">Impact Score: {contact.impactScore}/100</span>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 bg-gray-800 rounded-sm text-sm font-light group-hover:bg-white group-hover:text-black transition-all">
                  View Full Profile
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nudge Detail Modal */}
        {showNudgeDetail && selectedContact && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-effect p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-light mb-2">{selectedContact.name}</h2>
                  <p className="text-xl text-gray-400 font-light">{selectedContact.publication}</p>
                </div>
                <button
                  onClick={() => setShowNudgeDetail(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* AI-Synthesized Prompt */}
              <div className="bg-yellow-600/10 border-2 border-yellow-600 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">AI Recommendation</h3>
                    <p className="text-gray-300 font-light text-lg">
                      Pitch {selectedContact.name} your Fintech story NOW. They just posted about {selectedContact.sectors[0]} 
                      on X 2 hours ago. You haven't pitched them in {selectedContact.lastPitched}. 
                      Reference their recent post in your opening line to show relevance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contextual Evidence */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4">Contextual Evidence</h3>
                <div className="space-y-4">
                  <div className="glass-effect p-4 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Twitter className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400 font-light">2 hours ago</span>
                    </div>
                    <p className="font-light">
                      "HDFC's new credit policy could reshape retail banking in India. The focus on digital-first 
                      approach aligns with broader fintech trends. Worth watching closely. #Fintech #Banking"
                    </p>
                  </div>

                  <div className="glass-effect p-4 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400 font-light">21 days ago - Accepted</span>
                    </div>
                    <p className="font-light">
                      Last pitch: "Digital payment trends in Tier 2 cities" - Coverage published in ET Banking section
                    </p>
                  </div>
                </div>
              </div>

              {/* Conversion ROI Snapshot */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4">Conversion ROI Snapshot</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass-effect p-4 rounded text-center">
                    <div className="text-3xl font-light mb-1">₹124K</div>
                    <div className="text-sm text-gray-400 font-light">Total Attributed Value</div>
                  </div>
                  <div className="glass-effect p-4 rounded text-center">
                    <div className="text-3xl font-light mb-1">5.1%</div>
                    <div className="text-sm text-gray-400 font-light">Avg Conversion Rate</div>
                  </div>
                  <div className="glass-effect p-4 rounded text-center">
                    <div className="text-3xl font-light mb-1">23</div>
                    <div className="text-sm text-gray-400 font-light">Total Conversions</div>
                  </div>
                </div>
              </div>

              {/* Integrated Pitch Generator */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4">Generate Personalized Pitch</h3>
                <div className="glass-effect p-4 rounded mb-4">
                  <p className="text-gray-400 font-light mb-4">
                    AI-generated pitch referencing recent activity:
                  </p>
                  <div className="bg-black border border-gray-700 rounded p-4 font-light">
                    Hi {selectedContact.name},
                    <br /><br />
                    I saw your insightful post about HDFC's new credit policy and its alignment with digital-first banking. 
                    This connects perfectly with a story I'd like to share about [Client Company]'s innovative fintech solution 
                    that's revolutionizing retail banking in Tier 2 cities.
                    <br /><br />
                    [AI continues with culturally-nuanced pitch...]
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowNudgeDetail(false)}
                  className="flex-1 py-4 border border-white text-white font-light rounded-sm hover:bg-white hover:text-black transition-all"
                >
                  Close
                </button>
                <button className="flex-1 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Personalized Pitch
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
