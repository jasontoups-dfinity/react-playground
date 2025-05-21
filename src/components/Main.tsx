import React, { useEffect } from 'react';
import ProjectButton from './ProjectButton';
import './Main.css';
import reactLogo from '../assets/logos/react.svg';
import viteLogo from '../assets/logos/vite.svg';
import tailwindLogo from '../assets/logos/tailwind.svg';
import shadcnLogo from '../assets/logos/shadcn.svg';
import { usePageTitle } from '../lib/TitleContext';

const Main: React.FC = () => {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle('Home');
  }, [setPageTitle]);
  const projects = [
    {
      title: 'Component Wrapper',
      description: 'A pattern for flexible component composition and reuse',
      path: '/component-wrapper',
    },
    {
      title: 'Coming Soon',
      description: 'More projects will be added here',
      path: '#',
    },
  ];

  return (
    <main className="main-container">
      <div className="content p-6">
        <h1 className="text-4xl font-bold mb-3">React Playground</h1>
        <p className="text-xl mb-10">Build something quickly.™️</p>

        <div className="mb-12">
          <p className="text-lg mb-4">Built with:</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a
              href="https://react.dev/reference/react"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:opacity-80 transition-opacity">
              <img
                src={reactLogo}
                alt="React"
                className="h-12 mb-2 hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm">React</span>
            </a>
            <a
              href="https://vite.dev/guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:opacity-80 transition-opacity">
              <img
                src={viteLogo}
                alt="Vite"
                className="h-12 mb-2 hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm">Vite</span>
            </a>
            <a
              href="https://nerdcave.com/tailwind-cheat-sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:opacity-80 transition-opacity">
              <img
                src={tailwindLogo}
                alt="Tailwind CSS"
                className="h-12 mb-2 hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm">Tailwind CSS</span>
            </a>
            <a
              href="https://ui.shadcn.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:opacity-80 transition-opacity">
              <img
                src={shadcnLogo}
                alt="ShadCN UI"
                className="h-12 mb-2 text-current hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm">ShadCN UI</span>
            </a>
          </div>
        </div>

        <h2 className="text-2xl mb-8">Select a project for inspiration:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectButton
              key={index}
              title={project.title}
              description={project.description}
              path={project.path}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Main;
