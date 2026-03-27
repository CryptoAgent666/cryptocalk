import React from 'react';

const ERROR_I18N: Record<string, { heading: string; message: string; reload: string }> = {
  en: { heading: 'Something went wrong', message: 'This calculator encountered an error. Please reload the page.', reload: 'Reload' },
  es: { heading: 'Algo sali\u00f3 mal', message: 'Esta calculadora encontr\u00f3 un error. Por favor, recarga la p\u00e1gina.', reload: 'Recargar' },
  pt: { heading: 'Algo deu errado', message: 'Esta calculadora encontrou um erro. Por favor, recarregue a p\u00e1gina.', reload: 'Recarregar' },
  tr: { heading: 'Bir \u015feyler ters gitti', message: 'Bu hesap makinesinde bir hata olu\u015ftu. L\u00fctfen sayfay\u0131 yeniden y\u00fckleyin.', reload: 'Yeniden Y\u00fckle' },
  hi: { heading: '\u0915\u0941\u091b \u0917\u0932\u0924 \u0939\u094b \u0917\u092f\u093e', message: '\u0907\u0938 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091f\u0930 \u092e\u0947\u0902 \u0924\u094d\u0930\u0941\u091f\u093f \u0939\u0941\u0908\u0964 \u0915\u0943\u092a\u092f\u093e \u092a\u0943\u0937\u094d\u0920 \u092a\u0941\u0928\u0903 \u0932\u094b\u0921 \u0915\u0930\u0947\u0902\u0964', reload: '\u092a\u0941\u0928\u0903 \u0932\u094b\u0921' },
  ru: { heading: '\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a', message: '\u0412 \u044d\u0442\u043e\u043c \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440\u0435 \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443.', reload: '\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c' },
};

function getErrorText(key: 'heading' | 'message' | 'reload'): string {
  const lang = (typeof document !== 'undefined' && document.documentElement.lang) || 'en';
  return (ERROR_I18N[lang] || ERROR_I18N['en'])[key];
}

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
            {getErrorText('heading')}
          </p>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            {getErrorText('message')}
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
            {getErrorText('reload')}
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
