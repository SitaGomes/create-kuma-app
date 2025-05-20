import Link from 'next/link';
import { IconType } from 'react-icons/lib';

type NavItemProps = {
  href: string;
  icon: IconType;
  children: React.ReactNode;
  handleNavigation: () => void;
};

type SideBarSectionProps = {
  items: NavItemProps[];
  title: string;
  currentRef?: string;
};

export const SideBarSection = ({
  items,
  title,
  currentRef = '',
}: SideBarSectionProps) => {
  function NavItem({
    href,
    icon: Icon,
    children,
    handleNavigation,
  }: NavItemProps) {
    const isCurrentRef = currentRef === href;

    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23] ${
          isCurrentRef ? 'bg-gray-50 dark:bg-[#1F1F23]' : ''
        } `}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    );
  }

  return (
    <div>
      <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {title}
      </div>
      <div className="space-y-1">
        {items.map((item, index) => (
          <NavItem
            key={index}
            href={item.href}
            icon={item.icon}
            handleNavigation={item.handleNavigation}
          >
            {item.children}
          </NavItem>
        ))}
      </div>
    </div>
  );
};
