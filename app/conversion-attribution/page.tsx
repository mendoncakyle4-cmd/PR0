"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Copy, Check, TrendingUp, BarChart3, ExternalLink, Plus, Settings } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ConversionAttribution() {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [integrationStatus, setIntegrationStatus] = useState({
    analytics: true,
    mixpanel: false,
    crm: true,
  });

  const placementData = [
    { source: "The Hindu", clicks: 234, conversions: 12, value: 48000, rate: 5.1 },
    { source: "Economic Times", clicks: 456, conversions: 23, value: 92000, rate: 5.0 },
    { source: "Times of India", clicks: 789, conversions: 31, value: 124000, rate: 3.9 },
    { source: "Mint", clicks: 123, conversions: 8, value: 32000, rate: 6.5 },
    { source: "Business Standard", clicks: 345, conversions: 18, value: 72000, rate: 5.2 },
  ];

  const trendData = [
    { month: "Jan", value: 125000 },
    { month: "Feb", value: 178000 },
    { month: "Mar", value: 245000 },
    { month: "Apr", value: 312000 },
    { month: "May", value: 368000 },
  ];

  const totalAttributedValue = placementData.reduce((sum, p) => sum + p.value, 0);
  const totalConversions = placementData.reduce((sum, p) => sum + p.conversions, 0);
  const avgConversionRate = (placementData.reduce((sum, p) => sum + p.rate, 0) / placementData.length).toFixed(2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Conversion Link Attribution</h1>
          <p className="text-xl text-gray-400 font-light">
            The ROI Driver: Transform PR from cost-center to profit-driver with quantifiable business impact
          </p>
        </motion.div>

        {/* Integration Status Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect p-6 rounded-lg mb-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Integration Status</h2>
            <button className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-light">Manage Integrations</span>
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              { name: "Google Analytics", status: integrationStatus.analytics, key: "analytics" },
              { name: "Mixpanel", status: integrationStatus.mixpanel, key: "mixpanel" },
              { name: "CRM System", status: integrationStatus.crm, key: "crm" },
            ].map((integration) => (
              <div
                key={integration.key}
                className={`p-4 rounded border ${
                  integration.status ? "border-green-600 bg-green-600/10" : "border-yellow-600 bg-yellow-600/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-light">{integration.name}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      integration.status ? "bg-green-600" : "bg-yellow-600"
                    }`}
                  >
                    {integration.status ? "Active" : "Re-Auth Needed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Total Attributed Value",
              value: `₹${(totalAttributedValue / 1000).toFixed(0)}K`,
              change: "+28%",
              icon: TrendingUp,
            },
            {
              label: "Total Conversions",
              value: totalConversions,
              change: "+18%",
              icon: BarChart3,
            },
            {
              label: "Avg. Conversion Rate",
              value: `${avgConversionRate}%`,
              change: "vs 3.2% site-wide",
              icon: BarChart3,
            },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-effect p-6 rounded-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm text-gray-400 font-light">{metric.label}</span>
                <metric.icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-4xl font-light mb-2">{metric.value}</div>
              <div className="text-sm text-green-500 font-light">{metric.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Create New Link Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <button
            onClick={() => setShowLinkModal(true)}
            className="px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Tracking Link
          </button>
        </motion.div>

        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect p-8 rounded-lg mb-8"
        >
          <h2 className="text-3xl font-bold mb-6">Attributed Value Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: "#000", border: "1px solid #333" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={{ fill: "#fff" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Placement Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect p-8 rounded-lg mb-8"
        >
          <h2 className="text-3xl font-bold mb-6">Placement Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 font-light text-gray-400">Source</th>
                  <th className="text-right py-4 px-4 font-light text-gray-400">Clicks</th>
                  <th className="text-right py-4 px-4 font-light text-gray-400">Conversions</th>
                  <th className="text-right py-4 px-4 font-light text-gray-400">Conv. Rate</th>
                  <th className="text-right py-4 px-4 font-light text-gray-400">Attributed Value</th>
                  <th className="text-right py-4 px-4 font-light text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {placementData.map((placement, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-light">{placement.source}</td>
                    <td className="text-right py-4 px-4 font-light">{placement.clicks}</td>
                    <td className="text-right py-4 px-4 font-light text-green-500">{placement.conversions}</td>
                    <td className="text-right py-4 px-4 font-light">{placement.rate}%</td>
                    <td className="text-right py-4 px-4 font-light text-xl">₹{(placement.value / 1000).toFixed(0)}K</td>
                    <td className="text-right py-4 px-4">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Conversion Rate Benchmarker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect p-8 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Conversion Rate Benchmarker</h2>
          <p className="text-gray-400 font-light mb-6">
            PR-attributed traffic converts at {avgConversionRate}% vs. site-wide average of 3.2%
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={[
                { name: "PR Traffic", rate: parseFloat(avgConversionRate) },
                { name: "Site-Wide Avg", rate: 3.2 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: "#000", border: "1px solid #333" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="rate" fill="#fff" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Create Link Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-effect p-8 rounded-lg max-w-2xl w-full"
            >
              <h2 className="text-3xl font-bold mb-6">Create New Tracking Link</h2>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Campaign Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Product Launch Q1"
                    className="w-full bg-black border border-gray-700 rounded p-3 text-white font-light focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Source (Publication)</label>
                  <select className="w-full bg-black border border-gray-700 rounded p-3 text-white font-light focus:border-white focus:outline-none">
                    <option>Select from journalist contacts...</option>
                    <option>The Hindu</option>
                    <option>Economic Times</option>
                    <option>Times of India</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Destination URL</label>
                  <input
                    type="text"
                    placeholder="https://yoursite.com/landing-page"
                    className="w-full bg-black border border-gray-700 rounded p-3 text-white font-light focus:border-white focus:outline-none"
                  />
                </div>

                <div className="bg-green-600/10 border border-green-600 rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400 font-light">Generated Tracking URL</span>
                    <button
                      onClick={() => handleCopy("https://chor.us/abc123")}
                      className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-1"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="text-white font-mono">https://chor.us/abc123</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="flex-1 py-3 border border-white text-white font-light rounded-sm hover:bg-white hover:text-black transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="flex-1 py-3 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all"
                >
                  Create Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
