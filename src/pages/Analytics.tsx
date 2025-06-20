import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Activity,
  Calendar,
  Download,
  Filter,
  PieChart,
  LineChart
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart
} from 'recharts';

const Analytics: React.FC = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMarket, setSelectedMarket] = useState('all');

  // Mock analytics data
  const performanceData = [
    { date: '2024-01-08', accuracy: 85, signals: 45, profit: 12.3 },
    { date: '2024-01-09', accuracy: 89, signals: 52, profit: 15.7 },
    { date: '2024-01-10', accuracy: 87, signals: 48, profit: 14.2 },
    { date: '2024-01-11', accuracy: 91, signals: 55, profit: 18.9 },
    { date: '2024-01-12', accuracy: 84, signals: 41, profit: 10.5 },
    { date: '2024-01-13', accuracy: 88, signals: 49, profit: 16.1 },
    { date: '2024-01-14', accuracy: 92, signals: 58, profit: 21.4 }
  ];

  const marketDistribution = [
    { name: 'الفوركس', signals: 245, accuracy: 87, profit: 156.7, color: '#3b82f6' },
    { name: 'العملات الرقمية', signals: 189, accuracy: 84, profit: 134.2, color: '#10b981' },
    { name: 'الأسهم', signals: 132, accuracy: 91, profit: 98.5, color: '#f59e0b' },
    { name: 'المؤشرات', signals: 87, accuracy: 88, profit: 67.3, color: '#ef4444' }
  ];

  const aiModelsComparison = [
    { model: 'RSI المتقدم', accuracy: 89, signals: 156, profit: 123.4, winRate: 87 },
    { model: 'MACD الذكي', accuracy: 86, signals: 142, profit: 109.8, winRate: 84 },
    { model: 'Bollinger Bands AI', accuracy: 91, signals: 98, profit: 89.6, winRate: 89 },
    { model: 'تحليل الشموع', accuracy: 83, signals: 178, profit: 134.7, winRate: 81 }
  ];

  const hourlyPerformance = [
    { hour: '00:00', signals: 12, accuracy: 85 },
    { hour: '02:00', signals: 8, accuracy: 88 },
    { hour: '04:00', signals: 15, accuracy: 84 },
    { hour: '06:00', signals: 23, accuracy: 91 },
    { hour: '08:00', signals: 45, accuracy: 89 },
    { hour: '10:00', signals: 52, accuracy: 87 },
    { hour: '12:00', signals: 48, accuracy: 92 },
    { hour: '14:00', signals: 55, accuracy: 86 },
    { hour: '16:00', signals: 41, accuracy: 88 },
    { hour: '18:00', signals: 38, accuracy: 90 },
    { hour: '20:00', signals: 29, accuracy: 85 },
    { hour: '22:00', signals: 18, accuracy: 87 }
  ];

  const stats = [
    {
      title: 'دقة الإشارات العامة',
      value: '87.6%',
      change: '+2.4%',
      changeType: 'positive',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      title: 'إجمالي الإشارات',
      value: '1,247',
      change: '+156',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      title: 'الربح الإجمالي',
      value: '+342.8%',
      change: '+45.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'نماذج نشطة',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: BarChart3,
      color: 'bg-orange-500'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            تحليلات الأداء المتقدمة
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            تحليل شامل لأداء إشارات الذكاء الاصطناعي
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            تصدير التقرير
          </Button>
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            فلاتر متقدمة
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[
                { value: '1d', label: 'اليوم' },
                { value: '7d', label: '7 أيام' },
                { value: '30d', label: '30 يوم' },
                { value: '90d', label: '3 أشهر' },
                { value: '1y', label: 'سنة' }
              ].map((range) => (
                <Button
                  key={range.value}
                  variant={timeRange === range.value ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range.value)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                آخر تحديث: الآن
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card hover animate>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 ml-1">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Performance Chart */}
      <Card animate>
        <CardHeader>
          <CardTitle>أداء الدقة والربحية (آخر 7 أيام)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                labelFormatter={(value) => `التاريخ: ${value}`}
                formatter={(value, name) => [
                  `${value}${name === 'accuracy' ? '%' : name === 'profit' ? '%' : ''}`,
                  name === 'accuracy' ? 'الدقة' : name === 'profit' ? 'الربح' : 'الإشارات'
                ]}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="accuracy"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#accuracyGradient)"
                name="accuracy"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#profitGradient)"
                name="profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Distribution and AI Models */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Distribution */}
        <Card animate>
          <CardHeader>
            <CardTitle>توزيع الأسواق</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={marketDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="signals"
                >
                  {marketDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} إشارة`, 'عدد الإشارات']}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {marketDistribution.map((market, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: market.color }}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {market.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {market.signals} إشارة
                    </p>
                    <p className="text-xs text-gray-500">
                      {market.accuracy}% دقة | +{market.profit}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Models Comparison */}
        <Card animate>
          <CardHeader>
            <CardTitle>مقارنة نماذج الذكاء الاصطناعي</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aiModelsComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" fontSize={12} />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}${name === 'accuracy' || name === 'winRate' ? '%' : name === 'profit' ? '%' : ''}`,
                    name === 'accuracy' ? 'الدقة' : 
                    name === 'signals' ? 'الإشارات' : 
                    name === 'profit' ? 'الربح' : 'معدل الفوز'
                  ]}
                />
                <Bar dataKey="accuracy" fill="#3b82f6" name="accuracy" />
                <Bar dataKey="winRate" fill="#10b981" name="winRate" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Performance */}
      <Card animate>
        <CardHeader>
          <CardTitle>الأداء حسب الساعة</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={hourlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                labelFormatter={(value) => `الساعة: ${value}`}
                formatter={(value, name) => [
                  `${value}${name === 'accuracy' ? '%' : ''}`,
                  name === 'accuracy' ? 'الدقة' : 'عدد الإشارات'
                ]}
              />
              <Bar yAxisId="right" dataKey="signals" fill="#e5e7eb" opacity={0.7} name="signals" />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="accuracy" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="accuracy"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Models Performance */}
      <Card animate>
        <CardHeader>
          <CardTitle>تفاصيل أداء النماذج</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiModelsComparison.map((model, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {model.model}
                  </h4>
                  <Badge variant="success" size="sm">
                    {model.accuracy}% دقة
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">عدد الإشارات</p>
                    <p className="font-medium text-gray-900 dark:text-white">{model.signals}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">الربح الإجمالي</p>
                    <p className="font-medium text-green-600">+{model.profit}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">معدل الفوز</p>
                    <p className="font-medium text-gray-900 dark:text-white">{model.winRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">الحالة</p>
                    <Badge variant="success" size="sm">نشط</Badge>
                  </div>
                </div>
                {/* Progress bar for accuracy */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>دقة النموذج</span>
                    <span>{model.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${model.accuracy}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;