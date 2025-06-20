import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Zap, 
  Star, 
  Check, 
  X,
  CreditCard,
  Calendar,
  TrendingUp,
  Shield,
  Headphones,
  Smartphone
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const Subscriptions: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'المجاني',
      price: { monthly: 0, yearly: 0 },
      description: 'للمبتدئين في عالم التداول',
      color: 'gray',
      icon: Star,
      features: [
        'حتى 5 إشارات يومياً',
        'نموذج واحد للذكاء الاصطناعي',
        'تحليل أساسي للسوق',
        'إشعارات عبر التطبيق',
        'دعم المجتمع'
      ],
      limitations: [
        'لا يتضمن إشارات الفوركس المتقدمة',
        'بدون دعم العملات الرقمية',
        'لا يتضمن تحليلات مخصصة'
      ],
      recommended: false
    },
    {
      id: 'premium',
      name: 'المميز',
      price: { monthly: 49, yearly: 490 },
      description: 'الأفضل للمتداولين النشطين',
      color: 'blue',
      icon: Zap,
      features: [
        'إشارات غير محدودة',
        '4 نماذج للذكاء الاصطناعي',
        'جميع أسواق التداول',
        'تحليلات متقدمة',
        'إشعارات فورية متعددة القنوات',
        'تقارير أداء مفصلة',
        'دعم فني أولوية',
        'تطبيق الهاتف المحمول'
      ],
      limitations: [],
      recommended: true
    },
    {
      id: 'professional',
      name: 'الاحترافي',
      price: { monthly: 99, yearly: 990 },
      description: 'للمتداولين المحترفين والمؤسسات',
      color: 'purple',
      icon: Crown,
      features: [
        'جميع مميزات الخطة المميزة',
        '12 نموذج للذكاء الاصطناعي',
        'API للتكامل المخصص',
        'تحليل مخاطر متقدم',
        'استراتيجيات تداول مخصصة',
        'تقارير مؤسسية',
        'مدير حساب مخصص',
        'تدريب ومشاورات',
        'نسخة العلامة التجارية الخاصة'
      ],
      limitations: [],
      recommended: false
    }
  ];

  const currentPlan = plans.find(p => p.id === 'premium'); // Mock current plan

  const getDiscountPercentage = () => {
    return billingCycle === 'yearly' ? 17 : 0; // ~17% discount for yearly
  };

  const getPlanIcon = (plan: any) => {
    const IconComponent = plan.icon;
    const colorClasses = {
      gray: 'text-gray-500',
      blue: 'text-blue-500',
      purple: 'text-purple-500'
    };
    return <IconComponent className={`w-6 h-6 ${colorClasses[plan.color]}`} />;
  };

  const getPlanButtonColor = (plan: any) => {
    if (plan.id === 'free') return 'outline';
    if (plan.recommended) return 'primary';
    return 'outline';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          خطط الاشتراك
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          اختر الخطة المناسبة لاحتياجاتك في التداول واحصل على إشارات ذكية مدعومة بالذكاء الاصطناعي
        </p>
      </div>

      {/* Current Plan Status */}
      {currentPlan && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    الخطة الحالية: {currentPlan.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    تجديد تلقائي في 15 فبراير 2024
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="success" size="sm">نشط</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ${currentPlan.price.monthly}/شهر
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <div className="flex">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              شهري
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              سنوي
              <Badge variant="warning" size="sm" className="absolute -top-2 -right-2">
                وفر 17%
              </Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge variant="success">الأكثر شعبية</Badge>
              </div>
            )}
            
            <Card hover className={`h-full ${plan.recommended ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getPlanIcon(plan)}
                    <div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${plan.price[billingCycle]}
                    </span>
                    {plan.price[billingCycle] > 0 && (
                      <span className="text-gray-600 dark:text-gray-400">
                        /{billingCycle === 'monthly' ? 'شهر' : 'سنة'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      وفر ${(plan.price.monthly * 12) - plan.price.yearly} سنوياً
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="space-y-4">
                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      المميزات المتضمنة:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        القيود:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-4">
                    {plan.id === currentPlan?.id ? (
                      <Button
                        fullWidth
                        variant="outline"
                        disabled
                      >
                        الخطة الحالية
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant={getPlanButtonColor(plan)}
                        onClick={() => {
                          setSelectedPlan(plan.id);
                          if (plan.id !== 'free') {
                            setShowPaymentModal(true);
                          }
                        }}
                      >
                        {plan.id === 'free' ? 'البدء مجاناً' : 'ترقية الآن'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              أمان محكم
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              بيانات مشفرة ومحمية بأعلى معايير الأمان العالمية
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Headphones className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              دعم فني 24/7
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              فريق دعم متخصص لمساعدتك في أي وقت
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Smartphone className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              تطبيق محمول
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              تابع إشاراتك أينما كنت مع تطبيقنا المحمول
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>الأسئلة الشائعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                هل يمكنني تغيير خطتي في أي وقت؟
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. التغييرات ستطبق فوراً وسيتم تعديل الفاتورة وفقاً لذلك.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                هل هناك ضمان استرداد الأموال؟
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نعم، نوفر ضمان استرداد الأموال لمدة 30 يوم على جميع الخطط المدفوعة بدون أي شروط.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                كيف يعمل الذكاء الاصطناعي في توليد الإشارات؟
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نستخدم نماذج متقدمة للتعلم الآلي تحلل بيانات السوق التاريخية والحالية، المؤشرات التقنية، وأنماط التداول لتوليد إشارات دقيقة.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="إكمال الاشتراك"
        size="lg"
      >
        <div className="space-y-6">
          {/* Selected Plan Summary */}
          {selectedPlan && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {plans.find(p => p.id === selectedPlan)?.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {billingCycle === 'monthly' ? 'اشتراك شهري' : 'اشتراك سنوي'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${plans.find(p => p.id === selectedPlan)?.price[billingCycle]}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    /{billingCycle === 'monthly' ? 'شهر' : 'سنة'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              طريقة الدفع
            </h4>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input type="radio" name="payment" className="mr-3" defaultChecked />
                <CreditCard className="w-5 h-5 text-gray-500 mr-3" />
                <span>بطاقة ائتمان/خصم</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input type="radio" name="payment" className="mr-3" />
                <div className="w-5 h-5 bg-blue-500 rounded mr-3"></div>
                <span>PayPal</span>
              </label>
            </div>
          </div>

          {/* Card Details Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">رقم البطاقة</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">تاريخ الانتهاء</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">رمز الأمان</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              أوافق على <a href="#" className="text-blue-600 hover:underline">شروط الخدمة</a> و
              <a href="#" className="text-blue-600 hover:underline">سياسة الخصوصية</a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button fullWidth leftIcon={<CreditCard className="w-4 h-4" />}>
              إكمال الدفع
            </Button>
            <Button variant="outline" fullWidth onClick={() => setShowPaymentModal(false)}>
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Subscriptions;