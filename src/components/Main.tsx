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
        <h1 className="text-4xl font-bold mb-3">React Playground</h1>
        <p className="text-xl mb-10">Build something quickly.™️</p>
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
