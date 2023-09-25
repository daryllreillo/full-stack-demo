import type { IconType } from 'react-icons/lib';

interface StackListItemProps {
  Icon: IconType;
  nameText: string;
}

const StackListItem: React.FC<StackListItemProps> = ({ Icon, nameText }) => {
  return (
    <li className="mb-1 ml-4 mr-4">
      <Icon className="text-2xl mt-2 ml-1 mr-1 inline text-mainfg" />
      <span className="relative top-[5px] text-mainfg">{nameText}</span>
    </li>
  );
};

export default StackListItem;
