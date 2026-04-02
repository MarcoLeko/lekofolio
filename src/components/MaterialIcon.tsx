type MaterialIconProps = {
  icon: string;
  className?: string;
};

export default function MaterialIcon({ icon, className = "" }: MaterialIconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} aria-hidden="true">
      {icon}
    </span>
  );
}
