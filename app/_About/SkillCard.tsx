interface SkillCardProps {
  icon: string;
  title: string;
  tech: string;
  description: string;
}

const SkillCard = ({ icon, title, tech, description }: SkillCardProps) => (
  <div className="border border-foreground/30 p-4 md:p-6 text-center rounded-3xl">
    <div className="text-2xl md:text-3xl font-mono mb-3 text-foreground/80">
      {icon}
    </div>
    <h3 className="font-bold text-xs md:text-sm mb-2 tracking-wider">
      {title}
    </h3>
    <p className="text-xs text-foreground/60 mb-3">{tech}</p>
    <p className="text-xs text-foreground/60 leading-relaxed">{description}</p>
  </div>
);

export default SkillCard;
