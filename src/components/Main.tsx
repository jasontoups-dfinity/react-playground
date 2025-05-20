import React from 'react';
import ProjectButton from './ProjectButton';
import './Main.css';

const Main: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-6">React Playground</h1>
        <p className="mb-8">Select a project to explore:</p>

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
