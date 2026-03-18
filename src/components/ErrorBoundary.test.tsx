import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary, { withErrorBoundary } from './ErrorBoundary';

// Suppress console.error from React error boundary during tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});
afterEach(() => {
  console.error = originalConsoleError;
});

function ThrowingComponent(): JSX.Element {
  throw new Error('Test error');
}

function WorkingComponent() {
  return <div>Calculator works</div>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Calculator works')).toBeInTheDocument();
  });

  it('renders fallback UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Reload')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom error</div>}>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom error')).toBeInTheDocument();
  });
});

describe('withErrorBoundary HOC', () => {
  it('wraps a component in an error boundary', () => {
    const WrappedWorking = withErrorBoundary(WorkingComponent);
    render(<WrappedWorking />);
    expect(screen.getByText('Calculator works')).toBeInTheDocument();
  });

  it('catches errors from wrapped component', () => {
    const WrappedThrowing = withErrorBoundary(ThrowingComponent);
    render(<WrappedThrowing />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('sets displayName on wrapped component', () => {
    const WrappedWorking = withErrorBoundary(WorkingComponent);
    expect(WrappedWorking.displayName).toBe('WithErrorBoundary(WorkingComponent)');
  });
});
