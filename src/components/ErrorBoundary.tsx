import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const isSupabaseError = this.state.error?.message.includes('Supabase') || 
                             this.state.error?.message.includes('Connect to Supabase');

      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="w-12 h-12 text-yellow-500" />
            </div>
            {isSupabaseError ? (
              <>
                <h2 className="text-xl font-semibold text-white mb-4 text-center">
                  Conexão com Supabase Necessária
                </h2>
                <p className="text-gray-300 text-center mb-6">
                  Para usar o aplicativo, conecte-se ao Supabase usando o botão "Connect to Supabase" no canto superior direito.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white mb-4 text-center">
                  Ops! Algo deu errado
                </h2>
                <p className="text-gray-300 text-center mb-6">
                  Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.
                </p>
              </>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;