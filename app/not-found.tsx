import Link from 'next/link'
import Button from '@/components/button/Button'
 
export default function NotFound() {
  return (
    <div className='notFound'>
      <h2 className='notFound_header'>404 Not Found</h2>
      <p className='notFound_paragraph'>Your visited page not found. You may go home page.</p>
      <Button className='notFoundButton'><Link href="/">Back to home page</Link></Button>
    </div>
  )
}