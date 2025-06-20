import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  CreditCard, 
  Users, 
  Bell, 
  Settings, 
  UserCog,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { clsx } from 'clsx';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();

  const navigationItems = [
    {
      name: t('nav.dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'user', 'moderator']
    },
    {
      name: t('nav.signals'),
      href: '/signals',
      icon: TrendingUp,
      roles: ['admin', 'user', 'moderator']
    },
    {
      name: t('nav.analytics'),
      href: '/analytics',
      icon: BarChart3,
      roles: ['admin', 'moderator']
    },
    {
      name: t('nav.subscriptions'),
      href: '/subscriptions',
      icon: CreditCard,
      roles: ['admin']
    },
    {
      name: t('users.title'),
      href: '/users',
      icon: Users,
      roles: ['admin', 'moderator']
    },
    {
      name: t('notifications.title'),
      href: '/notifications',
      icon: Bell,
      roles: ['admin', 'moderator']
    },
    {
      name: 'الأدوار والصلاحيات',
      href: '/roles',
      icon: Shield,
      roles: ['admin']
    },
    {
      name: t('nav.admin'),
      href: '/admin',
      icon: UserCog,
      roles: ['admin']
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  return (
    <motion.aside
      initial={false}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full relative"
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={clsx(
          'absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10',
          isRTL && '-left-3 right-auto'
        )}
      >
        {isCollapsed ? (
          isRTL ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
        ) : (
          isRTL ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />
        )}
      </button>

      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                منصة الإشارات
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                الإدارة المتقدمة
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50',
                isCollapsed && 'justify-center'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="truncate"
              >
                {item.name}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50',
              isCollapsed && 'justify-center'
            )
          }
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {t('nav.settings')}
            </motion.span>
          )}
        </NavLink>
      </div>
    </motion.aside>
  );
};

export default Sidebar;