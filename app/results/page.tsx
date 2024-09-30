'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Download, Share2, ThumbsUp, ThumbsDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface AnalysisResults {
  algorithm: string
  confidence: number
  distribution: { name: string; value: number }[]
}

export default function ResultsPage() {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)
  const [results, setResults] = useState<AnalysisResults | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const resultsParam = searchParams.get('results')
    if (resultsParam) {
      try {
        const parsedResults = JSON.parse(resultsParam) as AnalysisResults
        setResults(parsedResults)
      } catch (error) {
        console.error('Failed to parse results:', error)
      }
    }
  }, [searchParams])

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type)
    // Here you would typically send this feedback to your backend
    console.log(`User gave ${type} feedback`)
  }

  if (!results) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Algorithm Identified: {results.algorithm}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 relative mb-4">
                <Progress
                  value={results.confidence}
                  className="w-48 h-48 rounded-full"
                  indicatorClassName="bg-primary"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{results.confidence}%</span>
                </div>
              </div>
              <p className="text-xl text-center">
                The algorithm is most likely {results.algorithm} with {results.confidence}% confidence.
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="explanation" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explanation">Algorithm Explanation</TabsTrigger>
            <TabsTrigger value="recommendations">Security Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value="explanation">
            <Card>
              <CardHeader>
                <CardTitle>What is {results.algorithm}?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {results.algorithm} (Advanced Encryption Standard) is a symmetric block cipher chosen by the U.S. government to 
                  protect classified information. It is used worldwide to encrypt sensitive data. {results.algorithm} operates on 
                  a 4x4 column-major order array of bytes, termed the state.
                </p>
                <h3 className="font-semibold mt-4 mb-2">Key Features:</h3>
                <ul className="list-disc list-inside">
                  <li>Symmetric key algorithm (same key for encryption and decryption)</li>
                  <li>Block sizes of 128 bits</li>
                  <li>Key sizes of 128, 192, or 256 bits</li>
                  <li>Strong resistance against various attacks</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Security Recommendations for {results.algorithm}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Use a key size of at least 256 bits for maximum security</li>
                  <li>Implement proper key management practices</li>
                  <li>Use a secure mode of operation (e.g., GCM or CCM)</li>
                  <li>Regularly update and patch your encryption software</li>
                  <li>Combine {results.algorithm} with proper authentication mechanisms</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Confidence Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={results.distribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {results.distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button className="flex items-center">
            <Download className="mr-2 h-4 w-4" /> Download Full Report
          </Button>
          <Button variant="secondary" className="flex items-center">
            Try Another Dataset
          </Button>
          <Button variant="outline" className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" /> Share Results
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Was this result helpful?</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center space-x-4">
            <Button
              variant={feedback === 'up' ? 'default' : 'outline'}
              onClick={() => handleFeedback('up')}
              className="flex items-center"
            >
              <ThumbsUp className="mr-2 h-4 w-4" /> Yes
            </Button>
            <Button
              variant={feedback === 'down' ? 'default' : 'outline'}
              onClick={() => handleFeedback('down')}
              className="flex items-center"
            >
              <ThumbsDown className="mr-2 h-4 w-4" /> No
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}