interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

export default function GenerateButton({ onGenerate, isGenerating }: GenerateButtonProps) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      onClick={onGenerate}
      disabled={isGenerating}
    >
      Generate SEO Description
    </button>
  );
}
