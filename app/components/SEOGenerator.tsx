"use client";
import { useState, useEffect } from 'react';
import TextInput from "./TextInput";
import GenerateButton from "./GenerateButton";
import ResultDisplay from "./ResultDisplay";
import FileUpload from "./FileUpload";

const models = [
  { value: 'gpt-4o-mini-2024-07-18-free', label: 'GPT-4o mini (Default, Free)' },
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'claude-3-5-sonnet-20240620', label: 'Claude 3.5 Sonnet' },
];

export default function SEOGenerator() {
  const [content, setContent] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini-2024-07-18-free");
  const [openaiKey, setOpenaiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [isGenerateDisabled, setIsGenerateDisabled] = useState(true);


  useEffect(() => {
    setIsGenerateDisabled(content.trim() === '');
  }, [content]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    let customerCredentials = {};
    if (selectedModel === "gpt-4o" && openaiKey) {
      customerCredentials = { openai: { api_key: openaiKey } };
    } else if (selectedModel === "claude-3-5-sonnet-20240620" && anthropicKey) {
      customerCredentials = { anthropic: { api_key: anthropicKey } };
    }
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          model: selectedModel,
          customer_credentials: customerCredentials,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate SEO description");
      }

      const data = await response.json();
      setSeoDescription(data.description);
    } catch (error) {
      console.error("Error:", error);
      setSeoDescription(
        "Failed to generate SEO description. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(seoDescription)
      .then(() => alert("SEO description copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const handleReset = () => {
    setContent('');
    setSeoDescription('');
    setResetTrigger(prev => prev + 1);
    setSelectedModel('gpt-4o-mini-2024-07-18-free');
    setOpenaiKey('');
    setAnthropicKey('');
  };

  const handleFileContent = (fileContent: string) => {
    setContent(fileContent);
  };

  return (
    <div>
      <div className="mb-4">
        <TextInput content={content} setContent={setContent} />
      </div>
      <div className="mb-4">
        <FileUpload
          onFileContent={handleFileContent}
          resetTrigger={resetTrigger}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="model-select" className="block mb-2">
          Select Model:
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>
      {selectedModel === "gpt-4o" && (
        <div className="mb-4">
          <label htmlFor="openai-key" className="block mb-2">
            OpenAI API Key:
          </label>
          <input
            type="password"
            id="openai-key"
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your OpenAI API key"
          />
        </div>
      )}
      {selectedModel === "claude-3-5-sonnet-20240620" && (
        <div className="mb-4">
          <label htmlFor="anthropic-key" className="block mb-2">
            Anthropic API Key:
          </label>
          <input
            type="password"
            id="anthropic-key"
            value={anthropicKey}
            onChange={(e) => setAnthropicKey(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your Anthropic API key"
          />
        </div>
      )}
      <div className="gap-[8px] flex-row ">
        <GenerateButton
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          disabled={isGenerateDisabled}
        />
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <ResultDisplay seoDescription={seoDescription} onCopy={handleCopy} />
    </div>
  );
}
