"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Sparkles, Copy, Check, RefreshCw, Send } from "lucide-react";

export default function RegionalNarrative() {
  const [step, setStep] = useState(1);
  const [sourceText, setSourceText] = useState("");
  const [coreThesis, setCoreThesis] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedMediaType, setSelectedMediaType] = useState("");
  const [tonePreset, setTonePreset] = useState("formal");
  const [wordCount, setWordCount] = useState(250);
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [autoSummarize, setAutoSummarize] = useState(false);

  const regions = [
    { value: "mumbai", label: "Mumbai", language: "Marathi" },
    { value: "delhi", label: "Delhi", language: "Hindi" },
    { value: "chennai", label: "Chennai", language: "Tamil" },
    { value: "bangalore", label: "Bangalore", language: "Kannada" },
    { value: "kolkata", label: "Kolkata", language: "Bengali" },
    { value: "hyderabad", label: "Hyderabad", language: "Telugu" },
  ];

  const mediaTypes = ["Financial Daily", "Tech Blog", "Consumer Magazine", "Policy Journal", "Lifestyle Publication"];
  const tonePresets = [
    { value: "formal", label: "Formal" },
    { value: "urgent", label: "Urgent/Crisis" },
    { value: "engaging", label: "B2C/Engaging" },
    { value: "analytical", label: "Policy-Driven/Analytical" },
  ];

  const handleGenerate = () => {
    // Simulate AI generation
    setGeneratedText(
      `मुंबई में नया फिनटेक क्रांति: ${coreThesis}\n\nप्रमुख बिंदु:\n• क्षेत्रीय बाजार में महत्वपूर्ण प्रगति\n• स्थानीय उद्यमियों के लिए नए अवसर\n• डिजिटल भुगतान में वृद्धि\n\n[AI-generated culturally-nuanced narrative in ${selectedLanguage} for ${selectedMediaType}]`
    );
    setStep(3);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
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
          <h1 className="text-5xl md:text-6xl font-light mb-4">Regional Narrative Engine</h1>
          <p className="text-xl text-gray-400 font-light">
            Transform one English press release into multiple culturally-nuanced regional narratives in under 30 seconds
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-light transition-all ${
                  s <= step ? "bg-white text-black" : "bg-gray-800 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-px mx-4 transition-all ${
                    s < step ? "bg-white" : "bg-gray-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Source Content Ingestion */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-effect p-8 rounded-lg mb-6">
              <h2 className="text-3xl font-light mb-6">Step 1: Source Content</h2>

              {/* Auto-Summarize Toggle */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setAutoSummarize(!autoSummarize)}
                  className={`px-6 py-2 rounded-sm font-light transition-all ${
                    autoSummarize ? "bg-white text-black" : "bg-gray-800 text-white"
                  }`}
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Auto-Summarize
                </button>
                {autoSummarize && (
                  <span className="text-sm text-gray-400">
                    AI will generate a 3-paragraph executive summary
                  </span>
                )}
              </div>

              {/* Source Text Input */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2 font-light">
                  Source Text (English)
                </label>
                <textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Paste your press release, drag & drop a file, or insert a link..."
                  className="w-full h-64 bg-black border border-gray-700 rounded p-4 text-white font-light focus:border-white focus:outline-none transition-colors resize-none"
                />
                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm font-light">Upload File</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-light">From Link</span>
                  </button>
                </div>
              </div>

              {/* Core Thesis */}
              <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-2 font-light">
                  Core Thesis (Required) *
                </label>
                <input
                  type="text"
                  value={coreThesis}
                  onChange={(e) => setCoreThesis(e.target.value)}
                  placeholder="The single most important truth of this story..."
                  className="w-full bg-black border-2 border-yellow-600 rounded p-4 text-white font-light focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2 font-light">
                  This anchors all regional adaptations to ensure message consistency
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!sourceText || !coreThesis}
                className="w-full py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Contextual Targeting
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Contextual Targeting & Control */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-effect p-8 rounded-lg mb-6">
              <h2 className="text-3xl font-light mb-6">Step 2: Contextual Targeting</h2>

              {/* Region/Language Selector */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => {
                      setSelectedRegion(e.target.value);
                      const region = regions.find((r) => r.value === e.target.value);
                      if (region) setSelectedLanguage(region.language);
                    }}
                    className="w-full bg-black border border-gray-700 rounded p-3 text-white font-light focus:border-white focus:outline-none"
                  >
                    <option value="">Select Region</option>
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Language</label>
                  <input
                    type="text"
                    value={selectedLanguage}
                    readOnly
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-gray-400 font-light cursor-not-allowed"
                    placeholder="Auto-selected"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Media Type</label>
                  <select
                    value={selectedMediaType}
                    onChange={(e) => setSelectedMediaType(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded p-3 text-white font-light focus:border-white focus:outline-none"
                  >
                    <option value="">Select Type</option>
                    {mediaTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tonal Presets */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-3 font-light">Tone</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {tonePresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setTonePreset(preset.value)}
                      className={`py-3 px-4 rounded-sm font-light transition-all ${
                        tonePreset === preset.value
                          ? "bg-white text-black"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Word Count */}
              <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-3 font-light">
                  Target Word Count: {wordCount} words
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="100"
                    max="500"
                    step="50"
                    value={wordCount}
                    onChange={(e) => setWordCount(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWordCount(100)}
                      className="px-4 py-2 bg-gray-800 rounded text-sm font-light hover:bg-gray-700"
                    >
                      Short
                    </button>
                    <button
                      onClick={() => setWordCount(250)}
                      className="px-4 py-2 bg-gray-800 rounded text-sm font-light hover:bg-gray-700"
                    >
                      Medium
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-white text-white font-light rounded-sm hover:bg-white hover:text-black transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!selectedRegion || !selectedMediaType}
                  className="flex-1 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Narrative
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Generation & Review */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="glass-effect p-8 rounded-lg">
              <h2 className="text-3xl font-light mb-6">Step 3: Review & Refine</h2>

              {/* Side-by-Side Comparison */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Source */}
                <div>
                  <h3 className="text-sm text-gray-400 mb-3 font-light">Source Text (English)</h3>
                  <div className="bg-black border border-gray-700 rounded p-4 h-80 overflow-y-auto">
                    <p className="text-white font-light whitespace-pre-wrap">{sourceText}</p>
                  </div>
                </div>

                {/* Generated */}
                <div>
                  <h3 className="text-sm text-gray-400 mb-3 font-light">
                    Generated ({selectedLanguage} - {selectedMediaType})
                  </h3>
                  <div className="bg-black border border-green-600 rounded p-4 h-80 overflow-y-auto">
                    <p className="text-white font-light whitespace-pre-wrap">{generatedText}</p>
                  </div>
                </div>
              </div>

              {/* Refine Prompt */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2 font-light">
                  Refine this result (optional)
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="e.g., 'Make the opening paragraph more aggressive' or 'Use simpler language'"
                    className="flex-1 bg-black border border-gray-700 rounded p-3 text-white font-light focus:border-white focus:outline-none"
                  />
                  <button className="px-6 py-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-4 border border-white text-white font-light rounded-sm hover:bg-white hover:text-black transition-all"
                >
                  Modify Parameters
                </button>
                <button
                  onClick={handleCopy}
                  className="flex-1 py-4 bg-gray-800 text-white font-light rounded-sm hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
                <button className="flex-1 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Pitch Ready
                </button>
              </div>

              {/* Feedback Loop */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-3 font-light">
                  Did you need to make manual edits?
                </p>
                <div className="flex gap-3">
                  {["Tone was wrong", "Language inaccurate", "Wrong terminology", "Cultural context missed"].map((feedback) => (
                    <button
                      key={feedback}
                      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-sm text-sm font-light hover:border-gray-500 transition-colors"
                    >
                      {feedback}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
