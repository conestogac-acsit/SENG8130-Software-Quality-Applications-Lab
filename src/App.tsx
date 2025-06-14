// src/App.tsx

import React from "react";

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Vite + React + Electron</h1>
      <p>Welcome to your app. Everything is running smoothly 🎉</p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center" as const,
    marginTop: "50px",
  },
};

export default App;

