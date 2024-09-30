'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Upload, Info, AlertCircle, CheckCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'

export default function ModelTrainingPage() {
  const [file, setFile] = useState<File | null>(null)
  const [algorithm, setAlgorithm] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [featureData, setFeatureData] = useState<any[]>([])

  const acceptedFormats = ['.csv', '.json', '.txt']
  const maxFileSize = 100 * 1024 * 1024 // 100MB

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > maxFileSize) {
        setError('File size exceeds the 100MB limit.')
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

  const handleUpload = async () => {
    if (!file || !algorithm) {
      setError('Please select a file and choose an algorithm before uploading.')
      return
    }
    setIsUploading(true)
    setUploadProgress(0)
    setError(null)
    setSuccess(null)

    // Simulating file upload
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setUploadProgress(i)
    }

    setIsUploading(false)
    startTraining()
  }

  const startTraining = () => {
    setCurrentPhase('Feature extraction')
    setTrainingProgress(0)

    // Simulating training process
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setSuccess('Model successfully trained and saved!')
          return 100
        }
        if (prev === 30) setCurrentPhase('Training model with dataset')
        if (prev === 70) setCurrentPhase('Validating model')
        return prev + 1
      })
    }, 300)

    // Simulating feature extraction
    const featureInterval = setInterval(() => {
      setFeatureData(prevData => {
        const newData = [...prevData]
        newData.push({
          name: `Feature ${newData.length + 1}`,
          [algorithm]: Math.floor(Math.random() * 100)
        })
        return newData.slice(-10) // Keep only the last 10 data points
      })
    }, 1000)

    setTimeout(() => clearInterval(featureInterval), 30000) // Stop after 30 seconds
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Train a Custom Cryptographic Model</h1>
        <p className="text-center text-muted-foreground mb-8">
          Upload labeled datasets to improve our AI/ML algorithm's accuracy.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Training Data Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
                Upload Dataset
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors duration-300"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your file here, or click to select
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: {acceptedFormats.join(', ')} (Max 100MB)
                </p>
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept={acceptedFormats.join(',')}
                  className="hidden"
                />
              </div>
              {file && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected file: {file.name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="algorithm" className="block text-sm font-medium mb-2">
                Algorithm Label
              </label>
              <Select onValueChange={setAlgorithm} value={algorithm}>
                <SelectTrigger id="algorithm">
                  <SelectValue placeholder="Select an algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes">AES</SelectItem>
                  <SelectItem value="rsa">RSA</SelectItem>
                  <SelectItem value="des">DES</SelectItem>
                  <SelectItem value="blowfish">Blowfish</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleUpload} disabled={isUploading || !file || !algorithm}>
              {isUploading ? 'Uploading...' : 'Upload and Start Training'}
            </Button>
          </CardContent>
        </Card>

        {(isUploading || trainingProgress > 0) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={isUploading ? uploadProgress : trainingProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {isUploading
                  ? `Uploading: ${uploadProgress}%`
                  : `${currentPhase}: ${trainingProgress}%`}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Estimated time remaining: {Math.max(0, 100 - trainingProgress)} seconds
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Feature Extraction Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey={algorithm} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {trainingProgress === 100 && (
          <Card className="mb-8">
            <CardContent>
              <Button className="w-full">Save Trained Model</Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full mt-2">
                      Set as Active Model
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This will use the newly trained model for future identification tasks.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}