import React, { useState } from 'react';
import { Content } from "./components/layout/Content"
import { Header } from "./components/layout/Header"
import { ProjectsProvider, SelectedProjectProvider } from "./contexts/index"
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = ({darkModeDefault = false}) => {

  const [darkMode, setDarkMode] = useState(darkModeDefault)

  return (
    
      <ProjectsProvider >
      <SelectedProjectProvider>
        <div className="App">
          <main
            data-testid="application"
            className={darkMode ? 'darkmode' : undefined}
          >
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Content />
          </main>
        </div>
        </SelectedProjectProvider>
      </ProjectsProvider>
    
  );
}