import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ProjectButtonProps {
  title: string;
  description: string;
  path: string;
}

const ProjectButton: React.FC<ProjectButtonProps> = ({ title, description, path }) => {
  return (
    <Link to={path} className="w-full">
      <Button
        variant="outline"
        size="xl"
        className="group w-full h-32 flex flex-col items-start justify-center p-6 mb-4 hover:bg-primary hover:text-primary-foreground transition-all bg-gray-300">
        <h3 className="text-xl font-bold mb-2 dark:group-hover:text-[var(--dark-accent)] text-left w-full">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground whitespace-normal text-left w-full">
          {description}
        </p>
      </Button>
    </Link>
  );
};

export default ProjectButton;
