'use client';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileContent: (content: string) => void;
  resetTrigger: number;
}

export default function FileUpload({ onFileContent, resetTrigger }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/parse-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File parsing failed');
      }

      const { content } = await response.json();
      onFileContent(content);
    } catch (error) {
      console.error('Error parsing file:', error);
      alert('Failed to parse file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [onFileContent]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ 
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    noClick: true,
    noKeyboard: true
  });

  useEffect(() => {
    setFileName(null);
    setIsUploading(false);
  }, [resetTrigger]);

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4 text-center">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the file here ...</p> :
          <p>Drag & drop a file here, or <button onClick={open} className="text-blue-500 underline">click to select a file</button> (.txt, .doc, .docx)</p>
      }
      {isUploading && <p>Uploading and parsing file...</p>}
      {fileName && !isUploading && <p>File uploaded: {fileName}</p>}
    </div>
  );
}