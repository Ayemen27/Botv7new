import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Calendar,
  BarChart3,
  Zap,
  Target,
  Activity
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { clsx } from 'clsx';

const Signals: React.FC = () => {
  const { t } = useLanguage();
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock signals data with AI-generated signals
  const signals = [
    {
      id: '1',
      symbol: 'EUR/USD',
      type: 'forex',
      direction: 'CALL',
      confidence: 89,
      entryPrice: 1.0850,
      currentPrice: 1.0865,
      targetPrice: 1.0920,
      stopLoss: 1.0800,
      status: 'active',
      aiModel: 'نموذج RSI المتقدم',
      indicators: ['RSI', 'MACD', 'Bollinger Bands'],
      marketCondition: 'صاعد',
      timeframe: '15M',
      createdAt: '2024-01-15T10:30:00Z',
      expiryTime: '2024-01-15T11:30:00Z',
      profitLoss: 0,
      riskReward: '1:2'
    },
    {
      id: '2',
      symbol: 'BTC/USD',
      type: 'crypto',
      direction: 'PUT',
      confidence: 92,
      entryPrice: 43250,
      currentPrice: 42890,
      targetPrice: 42500,
      stopLoss: 43600,
      status: 'won',
      aiModel: 'MACD الذكي',
      indicators: ['MACD', 'EMA', 'Volume'],
      marketCondition: 'هابط',
      timeframe: '5M',
      createdAt: '2024-01-15T09:15:00Z',
      expiryTime: '2024-01-15T09:35:00Z',
      profitLoss: 83.2,
      riskReward: '1:1.8'
    },
    {
      id: '3',
      symbol: 'GBP/USD',
      type: 'forex',
      direction: 'CALL',
      confidence: 85,
      entryPrice: 1.2680,
      currentPrice: 1.2695,
      targetPrice: 1.2750,
      stopLoss: 1.2620,
      status: 'active',
      aiModel: 'Bollinger Bands AI',
      indicators: ['Bollinger Bands', 'RSI', 'Stochastic'],
      marketCondition: 'محايد',
      timeframe: '30M',
      createdAt: '2024-01-15T10:45:00Z',
      expiryTime: '2024-01-15T11:45:00Z',
      profitLoss: 0,
      riskReward: '1:2.3'
    },
    {
      id: '4',
      symbol: 'ETH/USD',
      type: 'crypto',
      direction: 'PUT',
      confidence: 78,
      entryPrice: 2640,
      currentPrice: 2590,
      targetPrice: 2580,
      stopLoss: 2680,
      status: 'lost',
      aiModel: 'تحليل الشموع الذكي',
      indicators: ['Candlestick Patterns', 'Support/Resistance'],
      marketCondition: 'متقلب',
      timeframe: '1H',
      createdAt: '2024-01-15T08:00:00Z',
      expiryTime: '2024-01-15T09:00:00Z',
      profitLoss: -40,
      riskReward: '1:1.5'
    },
    {
      id: '5',
      symbol: 'USD/JPY',
      type: 'forex',
      direction: 'CALL',
      confidence: 91,
      entryPrice: 148.25,
      currentPrice: 148.45,
      targetPrice: 149.00,
      stopLoss: 147.80,
      status: 'active',
      aiModel: 'نموذج التحليل الفني المختلط',
      indicators: ['Fibonacci', 'Trend Lines', 'Moving Averages'],
      marketCondition: 'صاعد قوي',
      timeframe: '4H',
      createdAt: '2024-01-15T06:00:00Z',
      expiryTime: '2024-01-15T12:00:00Z',
      profitLoss: 0,
      riskReward: '1:1.7'
    }
  ];

  const filteredSignals = signals.filter(signal => {
    const matchesSearch = signal.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         signal.aiModel.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || signal.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'won': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'lost': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'expired': return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="info" size="sm">نشط</Badge>;
      case 'won': return <Badge variant="success" size="sm">فائز</Badge>;
      case 'lost': return <Badge variant="error" size="sm">خاسر</Badge>;
      case 'expired': return <Badge variant="warning" size="sm">منتهي</Badge>;
      default: return <Badge variant="info" size="sm">نشط</Badge>;
    }
  };

  const getDirectionColor = (direction: string) => {
    return direction === 'CALL' ? 'text-green-600' : 'text-red-600';
  };

  const getDirectionIcon = (direction: string) => {
    return direction === 'CALL' ? 
      <TrendingUp className="w-4 h-4 text-green-600" /> : 
      <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const calculateProgress = (signal: any) => {
    if (signal.direction === 'CALL') {
      const progress = ((signal.currentPrice - signal.entryPrice) / (signal.targetPrice - signal.entryPrice)) * 100;
      return Math.max(0, Math.min(100, progress));
    } else {
      const progress = ((signal.entryPrice - signal.currentPrice) / (signal.entryPrice - signal.targetPrice)) * 100;
      return Math.max(0, Math.min(100, progress));
    }
  };

  const stats = [
    {
      title: 'إجمالي الإشارات',
      value: signals.length.toString(),
      icon: BarChart3,
      color: 'bg-blue-500'
    },
    {
      title: 'الإشارات النشطة',
      value: signals.filter(s => s.status === 'active').length.toString(),
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      title: 'معدل النجاح',
      value: `${Math.round((signals.filter(s => s.status === 'won').length / signals.filter(s => s.status !== 'active').length) * 100)}%`,
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      title: 'متوسط الثقة',
      value: `${Math.round(signals.reduce((acc, s) => acc + s.confidence, 0) / signals.length)}%`,
      icon: Zap,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            إدارة الإشارات الذكية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إشارات التداول المولدة بالذكاء الاصطناعي
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowGenerateModal(true)}
          >
            توليد إشارة جديدة
          </Button>
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            تصدير البيانات
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} hover animate>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="w-full md:w-auto">
                <Input
                  placeholder="البحث في الإشارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </div>
              <div className="flex gap-2">
                {['all', 'active', 'won', 'lost', 'expired'].map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                  >
                    {status === 'all' ? 'الكل' : 
                     status === 'active' ? 'نشط' :
                     status === 'won' ? 'فائز' :
                     status === 'lost' ? 'خاسر' : 'منتهي'}
                  </Button>
                ))}
              </div>
            </div>
            <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
              فلاتر متقدمة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Signals List */}
      <div className="space-y-4">
        {filteredSignals.map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Signal Direction Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      signal.direction === 'CALL' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                    }`}>
                      {getDirectionIcon(signal.direction)}
                    </div>

                    {/* Signal Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {signal.symbol}
                        </h3>
                        <Badge variant={signal.direction === 'CALL' ? 'success' : 'error'} size="sm">
                          {signal.direction}
                        </Badge>
                        <Badge variant="info" size="sm">
                          {signal.confidence}% ثقة
                        </Badge>
                        {getStatusBadge(signal.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Price Information */}
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">معلومات الأسعار</p>
                          <div className="mt-1 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>دخول:</span>
                              <span className="font-medium">{signal.entryPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>حالي:</span>
                              <span className={`font-medium ${
                                signal.direction === 'CALL' 
                                  ? (signal.currentPrice > signal.entryPrice ? 'text-green-600' : 'text-red-600')
                                  : (signal.currentPrice < signal.entryPrice ? 'text-green-600' : 'text-red-600')
                              }`}>
                                {signal.currentPrice}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>هدف:</span>
                              <span className="font-medium">{signal.targetPrice}</span>
                            </div>
                          </div>
                        </div>

                        {/* AI Model and Analysis */}
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">نموذج الذكاء الاصطناعي</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                            {signal.aiModel}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {signal.indicators.map((indicator, idx) => (
                              <Badge key={idx} variant="outline" size="sm">
                                {indicator}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Market Info */}
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">معلومات السوق</p>
                          <div className="mt-1 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>الحالة:</span>
                              <span className="font-medium">{signal.marketCondition}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>الإطار:</span>
                              <span className="font-medium">{signal.timeframe}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>المخاطر:</span>
                              <span className="font-medium">{signal.riskReward}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar for Active Signals */}
                      {signal.status === 'active' && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                            <span>التقدم نحو الهدف</span>
                            <span>{Math.round(calculateProgress(signal))}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                signal.direction === 'CALL' ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${calculateProgress(signal)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Profit/Loss for Completed Signals */}
                      {signal.status !== 'active' && signal.profitLoss !== 0 && (
                        <div className="mt-4">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            signal.profitLoss > 0 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {signal.profitLoss > 0 ? '+' : ''}{signal.profitLoss.toFixed(2)}%
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status and Actions */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(signal.status)}
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(signal.createdAt).toLocaleString('ar-SA')}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        تفاصيل التحليل
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Generate Signal Modal */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="توليد إشارة جديدة بالذكاء الاصطناعي"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">رمز التداول</label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>EUR/USD</option>
                <option>GBP/USD</option>
                <option>USD/JPY</option>
                <option>BTC/USD</option>
                <option>ETH/USD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الإطار الزمني</label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>5M</option>
                <option>15M</option>
                <option>30M</option>
                <option>1H</option>
                <option>4H</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نموذج الذكاء الاصطناعي</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['نموذج RSI المتقدم', 'MACD الذكي', 'Bollinger Bands AI', 'تحليل الشموع الذكي'].map((model) => (
                <label key={model} className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{model}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">حد الثقة الأدنى</label>
            <div className="flex items-center gap-4">
              <input type="range" min="60" max="95" defaultValue="75" className="flex-1" />
              <span className="text-sm font-medium">75%</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button fullWidth leftIcon={<Zap className="w-4 h-4" />}>
              توليد الإشارة الآن
            </Button>
            <Button variant="outline" fullWidth onClick={() => setShowGenerateModal(false)}>
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Signals;