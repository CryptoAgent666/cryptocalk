import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[Calculator Error]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-md, 12px)',
          border: '1px solid var(--color-border)',
        }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Something went wrong
          </p>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            This calculator encountered an error. Please reload the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1.5rem',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm, 8px)',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/** HOC to wrap any calculator component in an ErrorBoundary */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  const Wrapped = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  Wrapped.displayName = `WithErrorBoundary(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}

export default ErrorBoundary;
