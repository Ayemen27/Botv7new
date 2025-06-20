import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Activity
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Mock data for AI signals performance
  const signalPerformanceData = [
    { time: '00:00', accuracy: 85, signals: 12 },
    { time: '04:00', accuracy: 88, signals: 15 },
    { time: '08:00', accuracy: 92, signals: 23 },
    { time: '12:00', accuracy: 89, signals: 28 },
    { time: '16:00', accuracy: 91, signals: 31 },
    { time: '20:00', accuracy: 87, signals: 26 }
  ];

  const marketDistribution = [
    { name: 'الفوركس', value: 45, color: '#3b82f6' },
    { name: 'العملات الرقمية', value: 30, color: '#10b981' },
    { name: 'الأسهم', value: 25, color: '#f59e0b' }
  ];

  const aiModelsPerformance = [
    { model: 'نموذج RSI المتقدم', accuracy: 89, signals: 145 },
    { model: 'MACD الذكي', accuracy: 86, signals: 132 },
    { model: 'Bollinger Bands AI', accuracy: 91, signals: 98 },
    { model: 'تحليل الشموع', accuracy: 83, signals: 167 }
  ];

  const stats = [
    {
      title: 'دقة الإشارات اليوم',
      value: '89.2%',
      change: '+2.3%',
      changeType: 'positive',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      title: 'إشارات مولدة',
      value: '347',
      change: '+15.7%',
      changeType: 'positive',
      icon: Zap,
      color: 'bg-green-500'
    },
    {
      title: 'متوسط الربح',
      value: '73.4%',
      change: '+5.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'نماذج الذكاء الاصطناعي',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-orange-500'
    }
  ];

  const recentSignals = [
    {
      id: 1,
      symbol: 'EUR/USD',
      direction: 'CALL',
      confidence: 92,
      entry: 1.0850,
      target: 1.0920,
      stopLoss: 1.0800,
      status: 'active',
      aiModel: 'نموذج RSI المتقدم',
      time: '2 دقائق'
    },
    {
      id: 2,
      symbol: 'BTC/USD',
      direction: 'PUT',
      confidence: 88,
      entry: 43250,
      target: 42800,
      stopLoss: 43500,
      status: 'won',
      aiModel: 'MACD الذكي',
      time: '15 دقيقة'
    },
    {
      id: 3,
      symbol: 'GBP/USD',
      direction: 'CALL',
      confidence: 85,
      entry: 1.2680,
      target: 1.2750,
      stopLoss: 1.2620,
      status: 'active',
      aiModel: 'Bollinger Bands AI',
      time: '8 دقائق'
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
            لوحة تحكم الإشارات الذكية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            مرحباً {user?.firstName}! إليك أداء الذكاء الاصطناعي في توليد الإشارات
          </p>
        </div>
        <div className="flex gap-3">
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            توليد إشارة جديدة
          </Button>
          <Button variant="outline" leftIcon={<BarChart3 className="w-4 h-4" />}>
            التحليلات المتقدمة
          </Button>
        </div>
      </div>

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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Performance Chart */}
        <Card animate className="lg:col-span-2">
          <CardHeader>
            <CardTitle>أداء الذكاء الاصطناعي (24 ساعة)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={signalPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="right" dataKey="signals" fill="#3b82f6" opacity={0.3} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="دقة الإشارات (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Market Distribution */}
        <Card animate>
          <CardHeader>
            <CardTitle>توزيع الأسواق</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={marketDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {marketDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {marketDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Models Performance */}
      <Card animate>
        <CardHeader>
          <CardTitle>أداء نماذج الذكاء الاصطناعي</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aiModelsPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="accuracy" fill="#3b82f6" name="الدقة (%)" />
              <Bar yAxisId="right" dataKey="signals" fill="#10b981" name="عدد الإشارات" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Signals */}
      <Card animate>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>أحدث الإشارات المولدة</span>
            <Button variant="outline" size="sm">
              عرض الكل
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSignals.map((signal) => (
              <div key={signal.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    signal.direction === 'CALL' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {signal.direction === 'CALL' ? 
                      <TrendingUp className="w-6 h-6 text-green-600" /> : 
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    }
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {signal.symbol}
                      </h4>
                      <Badge variant={signal.direction === 'CALL' ? 'success' : 'error'} size="sm">
                        {signal.direction}
                      </Badge>
                      <Badge variant="info" size="sm">
                        {signal.confidence}% ثقة
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {signal.aiModel} • دخول: {signal.entry} • هدف: {signal.target}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    {signal.status === 'active' && (
                      <>
                        <Clock className="w-4 h-4 text-blue-500" />
                        <Badge variant="info" size="sm">نشط</Badge>
                      </>
                    )}
                    {signal.status === 'won' && (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <Badge variant="success" size="sm">فائز</Badge>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    منذ {signal.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card animate>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              fullWidth 
              leftIcon={<Zap className="w-4 h-4" />}
            >
              توليد إشارة فورية
            </Button>
            <Button 
              variant="outline" 
              fullWidth 
              leftIcon={<BarChart3 className="w-4 h-4" />}
            >
              تحليل السوق
            </Button>
            <Button 
              variant="outline" 
              fullWidth 
              leftIcon={<Activity className="w-4 h-4" />}
            >
              مراقبة النماذج
            </Button>
            <Button 
              variant="outline" 
              fullWidth 
              leftIcon={<AlertTriangle className="w-4 h-4" />}
            >
              تنبيهات الأسواق
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;