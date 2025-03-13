import * as FaIcons from "react-icons/fa";

const Icons = ({ iconName, size }: { iconName: string; size: number }) => {
  const Icon = FaIcons[iconName as keyof typeof FaIcons];
  return <Icon size={size} />;
};

export default Icons;
