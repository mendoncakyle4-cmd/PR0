"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, MapPin, Clock, Twitter, MessageSquare, Shield, FileText, Send } from "lucide-react";

interface CrisisAlert {
  id: number;
  client: string;
  riskScore: number;
  region: string;
  language: string;
  topic: string;
  triggerEvent: string;
  timeElapsed: string;
  sentiment: number;
  keywords: string[];
  sources: { type: string; count: number }[];
}

export default function CrisisPredictor() {
  const [selectedClient, setSelectedClient] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState<CrisisAlert | null>(null);
  const [showAlertDetail, setShowAlertDetail] = useState(false);
  const [viewMode, setViewMode] = useState<"active" | "history">("active");

  const globalRiskScore = 67;

  const alerts: CrisisAlert[] = [
    {
      id: 1,
      client: "TechCorp India",
      riskScore: 88,
      region: "Mumbai",
      language: "Marathi",
      topic: "Product Flaw",
      triggerEvent: "7 posts in last 45 minutes on X & 2 regional blogs",
      timeElapsed: "45 min ago",
      sentiment: -0.72,
      keywords: ["faulty design", "refund scam", "customer service"],
      sources: [
        { type: "X/Twitter", count: 7 },
        { type: "Regional Blogs", count: 2 },
        { type: "WhatsApp Groups", count: 3 },
      ],
    },
    {
      id: 2,
      client: "FinanceMax",
      riskScore: 76,
      region: "Delhi",
      language: "Hindi",
      topic: "Service Issue",
      triggerEvent: "Negative trending hashtag on regional X",
      timeElapsed: "2 hours ago",
      sentiment: -0.58,
      keywords: ["delayed payment", "poor support", "नहीं चलेगा"],
      sources: [
        { type: "X/Twitter", count: 12 },
        { type: "Local News", count: 1 },
      ],
    },
    {
      id: 3,
      client: "RetailHub",
      riskScore: 64,
      region: "Bangalore",
      language: "Kannada",
      topic: "Competitor Attack",
      triggerEvent: "Competitor PR campaign gaining traction",
      timeElapsed: "4 hours ago",
      sentiment: -0.45,
      keywords: ["comparison", "better alternative", "switching"],
      sources: [
        { type: "Social Media", count: 8 },
        { type: "Tech Blogs", count: 2 },
      ],
    },
  ];

  const getRiskColor = (score: number) => {
    if (score >= 80) return { bg: "bg-red-600/10", border: "border-red-600", text: "text-red-500" };
    if (score >= 60) return { bg: "bg-orange-600/10", border: "border-orange-600", text: "text-orange-500" };
    return { bg: "bg-yellow-600/10", border: "border-yellow-600", text: "text-yellow-500" };
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return "CRITICAL";
    if (score >= 60) return "HIGH";
    return "MODERATE";
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Early Signal Crisis Predictor</h1>
          <p className="text-xl text-gray-400 font-light">
            Proactive risk mitigation: Detect localized crisis sparks before national escalation
          </p>
        </motion.div>

        {/* Client Selector & Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="px-6 py-3 bg-gray-900 border border-gray-700 rounded text-white font-light focus:border-white focus:outline-none"
            >
              <option value="all">All Clients</option>
              <option value="techcorp">TechCorp India</option>
              <option value="financemax">FinanceMax</option>
              <option value="retailhub">RetailHub</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("active")}
                className={`px-6 py-3 rounded-sm font-light transition-all ${
                  viewMode === "active" ? "bg-white text-black" : "bg-gray-800 text-white"
                }`}
              >
                Active Threats
              </button>
              <button
                onClick={() => setViewMode("history")}
                className={`px-6 py-3 rounded-sm font-light transition-all ${
                  viewMode === "history" ? "bg-white text-black" : "bg-gray-800 text-white"
                }`}
              >
                Mitigation History
              </button>
            </div>
          </div>
        </div>

        {/* Global Risk Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect p-8 rounded-lg mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-400 mb-2">Global Risk Score</h2>
              <p className="text-sm text-gray-500 font-light">Aggregated across all monitored clients</p>
            </div>
            <div className="text-center">
              <div className={`text-7xl font-light mb-2 ${getRiskColor(globalRiskScore).text}`}>
                {globalRiskScore}
              </div>
              <div className={`px-4 py-1 rounded-sm text-sm font-medium ${getRiskColor(globalRiskScore).bg} ${getRiskColor(globalRiskScore).border} border`}>
                {getRiskLabel(globalRiskScore)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Alerts */}
        {viewMode === "active" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-light">Local Spark Alerts ({alerts.length})</h2>
              <div className="flex gap-2">
                {["Product Flaw", "C-Suite", "Service Issue", "Competitor Attack"].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 bg-gray-800 rounded-sm text-sm font-light hover:bg-gray-700 transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {alerts.map((alert, index) => {
                const riskColors = getRiskColor(alert.riskScore);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => {
                      setSelectedAlert(alert);
                      setShowAlertDetail(true);
                    }}
                    className={`glass-effect p-6 rounded-lg border-2 ${riskColors.bg} ${riskColors.border} hover:bg-white/10 transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start gap-6">
                      {/* Risk Score */}
                      <div className="text-center flex-shrink-0">
                        <div className={`text-5xl font-light mb-2 ${riskColors.text}`}>
                          {alert.riskScore}
                        </div>
                        <div className="text-xs text-gray-500 font-light">RISK</div>
                      </div>

                      {/* Alert Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-medium">{alert.client}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="font-light">{alert.timeElapsed}</span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="font-light">{alert.region} • {alert.language}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-gray-400" />
                            <span className="font-light">{alert.topic}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingDown className="w-4 h-4 text-gray-400" />
                            <span className="font-light">Sentiment: {(alert.sentiment * 100).toFixed(0)}%</span>
                          </div>
                        </div>

                        <p className="text-gray-300 font-light mb-4">
                          <strong>Trigger:</strong> {alert.triggerEvent}
                        </p>

                        <div className="flex gap-2 flex-wrap">
                          {alert.keywords.map((keyword, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-red-600/20 border border-red-600 rounded-sm text-xs font-light"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <button className="px-6 py-3 bg-white text-black font-medium rounded-sm opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                        Investigate
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Mitigation History */}
        {viewMode === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-8 rounded-lg"
          >
            <h2 className="text-3xl font-light mb-6">Past Crises & Resolutions</h2>
            <div className="space-y-4">
              {[
                { client: "TechCorp", issue: "Product recall", resolved: "3 days", outcome: "Contained to regional media" },
                { client: "FinanceMax", issue: "Data breach rumor", resolved: "1 day", outcome: "False alarm - proactive statement issued" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-green-600/10 border border-green-600 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">{item.client} - {item.issue}</h3>
                      <p className="text-sm text-gray-400 font-light">{item.outcome}</p>
                    </div>
                    <div className="text-sm text-gray-400">Resolved in {item.resolved}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Alert Detail Modal */}
        {showAlertDetail && selectedAlert && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-effect p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className={`inline-block px-4 py-2 rounded-sm text-sm font-medium mb-3 ${getRiskColor(selectedAlert.riskScore).bg} ${getRiskColor(selectedAlert.riskScore).border} border`}>
                    RISK {selectedAlert.riskScore}/100 - {getRiskLabel(selectedAlert.riskScore)}
                  </div>
                  <h2 className="text-4xl font-bold mb-2">{selectedAlert.client}</h2>
                  <p className="text-xl text-gray-400 font-light">{selectedAlert.topic} Crisis</p>
                </div>
                <button
                  onClick={() => setShowAlertDetail(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* The Trigger Event */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4">Trigger Event</h3>
                <div className="glass-effect p-6 rounded-lg">
                  <p className="text-xl font-light mb-4">{selectedAlert.triggerEvent}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Detected {selectedAlert.timeElapsed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedAlert.region} ({selectedAlert.language})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sentiment & Keyword Breakdown */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4">Sentiment Analysis</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-effect p-6 rounded-lg">
                    <div className="text-sm text-gray-400 mb-2 font-light">Overall Sentiment</div>
                    <div className="text-4xl font-light text-red-500 mb-4">
                      {(selectedAlert.sentiment * 100).toFixed(0)}%
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${Math.abs(selectedAlert.sentiment) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="glass-effect p-6 rounded-lg">
                    <div className="text-sm text-gray-400 mb-3 font-light">Negative Keywords</div>
                    <div className="flex gap-2 flex-wrap">
                      {selectedAlert.keywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-red-600/20 border border-red-600 rounded-sm text-sm font-light"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Geographic Source Map */}
              <div className="mb-8">
                <h3 className="text-2xl font-light mb-4">Source Breakdown</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedAlert.sources.map((source, i) => (
                    <div key={i} className="glass-effect p-4 rounded text-center">
                      <div className="text-3xl font-light mb-2">{source.count}</div>
                      <div className="text-sm text-gray-400 font-light">{source.type}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mitigation Suggestions */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">AI-Recommended Actions</h3>
                <div className="space-y-3">
                  {[
                    { priority: 1, action: "Draft localized response in Marathi addressing product quality concerns" },
                    { priority: 2, action: "Prepare holding statement for national media outlets" },
                    { priority: 3, action: "Alert customer service team to monitor regional channels" },
                    { priority: 4, action: "Schedule crisis briefing with C-suite in next 2 hours" },
                  ].map((item) => (
                    <div key={item.priority} className="flex items-start gap-4 p-4 bg-gray-900 rounded">
                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 font-medium">
                        {item.priority}
                      </div>
                      <p className="font-light flex-1">{item.action}</p>
                      <button className="px-4 py-2 bg-gray-800 rounded-sm text-sm font-light hover:bg-gray-700">
                        Assign
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* One-Click Response Generation */}
              <div className="mb-8">
                <div className="glass-effect p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-light">Generate Crisis Response</h3>
                    <Shield className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-400 font-light mb-4">
                    Automatically generate a culturally-appropriate holding statement in {selectedAlert.language} 
                    using the Regional Narrative Engine
                  </p>
                  <button className="w-full py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    Generate Holding Statement
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowAlertDetail(false)}
                  className="flex-1 py-4 border border-white text-white font-light rounded-sm hover:bg-white hover:text-black transition-all"
                >
                  Close
                </button>
                <button className="flex-1 py-4 bg-red-600 text-white font-medium rounded-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Escalate to Crisis Team
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
