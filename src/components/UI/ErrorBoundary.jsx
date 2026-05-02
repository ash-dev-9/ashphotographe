import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#f5f5f5',
          fontFamily: 'Cormorant Garamond, serif',
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Something went wrong</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                padding: '0.75rem 2rem',
                background: 'transparent',
                border: '1px solid #d4af37',
                color: '#d4af37',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
