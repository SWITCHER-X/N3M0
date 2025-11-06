"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Code2, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    stack: string[];
    image: string;
    codeUrl: string;
    demoUrl: string | null;
    videoDemo: string | null;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="border border-foreground/30 overflow-hidden hover:shadow-lg transition rounded-3xl">
        {/* Project Image Container */}
        <div className="relative h-32 md:h-48 bg-foreground/10 overflow-hidden group">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Project Content */}
        <div className="p-4 md:p-6 bg-background">
          <button
            onClick={() => setIsOpen(true)}
            className="font-bold text-base md:text-lg pb-2 md:pb-3 tracking-wide text-left hover:text-green-500 transition cursor-pointer"
          >
            {project.title}
          </button>
          <p className="text-foreground/60 text-xs leading-relaxed pb-3 md:pb-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pb-4 md:pb-6">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="text-xs bg-gray-200 text-gray-800 px-2 py-1 font-semibold rounded-xl"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button className="flex-1 bg-foreground text-background rounded-3xl py-2 px-3 md:px-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 hover:bg-foreground/90 hover:cursor-pointer transition">
              <Code2 size={16} />
              CODE
            </button>
            {project.demoUrl && (
              <button className="flex-1 border border-gray-300 text-foreground rounded-3xl py-2 px-3 md:px-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 hover:bg-background/50 transition">
                <ExternalLink size={16} />
                DEMO
              </button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="font-mono max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          {/* Video Demo */}
          {project.videoDemo && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6">
              <iframe
                width="100%"
                height="100%"
                src={project.videoDemo}
                title="Project Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-none"
              />
            </div>
          )}

          {/* Full Description */}
          <div>
            <h3 className="font-bold text-lg pb-2">About This Project</h3>
            <p className="text-foreground/70 text-sm leading-relaxed pb-6">
              {project.fullDescription}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-bold text-lg mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 pb-6">
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 text-gray-800 px-3 py-1 font-semibold rounded-xl"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-foreground text-background rounded-xl hover:bg-foreground/90">
                <Code2 size={18} className="mr-2" />
                View Code
              </Button>
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-gray-300 bg-transparent"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
