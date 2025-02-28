import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log("log from getDerivedStateFromError", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("log from componentDidCatch", error, errorInfo);
  }

  render() {
    console.log(this.state);
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
