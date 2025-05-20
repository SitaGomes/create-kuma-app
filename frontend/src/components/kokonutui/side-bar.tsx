'use client';

import { MEMBER_LEVEL, ROUTES } from '@/constants';

import Link from 'next/link';
import { useState } from 'react';

import {
  LuBarcode,
  LuBook,
  LuChartArea,
  LuCreditCard,
  LuMenu,
  LuPackage,
  LuPlus,
  LuSettings,
  LuUser,
} from 'react-icons/lu';

import { SideBarSection } from '../sidebar-section';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
  const { data: authUser } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentRoute = pathname;

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  const getSideBarItems = () => {
    const overviewItems = [
      {
        children: <>Dashboard</>,
        href: ROUTES.HOME,
        icon: LuChartArea,
        handleNavigation,
      },
    ];

    const productItems = [
      {
        children: <>Registrar</>,
        href: ROUTES.REGISTER,
        icon: LuPlus,
        handleNavigation,
      },
      {
        children: <>Pesquisar</>,
        href: ROUTES.SEARCH,
        icon: LuBarcode,
        handleNavigation,
      },
      {
        children: <>Lista</>,
        href: ROUTES.LIST_PRODUCTS,
        icon: LuPackage,
        handleNavigation,
      },
      {
        children: <>Vender</>,
        href: ROUTES.SELL,
        icon: LuCreditCard,
        handleNavigation,
      },
      {
        children: <>Historico</>,
        href: ROUTES.HISTORY,
        icon: LuBook,
        handleNavigation,
      },
    ];

    const orgItems = [
      {
        children: <>Membros</>,
        href: ROUTES.MEMBERS,
        icon: LuUser,
        handleNavigation,
      },
    ];

    switch (authUser?.user?.level) {
      case MEMBER_LEVEL.ADMIN:
        return [
          { title: 'Geral', items: overviewItems },
          { title: 'Produtos', items: productItems },
          { title: 'Organização', items: orgItems },
        ];
      case MEMBER_LEVEL.REGISTER:
        return [{ title: 'Produtos', items: productItems }];
      case MEMBER_LEVEL.SELLER:
        return [
          {
            title: 'Produtos',
            items: [
              {
                children: <>Vender</>,
                href: ROUTES.SELL,
                icon: LuCreditCard,
                handleNavigation,
              },
              {
                children: <>Historico</>,
                href: ROUTES.HISTORY,
                icon: LuBook,
                handleNavigation,
              },
            ],
          },
        ];
      default:
        return [];
    }
  };

  const getFooterSideBarItems = () => {
    const footerItems = [
      {
        children: <>Definições</>,
        href: ROUTES.SETTINGS,
        icon: LuSettings,
        handleNavigation,
      },
    ];

    return [{ title: '', items: footerItems }];
  };

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <LuMenu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
      >
        <div className="h-full flex flex-col">
          <Link
            href={ROUTES.HOME}
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                Readable
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col justify-between">
            <div className="space-y-6">
              {getSideBarItems().map((item) => (
                <SideBarSection
                  key={item.title}
                  title={item.title}
                  items={item.items}
                  currentRef={currentRoute}
                />
              ))}
            </div>

            {authUser?.user?.level === MEMBER_LEVEL.ADMIN && (
              <div className="border-t border-gray-200 dark:border-[#1F1F23]">
                <div className="space-y-1">
                  {getFooterSideBarItems().map((item) => (
                    <SideBarSection
                      key={item.title}
                      title={item.title}
                      items={item.items}
                      currentRef={currentRoute}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
