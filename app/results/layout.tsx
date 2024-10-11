import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Analysis Results',
    description: 'View the results of your algorithm analysis',
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function ResultsLayout({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    return <>{children}</>
}