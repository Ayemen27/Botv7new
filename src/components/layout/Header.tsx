import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Settings, 
  Moon, 
  Sun, 
  Monitor,
  LogOut,
  User,
  Globe
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import Button from '../ui/Button';
import { Menu } from '@headlessui/react';
import { clsx } from 'clsx';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, changeLanguage, t, isRTL } = useLanguage();

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor
  };

  const ThemeIcon = themeIcons[theme];

  const notifications = [
    {
      id: 1,
      title: 'إشارة جديدة متاحة',
      message: 'EUR/USD - إشارة شراء بثقة 87%',
      time: '5 دقائق',
      unread: true
    },
    {
      id: 2,
      title: 'انتهاء اشتراك قريب',
      message: 'سينتهي اشتراكك خلال 3 أيام',
      time: '1 ساعة',
      unread: true
    },
    {
      id: 3,
      title: 'تحديث النظام',
      message: 'تم تحديث المنصة بميزات جديدة',
      time: '2 ساعات',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className={clsx(
              'absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400',
              isRTL ? 'right-3' : 'left-3'
            )} />
            <input
              type="search"
              placeholder={t('common.search')}
              className={clsx(
                'w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
              )}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Globe className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={clsx(
                      'flex items-center w-full px-4 py-2 text-sm transition-colors',
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      language === 'ar' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    العربية
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => changeLanguage('en')}
                    className={clsx(
                      'flex items-center w-full px-4 py-2 text-sm transition-colors',
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      language === 'en' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    English
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>

          {/* Theme Switcher */}
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <ThemeIcon className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setTheme('light')}
                    className={clsx(
                      'flex items-center w-full px-4 py-2 text-sm transition-colors gap-2',
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      theme === 'light' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <Sun className="w-4 h-4" />
                    فاتح
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setTheme('dark')}
                    className={clsx(
                      'flex items-center w-full px-4 py-2 text-sm transition-colors gap-2',
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      theme === 'dark' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <Moon className="w-4 h-4" />
                    مظلم
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setTheme('system')}
                    className={clsx(
                      'flex items-center w-full px-4 py-2 text-sm transition-colors gap-2',
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      theme === 'system' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <Monitor className="w-4 h-4" />
                    تلقائي
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>

          {/* Notifications */}
          <Menu as="div" className="relative">
            <Menu.Button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  الإشعارات
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <Menu.Item key={notification.id}>
                    {({ active }) => (
                      <div
                        className={clsx(
                          'px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors',
                          active ? 'bg-gray-50 dark:bg-gray-700' : '',
                          notification.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={clsx(
                            'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                            notification.unread ? 'bg-primary-500' : 'bg-gray-300'
                          )} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <Button variant="ghost" size="sm" fullWidth>
                  عرض جميع الإشعارات
                </Button>
              </div>
            </Menu.Items>
          </Menu>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role === 'admin' ? 'مدير النظام' : 'مستخدم'}
                </p>
              </div>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/profile"
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2 text-sm transition-colors',
                      active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <User className="w-4 h-4" />
                    الملف الشخصي
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/settings"
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2 text-sm transition-colors',
                      active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <Settings className="w-4 h-4" />
                    الإعدادات
                  </a>
                )}
              </Menu.Item>
              <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={clsx(
                      'flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors',
                      active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;