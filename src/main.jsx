import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #f56565',
          borderRadius: '5px',
          backgroundColor: '#fff5f5',
          color: '#c53030'
        }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Show error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// Add a window error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Create a container
const rootElement = document.getElementById('root');

// Create a root
try {
  const root = createRoot(rootElement);
  
  // Render the app
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} catch (error) {
  console.error("Root creation error:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; margin: 20px; border: 1px solid #f56565; border-radius: 5px; background-color: #fff5f5; color: #c53030">
      <h2>Failed to initialize the application</h2>
      <p>${error.message}</p>
      <p>Please check the console for more details.</p>
    </div>
  `;
}