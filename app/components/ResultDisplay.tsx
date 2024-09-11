

interface ResultDisplayProps {
    seoDescription: string;
    onCopy: () => void;
  }
  
  export default function ResultDisplay({ seoDescription, onCopy }: ResultDisplayProps) {
    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Generated SEO Description:</h2>
        <div className="flex items-start space-x-2">
          <p className="p-2 border rounded bg-gray-100 flex-grow">
            {seoDescription || 'No description generated yet.'}
          </p>
          {seoDescription && (
            <button
              className="bg-slate-600 text-white px-3 py-2 rounded"
              onClick={onCopy}
            >
              Copy
            </button>
          )}
        </div>
      </div>
    );
  }