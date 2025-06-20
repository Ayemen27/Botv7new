import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone,
  Moon,
  Sun,
  Monitor,
  Globe,
  CreditCard,
  Key,
  Download,
  Trash2,
  Save
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { clsx } from 'clsx';

const Settings: React.FC = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'profile', name: 'الملف الشخصي', icon: User },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'security', name: 'الأمان', icon: Shield },
    { id: 'preferences', name: 'التفضيلات', icon: Monitor },
    { id: 'subscription', name: 'الاشتراك', icon: CreditCard },
    { id: 'api', name: 'API', icon: Key }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.firstName} className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-white" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          <Button variant="outline" size="sm" className="mt-2">
            تغيير الصورة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="الاسم الأول"
          defaultValue={user?.firstName}
          placeholder="أدخل الاسم الأول"
        />
        <Input
          label="الاسم الأخير"
          defaultValue={user?.lastName}
          placeholder="أدخل الاسم الأخير"
        />
        <Input
          label="البريد الإلكتروني"
          type="email"
          defaultValue={user?.email}
          placeholder="أدخل البريد الإلكتروني"
        />
        <Input
          label="رقم الهاتف"
          type="tel"
          defaultValue={user?.phoneNumber}
          placeholder="أدخل رقم الهاتف"
        />
      </div>

      <div>
        <Input
          label="نبذة شخصية"
          placeholder="اكتب نبذة مختصرة عنك..."
        />
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          إعدادات الإشعارات
        </h3>
        <div className="space-y-4">
          {[
            { key: 'signals', name: 'إشارات جديدة', desc: 'تنبيهات عند توليد إشارات جديدة' },
            { key: 'performance', name: 'تقارير الأداء', desc: 'ملخص أداء الإشارات الأسبوعي' },
            { key: 'account', name: 'نشاط الحساب', desc: 'تسجيل الدخول وتغييرات الأمان' },
            { key: 'marketing', name: 'التسويق', desc: 'عروض خاصة وميزات جديدة' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="text-blue-600" />
                  <Bell className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">التطبيق</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="text-blue-600" />
                  <span className="text-sm">📧</span>
                  <span className="text-sm">إيميل</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-blue-600" />
                  <Smartphone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">SMS</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          كلمة المرور
        </h3>
        <div className="space-y-4">
          <Input
            label="كلمة المرور الحالية"
            type="password"
            placeholder="أدخل كلمة المرور الحالية"
          />
          <Input
            label="كلمة المرور الجديدة"
            type="password"
            placeholder="أدخل كلمة المرور الجديدة"
          />
          <Input
            label="تأكيد كلمة المرور الجديدة"
            type="password"
            placeholder="أعد إدخال كلمة المرور الجديدة"
          />
          <Button variant="outline">
            تحديث كلمة المرور
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          المصادقة الثنائية
        </h3>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                تفعيل المصادقة ال��نائية
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                أضف طبقة حماية إضافية لحسابك
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="error" size="sm">غير مفعل</Badge>
              <Button variant="outline" size="sm">
                تفعيل
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          الجلسات النشطة
        </h3>
        <div className="space-y-3">
          {[
            { device: 'Chrome على Windows', location: 'الرياض، السعودية', current: true },
            { device: 'Safari على iPhone', location: 'جدة، السعودية', current: false },
            { device: 'Firefox على Mac', location: 'دبي، الإمارات', current: false }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {session.device}
                  {session.current && <Badge variant="success" size="sm" className="ml-2">الحالي</Badge>}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{session.location}</p>
              </div>
              {!session.current && (
                <Button variant="outline" size="sm">
                  إنهاء الجلسة
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          المظهر
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'light', name: 'فاتح', icon: Sun },
            { value: 'dark', name: 'مظلم', icon: Moon },
            { value: 'system', name: 'تلقائي', icon: Monitor }
          ].map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value as any)}
              className={clsx(
                'p-4 border rounded-lg text-center transition-all',
                theme === themeOption.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
              )}
            >
              <themeOption.icon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">{themeOption.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          اللغة
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'ar', name: 'العربية', flag: '🇸🇦' },
            { value: 'en', name: 'English', flag: '🇺🇸' }
          ].map((lang) => (
            <button
              key={lang.value}
              onClick={() => changeLanguage(lang.value as any)}
              className={clsx(
                'p-4 border rounded-lg text-center transition-all',
                language === lang.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
              )}
            >
              <span className="text-2xl mb-2 block">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          تفضيلات التداول
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">الأسواق المفضلة</label>
            <div className="flex flex-wrap gap-2">
              {['الفوركس', 'العملات الرقمية', 'الأسهم', 'المؤشرات'].map((market) => (
                <label key={market} className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="text-blue-600" />
                  <span className="text-sm">{market}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">مستوى المخاطرة</label>
            <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
              <option>منخفض</option>
              <option>متوسط</option>
              <option>عالي</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptionTab = () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              الخطة المميزة
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              تجديد تلقائي في 15 فبراير 2024
            </p>
          </div>
          <div className="text-right">
            <Badge variant="success">نشط</Badge>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              $49/شهر
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          تفاصيل الاستخدام
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">الإشارات المستخدمة</h4>
            <p className="text-2xl font-bold text-blue-600 mt-2">347</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">من غير محدود</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">استدعاءات API</h4>
            <p className="text-2xl font-bold text-green-600 mt-2">1,247</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">من 10,000</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">نماذج الذكاء الاصطناعي</h4>
            <p className="text-2xl font-bold text-purple-600 mt-2">4</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">من 4 متاح</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline">
          ترقية الخطة
        </Button>
        <Button variant="outline">
          إلغاء الاشتراك
        </Button>
        <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
          تحميل الفاتورة
        </Button>
      </div>
    </div>
  );

  const renderApiTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          مفاتيح API
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  مفتاح الإنتاج
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  sk_live_••••••••••••••••••••••••••••
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  آخر استخدام: منذ ساعتين
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  نسخ
                </Button>
                <Button variant="outline" size="sm">
                  تجديد
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  مفتاح التطوير
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  sk_test_••••••••••••••••••••••••••••
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  آخر استخدام: منذ يوم
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  نسخ
                </Button>
                <Button variant="outline" size="sm">
                  تجديد
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Button leftIcon={<Key className="w-4 h-4" />}>
          إنشاء مفتاح جديد
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          إحصائيات الاستخدام
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">الطلبات اليوم</h4>
            <p className="text-2xl font-bold text-blue-600 mt-2">1,247</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">معدل النجاح</h4>
            <p className="text-2xl font-bold text-green-600 mt-2">99.8%</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          التوثيق والأمثلة
        </h3>
        <div className="space-y-3">
          <a href="#" className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <h4 className="font-medium text-gray-900 dark:text-white">دليل البدء السريع</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">تعلم كيفية استخدام API في دقائق</p>
          </a>
          <a href="#" className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <h4 className="font-medium text-gray-900 dark:text-white">مرجع API</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">توثيق شامل لجميع endpoints</p>
          </a>
          <a href="#" className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <h4 className="font-medium text-gray-900 dark:text-white">أمثلة الكود</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">أمثلة جاهزة بلغات مختلفة</p>
          </a>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'notifications': return renderNotificationsTab();
      case 'security': return renderSecurityTab();
      case 'preferences': return renderPreferencesTab();
      case 'subscription': return renderSubscriptionTab();
      case 'api': return renderApiTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            الإعدادات
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إدارة حسابك وتفضيلاتك
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            leftIcon={<Download className="w-4 h-4" />}
          >
            تصدير البيانات
          </Button>
          <Button 
            leftIcon={<Save className="w-4 h-4" />}
            onClick={handleSave}
            isLoading={isLoading}
            loadingText="جاري الحفظ..."
          >
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-right transition-colors',
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {tabs.find(tab => tab.id === activeTab)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderTabContent()}
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            منطقة الخطر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
              <div>
                <h4 className="font-medium text-red-900 dark:text-red-400">
                  حذف الحساب
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  حذف نهائي لحسابك وجميع البيانات المرتبطة به
                </p>
              </div>
              <Button 
                variant="destructive" 
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                حذف الحساب
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;