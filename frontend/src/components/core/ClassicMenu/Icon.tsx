import * as FaIcons from 'react-icons/fa';

const Icons = ({
  iconName,
  size,
  color,
}: {
  iconName: string;
  size: number;
  color: string;
}) => {
  const Icon = FaIcons[iconName as keyof typeof FaIcons];
  return <Icon size={size} color={color} />;
};

export default Icons;
