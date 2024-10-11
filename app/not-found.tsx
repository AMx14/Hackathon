import type { Metadata, Viewport } from 'next'
import NotFoundContent from './NotFoundContent'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function NotFound() {
  return <NotFoundContent />
}