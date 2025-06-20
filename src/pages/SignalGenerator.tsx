import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Settings, 
  TrendingUp, 
  BarChart3, 
  Brain,
  Target,
  Clock,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SignalGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('EUR/USD');
  const [selectedTimeframe, setSelectedTimeframe] = useState('15M');
  const [selectedModels, setSelectedModels] = useState(['rsi', 'macd']);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [generatedSignal, setGeneratedSignal] = useState(null);

  const symbols = [
    { code: 'EUR/USD', name: 'يورو/دولار', type: 'forex', volatility: 'منخفض' },
    { code: 'GBP/USD', name: 'جنيه/دولار', type: 'forex', volatility: 'متوسط' },
    { code: 'USD/JPY', name: 'دولار/ين', type: 'forex', volatility: 'منخفض' },
    { code: 'BTC/USD', name: 'بيتكوين/دولار', type: 'crypto', volatility: 'عالي' },
    { code: 'ETH/USD', name: 'إيثريوم/دولار', type: 'crypto', volatility: 'عالي' },
    { code: 'AAPL', name: 'آبل', type: 'stock', volatility: 'متوسط' }
  ];

  const timeframes = [
    { code: '5M', name: '5 دقائق', description: 'تداول سريع' },
    { code: '15M', name: '15 دقيقة', description: 'تداول متوسط المدى' },
    { code: '30M', name: '30 دقيقة', description: 'تداول متوسط المدى' },
    { code: '1H', name: 'ساعة واحدة', description: 'تداول طويل المدى' },
    { code: '4H', name: '4 ساعات', description: 'تداول طويل المدى' }
  ];

  const aiModels = [
    {
      id: 'rsi',
      name: 'نموذج RSI المتقدم',
      description: 'تحليل مؤشر القوة النسبية مع الذكاء الاصطناعي',
      accuracy: 89,
      specialty: 'اكتشاف مناطق التشبع'
    },
    {
      id: 'macd',
      name: 'MACD الذكي',
      description: 'تحليل متوسطات الحركة مع التعلم الآلي',
      accuracy: 86,
      specialty: 'تحديد اتجاهات السوق'
    },
    {
      id: 'bollinger',
      name: 'Bollinger Bands AI',
      description: 'نطاقات بولينجر مع الذكاء الاصطناعي',
      accuracy: 91,
      specialty: 'قياس التقلبات والانعكاسات'
    },
    {
      id: 'candlestick',
      name: 'تحليل الشموع الذكي',
      description: 'تحليل أنماط الشموع بالذكاء الاصطناعي',
      accuracy: 83,
      specialty: 'اكتشاف أنماط الانعكاس'
    }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedSignal(null);

    // Simulate AI signal generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockSignal = {
      symbol: selectedSymbol,
      direction: Math.random() > 0.5 ? 'CALL' : 'PUT',
      confidence: Math.floor(Math.random() * (95 - confidenceThreshold) + confidenceThreshold),
      entryPrice: 1.0850 + (Math.random() - 0.5) * 0.01,
      targetPrice: 1.0920 + (Math.random() - 0.5) * 0.01,
      stopLoss: 1.0800 + (Math.random() - 0.5) * 0.01,
      timeframe: selectedTimeframe,
      models: selectedModels,
      analysis: {
        trend: 'صاعد',
        momentum: 'قوي',
        volatility: 'متوسط',
        support: 1.0820,
        resistance: 1.0950
      },
      riskReward: '1:2.3',
      recommendedPosition: '2%'
    };

    setGeneratedSignal(mockSignal);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            مولد الإشارات الذكي
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            استخدم نماذج الذكاء الاصطناعي المتقدمة لتوليد إشارات تداول دقيقة
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" leftIcon={<Settings className="w-4 h-4" />}>
            إعدادات متقدمة
          </Button>
          <Button variant="outline" leftIcon={<BarChart3 className="w-4 h-4" />}>
            تحليل السوق
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Symbol Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                اختيار رمز التداول
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {symbols.map((symbol) => (
                  <div
                    key={symbol.code}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedSymbol === symbol.code
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                    }`}
                    onClick={() => setSelectedSymbol(symbol.code)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {symbol.code}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {symbol.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={symbol.type === 'forex' ? 'info' : symbol.type === 'crypto' ? 'warning' : 'success'}
                          size="sm"
                        >
                          {symbol.type === 'forex' ? 'فوركس' : symbol.type === 'crypto' ? 'كريبتو' : 'أسهم'}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          تقلب {symbol.volatility}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeframe Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                الإطار الزمني
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe.code}
                    className={`p-3 border rounded-lg text-center transition-all ${
                      selectedTimeframe === timeframe.code
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                    }`}
                    onClick={() => setSelectedTimeframe(timeframe.code)}
                  >
                    <div className="font-semibold">{timeframe.code}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {timeframe.name}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Models Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                نماذج الذكاء الاصطناعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiModels.map((model) => (
                  <div
                    key={model.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedModels.includes(model.id)
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                    }`}
                    onClick={() => {
                      if (selectedModels.includes(model.id)) {
                        setSelectedModels(selectedModels.filter(id => id !== model.id));
                      } else {
                        setSelectedModels([...selectedModels, model.id]);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedModels.includes(model.id)}
                            onChange={() => {}}
                            className="text-primary-600"
                          />
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {model.name}
                          </h4>
                          <Badge variant="success" size="sm">
                            {model.accuracy}% دقة
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {model.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          تخصص: {model.specialty}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Confidence Threshold */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                حد الثقة الأدنى
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    الحد الأدنى لثقة الإشارة
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {confidenceThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>60%</span>
                  <span>75%</span>
                  <span>90%</span>
                  <span>95%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generation Panel */}
        <div className="space-y-6">
          {/* Generate Button */}
          <Card>
            <CardContent className="p-6">
              <Button
                fullWidth
                size="lg"
                leftIcon={<Zap className="w-5 h-5" />}
                onClick={handleGenerate}
                disabled={isGenerating || selectedModels.length === 0}
                isLoading={isGenerating}
                loadingText="جاري التحليل..."
              >
                توليد إشارة ذكية
              </Button>
              
              {selectedModels.length === 0 && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  يرجى اختيار نموذج واحد على الأقل
                </p>
              )}
            </CardContent>
          </Card>

          {/* AI Processing Status */}
          {isGenerating && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <LoadingSpinner size="lg" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      معالجة البيانات...
                    </h3>
                    <div className="space-y-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        تحليل بيانات السوق
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="sm" />
                        تطبيق نماذج الذكاء الاصطناعي
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        حساب مستويات الدخول والخروج
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Signal */}
          {generatedSignal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary-500" />
                    إشارة مولدة بنجاح
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Signal Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {generatedSignal.symbol}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={generatedSignal.direction === 'CALL' ? 'success' : 'error'} 
                            size="sm"
                          >
                            {generatedSignal.direction}
                          </Badge>
                          <Badge variant="info" size="sm">
                            {generatedSignal.confidence}% ثقة
                          </Badge>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        generatedSignal.direction === 'CALL' 
                          ? 'bg-green-100 dark:bg-green-900/20' 
                          : 'bg-red-100 dark:bg-red-900/20'
                      }`}>
                        <TrendingUp className={`w-6 h-6 ${
                          generatedSignal.direction === 'CALL' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      </div>
                    </div>

                    {/* Price Levels */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">سعر الدخول:</span>
                        <span className="font-medium">{generatedSignal.entryPrice.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">السعر المستهدف:</span>
                        <span className="font-medium text-green-600">{generatedSignal.targetPrice.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">وقف الخسارة:</span>
                        <span className="font-medium text-red-600">{generatedSignal.stopLoss.toFixed(4)}</span>
                      </div>
                    </div>

                    {/* Analysis Summary */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        ملخص التحليل
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>الاتجاه: {generatedSignal.analysis.trend}</div>
                        <div>الزخم: {generatedSignal.analysis.momentum}</div>
                        <div>التقلب: {generatedSignal.analysis.volatility}</div>
                        <div>المخاطر: {generatedSignal.riskReward}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button fullWidth size="sm">
                        تطبيق الإشارة
                      </Button>
                      <Button variant="outline" fullWidth size="sm">
                        حفظ للمراجعة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                إحصائيات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">الإشارات اليوم:</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">معدل النجاح:</span>
                  <span className="font-medium text-green-600">87.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">متوسط الثقة:</span>
                  <span className="font-medium">83.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">النماذج النشطة:</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignalGenerator;