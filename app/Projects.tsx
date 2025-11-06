import { Code2, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "SPA-BOOKING.WEB",
      image: "/spa-booking-interior-dark.jpg",
      description:
        "A web application that streamlines spa appointment scheduling for both customers and spa administrators.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      badge: null,
    },
    {
      id: 2,
      title: "BLOG.WEB",
      image: "/news-entertainment-digital-tech.jpg",
      description:
        "Blog website where users can read blogs. The blogs are gotten from gnews api",
      tech: ["Next.js", "TypeScript", "Tailwind", "Open API"],
      badge: "BETA",
    },
    {
      id: 3,
      title: "E-COMMERCE.WEB",
      image: "/stickers-ecommerce-purple-grid.jpg",
      description:
        "An e-commerce platform for selling custom stickers with design tools.",
      tech: ["React", "Stripe", "PostgreSQL", "Express"],
      badge: "DEVELOPMENT",
    },
    {
      id: 4,
      title: "CAFE.WEB",
      image: "/coffee-cafe-warm-brown.jpg",
      description:
        "A cafe website showcasing menu items and ambiance with online ordering capabilities.",
      tech: ["Next.js", "React", "Tailwind", "Supabase"],
      badge: "BETA",
    },
  ];

  return (
    <section
      className="font-mono max-w-7xl mx-auto text-center py-32 lg:py-46 px-4 md:px-8"
      id="projects"
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-wide mb-3">
        PROJECTS
      </h2>
      <div className="w-16 md:w-24 h-1 bg-green-500 mx-auto mb-6 md:mb-8"></div>
      <p className="text-foreground/60 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto px-2">
        A collection of my projects showcasing different aspects of modern
        software development, from user interfaces to backend architecture.
      </p>

      <div className="py-6 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-foreground/30 overflow-hidden hover:shadow-lg transition rounded-3xl"
            >
              {/* Project Image Container */}
              <div className="relative h-32 md:h-48 bg-foreground/10 overflow-hidden group">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {project.badge && (
                  <span
                    className={`absolute top-2 md:top-3 right-2 rounded-xl md:right-3 px-2 py-1 text-xs font-bold text-white ${
                      project.badge === "BETA"
                        ? "bg-blue-600"
                        : "bg-foreground/70"
                    }`}
                  >
                    {project.badge}
                  </span>
                )}
              </div>

              {/* Project Content */}
              <div className="p-4 md:p-6 bg-background">
                <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3 tracking-wide">
                  {project.title}
                </h3>
                <p className=" text-foreground/60 text-xs leading-relaxed mb-3 md:mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-200  text-gray-800 px-2 py-1 font-semibold rounded-xl"
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
                  <button className="flex-1 border border-gray-300 text-foreground rounded-3xl py-2 px-3 md:px-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 hover:bg-background/50 transition">
                    <ExternalLink size={16} />
                    DEMO
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
