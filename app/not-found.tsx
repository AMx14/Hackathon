'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Search, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically redirect to a search results page
    console.log('Searching for:', searchQuery)
    // For demonstration, we'll just clear the input
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <span className="text-3xl font-bold">404 - Page Not Found</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-6">
            Oops! The page you are looking for doesn&apos;t exist.
          </p>
          <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
            <Input
              type="text"
              placeholder="Search for content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}