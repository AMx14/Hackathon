'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Upload, Info, AlertCircle } from 'lucide-react'

const CryptoAlgorithmSelect = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("")

  const algorithms = [
    { value: "aes", label: "AES" },
    { value: "kasumi", label: "KASUMI" },
    { value: "3des", label: "3DES" },
    { value: "present", label: "PRESENT" },
    { value: "rsa", label: "RSA" },
    { value: "elgamal", label: "ElGamal" },
  ]

  return (
    <div className="w-full space-y-2">
      <label htmlFor="algorithm-select" className="block text-sm font-medium mb-2">
        Known Algorithm (Optional)
      </label>
      <select
        id="algorithm-select"
        className="w-full px-3 py-2 bg-background text-foreground border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
      >
        <option value="">Select an algorithm</option>
        <optgroup label="Symmetric Key Algorithms">
          {algorithms.slice(0, 4).map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Asymmetric Key Algorithms">
          {algorithms.slice(4).map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.label}
            </option>
          ))}
        </optgroup>
      </select>
      {selectedAlgorithm && (
        <p className="text-sm text-muted-foreground mt-2">
          Selected algorithm: {algorithms.find(algo => algo.value === selectedAlgorithm)?.label}
        </p>
      )}
    </div>
  )
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const acceptedFormats = ['.csv', '.json', '.txt']
  const maxFileSize = 10 * 1024 * 1024 // 10MB

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > maxFileSize) {
        setError('File size exceeds the 10MB limit.')
        return
      }
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()
      if (!acceptedFormats.includes(`.${fileExtension}`)) {
        setError(`Unsupported file format. Please upload a ${acceptedFormats.join(', ')} file.`)
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.classList.add('border-primary')
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.classList.remove('border-primary')
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.classList.remove('border-primary')
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      if (droppedFile.size > maxFileSize) {
        setError('File size exceeds the 10MB limit.')
        return
      }
      const fileExtension = droppedFile.name.split('.').pop()?.toLowerCase()
      if (!acceptedFormats.includes(`.${fileExtension}`)) {
        setError(`Unsupported file format. Please upload a ${acceptedFormats.join(', ')} file.`)
        return
      }
      setFile(droppedFile)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.')
      return
    }
    setUploading(true)
    setProgress(0)

    // Simulating file upload and analysis
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setProgress(i)
    }

    setUploading(false)
    // Here you would typically send the file to your server for actual processing
    console.log('File uploaded:', file.name)

    // Simulate analysis results
    const analysisResults = {
      algorithm: 'AES',
      confidence: 87,
      distribution: [
        { name: 'AES', value: 87 },
        { name: 'RSA', value: 5 },
        { name: 'DES', value: 3 },
        { name: 'Other', value: 5 },
      ]
    }

    // Redirect to results page with analysis data
    router.push(`/results?results=${encodeURIComponent(JSON.stringify(analysisResults))}`)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Your Encrypted Dataset</h1>
          <p className="text-muted-foreground">Follow the steps below to identify the cryptographic algorithm.</p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Instructions</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside">
              <li>Accepted formats: {acceptedFormats.join(', ')}</li>
              <li>Maximum file size: 10MB</li>
              <li>
                <a href="#" className="text-primary hover:underline">
                  View guide for sample datasets
                </a>
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        <div
          className="border-2 border-dashed rounded-lg p-12 text-center mb-6 transition-colors duration-300 ease-in-out"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg mb-4">Drag and drop your file here, or click to select</p>
          <Input
            type="file"
            onChange={handleFileChange}
            accept={acceptedFormats.join(',')}
            className="hidden"
            id="file-upload"
            ref={fileInputRef}
          />
          <Button onClick={handleButtonClick}>Select File</Button>
          {file && (
            <p className="mt-4 text-sm text-muted-foreground">
              Selected file: {file.name}
            </p>
          )}
        </div>

        <div className="mb-6">
          <CryptoAlgorithmSelect />
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full mb-4"
        >
          {uploading ? 'Analyzing...' : 'Upload & Analyze'}
        </Button>

        {uploading && (
          <div className="mb-6">
            <Progress value={progress} className="w-full" />
            <p className="text-center mt-2">Analyzing data... {progress}% complete</p>
          </div>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Info className="h-4 w-4 mr-2" />
                <span>Your data is kept private and confidential</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>We use industry-standard encryption to protect your data.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}