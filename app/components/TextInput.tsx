import { Dispatch, SetStateAction } from 'react';

interface TextInputProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

export default function TextInput({ content, setContent }: TextInputProps) {
  return (
    <div>
      <label htmlFor="content" className="block mb-2">Enter your content:</label>
      <textarea
        id="content"
        className="w-full p-2 border rounded"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
}
