import { render, screen } from '@testing-library/react'
import Home from '../index'

jest.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter-font' }),
}))

// Mock next/image since it's not available in the test environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />
  },
}))

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByText(/docs/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders all navigation cards', () => {
    render(<Home />)
    // Use getByRole to specifically target the headings
    expect(screen.getByRole('heading', { name: /docs/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /learn/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /templates/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /deploy/i })).toBeInTheDocument()
  })

  it('renders the getting started text', () => {
    render(<Home />)
    const startedText = screen.getByText(/get started by editing/i)
    expect(startedText).toBeInTheDocument()
  })

  it('renders all required images', () => {
    render(<Home />)
    expect(screen.getByAltText('Vercel Logo')).toBeInTheDocument()
    expect(screen.getByAltText('Next.js Logo')).toBeInTheDocument()
    expect(screen.getByAltText('13')).toBeInTheDocument()
  })

  it('has correct links with proper attributes', () => {
    render(<Home />)
    const links = screen.getAllByRole('link')
    
    // Check if all links have proper security attributes
    links.forEach(link => {
      if (link.getAttribute('target') === '_blank') {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })

    // Verify specific links exist
    expect(screen.getByRole('link', { name: /docs/i })).toHaveAttribute(
      'href',
      'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
    )
  })
})
