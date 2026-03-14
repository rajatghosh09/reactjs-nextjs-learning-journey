interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

const GradientText = ({
  children,
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  animationSpeed = 8,
  showBorder = false,
  className = "",
}: GradientTextProps) => {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent font-semibold
        ${showBorder ? "border-b-2 border-purple-500" : ""}
        ${className}`}
      style={{
        backgroundImage: `linear-gradient(270deg, ${colors.join(", ")})`,
        backgroundSize: "600% 600%",
        animation: `gradient ${animationSpeed}s ease infinite`,
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
