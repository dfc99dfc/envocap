import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Leaf,
  Upload,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Car,
  Factory,
  Users,
  Droplets,
  Recycle,
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
  Target,
  Award,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Logo } from "@/components/Logo";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface DataUpload {
  id: string;
  name: string;
  type: string;
  date: string;
  impact: string;
  status: 'processed' | 'processing' | 'pending';
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('12m');
  const periodLabel = selectedPeriod === '1m'
    ? 'Last Month'
    : selectedPeriod === '3m'
    ? 'Last 3 Months'
    : selectedPeriod === '6m'
    ? 'Last 6 Months'
    : 'Last 12 Months';

  const keyMetrics: MetricCard[] = [
    {
      title: 'Total Carbon Footprint',
      value: '24.8 tCO₂',
      change: '-12% vs last year',
      trend: 'down',
      icon: <Leaf className="h-5 w-5" />,
      color: 'agri-primary'
    },
    {
      title: 'Energy Consumption',
      value: '156.2 MWh',
      change: '+3% vs last month',
      trend: 'up',
      icon: <Zap className="h-5 w-5" />,
      color: 'agri-warning'
    },
    {
      title: 'Employee Satisfaction',
      value: '4.2/5',
      change: '+0.3 vs last quarter',
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
      color: 'agri-accent'
    },
    {
      title: 'Board Diversity',
      value: '33%',
      change: '+8% vs last year',
      trend: 'up',
      icon: <Award className="h-5 w-5" />,
      color: 'agri-secondary'
    },
    {
      title: 'Water Usage',
      value: '2,340 L',
      change: '-8% vs last month',
      trend: 'down',
      icon: <Droplets className="h-5 w-5" />,
      color: 'agri-accent'
    },
    {
      title: 'Safety Record',
      value: '0 incidents',
      change: '180 days incident-free',
      trend: 'neutral',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'agri-success'
    }
  ];

  const recentUploads: DataUpload[] = [
    {
      id: '1',
      name: 'November Energy Bill',
      type: 'Energy Invoice',
      date: '2024-12-01',
      impact: '+2.1 tCO₂',
      status: 'processed'
    },
    {
      id: '2',
      name: 'Fleet Fuel Receipts',
      type: 'Transportation',
      date: '2024-11-28',
      impact: '+1.8 tCO₂',
      status: 'processed'
    },
    {
      id: '3',
      name: 'Supplier Sustainability Data',
      type: 'Supply Chain',
      date: '2024-11-25',
      impact: '+0.9 tCO₂',
      status: 'processed'
    },
    {
      id: '4',
      name: 'Office Waste Report',
      type: 'Waste Management',
      date: '2024-11-22',
      impact: '-0.3 tCO₂',
      status: 'processing'
    }
  ];

  const monthlyData = [
    { month: 'Jan', emissions: 22.1, uploads: 12 },
    { month: 'Feb', emissions: 23.4, uploads: 15 },
    { month: 'Mar', emissions: 21.8, uploads: 18 },
    { month: 'Apr', emissions: 24.2, uploads: 14 },
    { month: 'May', emissions: 25.1, uploads: 16 },
    { month: 'Jun', emissions: 23.7, uploads: 19 },
    { month: 'Jul', emissions: 26.3, uploads: 22 },
    { month: 'Aug', emissions: 25.8, uploads: 20 },
    { month: 'Sep', emissions: 24.9, uploads: 17 },
    { month: 'Oct', emissions: 23.2, uploads: 21 },
    { month: 'Nov', emissions: 24.8, uploads: 25 },
    { month: 'Dec', emissions: 0, uploads: 8 }
  ];

  const maxEmissions = Math.max(...monthlyData.map(d => d.emissions));

  // Helper function to determine color based on percentage sign
  const getPercentageColor = (changeText: string) => {
    if (changeText.startsWith('+')) {
      return 'positive'; // Green for positive values
    } else if (changeText.startsWith('-')) {
      return 'negative'; // Red for negative values
    }
    return 'neutral'; // Gray for neutral values
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-background via-white to-agri-primary/5">
      {/* Header */}
      <header className="container mx-auto px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <Link to="/">
            <Logo size="md" className="bg-white rounded-[10px] overflow-hidden p-2.5" />
          </Link>
          
          <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto overflow-y-auto whitespace-nowrap">
            <Link to="/dashboard" className="nav-link active text-agri-primary font-medium">
              Dashboard
            </Link>
            <Link to="/audit-trail" className="nav-link text-agri-text-light hover:text-agri-primary transition-colors">
              Audit Trail
            </Link>
            <Link to="/report" className="nav-link text-agri-text-light hover:text-agri-primary transition-colors">
              Reports
            </Link>
            <Link to="/onboarding">
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-agri-primary/20 transition-all">
                <AvatarImage src="https://cdn.builder.io/api/v1/image/assets%2Fdf2c5e12a17845a7ba13483fac72a40b%2Fbb2d7ee3d5bc4384bf0c8bcf71d07f74?format=webp&width=800" alt="User avatar" />
                <AvatarFallback className="bg-agri-primary text-white font-medium">JD</AvatarFallback>
              </Avatar>
            </Link>
          </div>

        </nav>
        </div>
      </header>

      {/* Dashboard Content */}
      <section className="container mx-auto px-4 md:px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div></div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="relative">
                <Button variant="outline" className="bg-white text-agri-text border-agri-primary/20 hover:bg-agri-primary/10 transition-all duration-300 pr-8">
                  <Calendar className="h-4 w-4 mr-2" />
                  {periodLabel}
                </Button>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                >
                  <option value="1m">Last Month</option>
                  <option value="3m">Last 3 Months</option>
                  <option value="6m">Last 6 Months</option>
                  <option value="12m">Last 12 Months</option>
                </select>
              </div>
              <Link to="/upload">
                <Button className="bg-gradient-to-r from-agri-primary to-agri-primary-light hover:from-agri-primary-dark hover:to-agri-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Data
                </Button>
              </Link>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="dashboard-card card-hover border-0 bg-white/90 backdrop-blur-sm group">
                <CardContent className="p-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${
                        metric.color === 'agri-primary' ? 'bg-gradient-to-br from-agri-primary/10 to-agri-primary/5' :
                        metric.color === 'agri-warning' ? 'bg-gradient-to-br from-agri-warning/10 to-agri-warning/5' :
                        metric.color === 'agri-info' ? 'bg-gradient-to-br from-agri-info/10 to-agri-info/5' :
                        metric.color === 'agri-secondary' ? 'bg-gradient-to-br from-agri-secondary/10 to-agri-secondary/5' :
                        'bg-gradient-to-br from-agri-success/10 to-agri-success/5'
                      }`}>
                        <div className={`${
                          metric.color === 'agri-primary' ? 'text-agri-primary' :
                          metric.color === 'agri-warning' ? 'text-agri-warning' :
                          metric.color === 'agri-info' ? 'text-agri-info' :
                          metric.color === 'agri-secondary' ? 'text-agri-secondary' :
                          'text-agri-success'
                        }`}>
                          {metric.icon}
                        </div>
                      </div>
                      <Badge className={`px-2 py-1 text-xs font-medium ${
                        getPercentageColor(metric.change) === 'positive' ? 'bg-agri-success/10 text-agri-success border-agri-success/20' :
                        getPercentageColor(metric.change) === 'negative' ? 'bg-agri-danger/10 text-agri-danger border-agri-danger/20' :
                        'bg-agri-text-light/10 text-agri-text-light border-agri-text-light/20'
                      }`}>
                        {getPercentageColor(metric.change) === 'negative' && <TrendingDown className="h-3 w-3 inline mr-1" />}
                        {getPercentageColor(metric.change) === 'positive' && <TrendingUp className="h-3 w-3 inline mr-1" />}
                        {metric.change.split(' ')[0]}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-2xl md:text-3xl font-heading font-bold text-agri-text mb-1">
                        {metric.value}
                      </div>
                      <h3 className="text-sm font-medium text-agri-text-light">{metric.title}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Charts Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Emissions Trend Chart */}
              <Card className="dashboard-card border-0 bg-white md:bg-white/90 md:backdrop-blur-sm overflow-visible">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-xl">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xl font-heading font-semibold text-agri-text">Carbon Emissions Trend</span>
                        <p className="text-sm text-agri-text-light mt-1">Monthly CO₂ emissions over the past year</p>
                      </div>
                    </div>
                    <Badge className="bg-agri-success/10 text-agri-success border-agri-success/20 px-3 py-1">
                      ↓ 12% improvement YoY
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {/* Chart Container */}
                    <div className="relative bg-gradient-to-br from-agri-background/50 to-white p-3 rounded-xl border border-agri-primary/10 overflow-visible pb-6">
                      {/* Chart Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-agri-text-light">
                            <span className="font-medium text-agri-text">Latest:</span> 24.8 tCO₂ (Nov)
                          </div>
                          <div className="text-sm text-agri-text-light">
                            <span className="font-medium text-agri-text">Average:</span> 24.1 tCO₂
                          </div>
                        </div>
                        <select className="text-sm border border-agri-primary/20 rounded-lg px-3 py-1 bg-white text-agri-text">
                          <option>Last 12 months</option>
                          <option>Last 6 months</option>
                          <option>Year to date</option>
                        </select>
                      </div>

                      {/* Enhanced Line Chart */}
                      <div className="relative h-64">
                        {/* Y-axis */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-agri-text-light pr-3">
                          <span className="font-medium">30</span>
                          <span>25</span>
                          <span>20</span>
                          <span>15</span>
                          <span>10</span>
                          <span>5</span>
                          <span className="font-medium">0 tCO₂</span>
                        </div>

                        {/* Grid lines */}
                        <div className="absolute inset-0 ml-12">
                          {[0, 1, 2, 3, 4, 5, 6].map((line) => (
                            <div
                              key={line}
                              className="absolute w-full border-t border-agri-primary/10"
                              style={{ bottom: `${(line / 6) * 100}%` }}
                            />
                          ))}
                        </div>

                        {/* Line Chart */}
                        <div className="absolute inset-0 ml-12">
                          <svg className="w-full h-full" viewBox="0 0 800 240">
                            {/* Grid background */}
                            <defs>
                              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#4CAF50', stopOpacity: 0.3 }} />
                                <stop offset="100%" style={{ stopColor: '#4CAF50', stopOpacity: 0.05 }} />
                              </linearGradient>
                              <linearGradient id="projectedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#D6C4FF', stopOpacity: 0.2 }} />
                                <stop offset="100%" style={{ stopColor: '#D6C4FF', stopOpacity: 0.05 }} />
                              </linearGradient>
                            </defs>

                            {/* Area under the line */}
                            <path
                              d={`M 0 ${240 - (22.1/30)*240}
                                 L ${800/12*1} ${240 - (23.4/30)*240}
                                 L ${800/12*2} ${240 - (21.8/30)*240}
                                 L ${800/12*3} ${240 - (24.2/30)*240}
                                 L ${800/12*4} ${240 - (25.1/30)*240}
                                 L ${800/12*5} ${240 - (23.7/30)*240}
                                 L ${800/12*6} ${240 - (26.3/30)*240}
                                 L ${800/12*7} ${240 - (25.8/30)*240}
                                 L ${800/12*8} ${240 - (24.9/30)*240}
                                 L ${800/12*9} ${240 - (23.2/30)*240}
                                 L ${800/12*10} ${240 - (24.8/30)*240}
                                 L ${800/12*10} 240
                                 L 0 240 Z`}
                              fill="url(#areaGradient)"
                            />

                            {/* Main trend line */}
                            <path
                              d={`M 0 ${240 - (22.1/30)*240}
                                 L ${800/12*1} ${240 - (23.4/30)*240}
                                 L ${800/12*2} ${240 - (21.8/30)*240}
                                 L ${800/12*3} ${240 - (24.2/30)*240}
                                 L ${800/12*4} ${240 - (25.1/30)*240}
                                 L ${800/12*5} ${240 - (23.7/30)*240}
                                 L ${800/12*6} ${240 - (26.3/30)*240}
                                 L ${800/12*7} ${240 - (25.8/30)*240}
                                 L ${800/12*8} ${240 - (24.9/30)*240}
                                 L ${800/12*9} ${240 - (23.2/30)*240}
                                 L ${800/12*10} ${240 - (24.8/30)*240}`}
                              stroke="#4CAF50"
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />

                            {/* Projected line */}
                            <path
                              d={`M ${800/12*10} ${240 - (24.8/30)*240}
                                 L ${800/12*11} ${240 - (23.5/30)*240}`}
                              stroke="#D6C4FF"
                              strokeWidth="3"
                              strokeDasharray="6,6"
                              fill="none"
                              strokeLinecap="round"
                            />

                            {/* Data points */}
                            {monthlyData.slice(0, 11).map((data, index) => (
                              <g key={index}>
                                <circle
                                  cx={800/12 * index}
                                  cy={240 - (data.emissions/30)*240}
                                  r={index === 10 ? "6" : "4"}
                                  fill={index === 10 ? "#FFB74D" : "#4CAF50"}
                                  stroke="#ffffff"
                                  strokeWidth="2"
                                  className="hover:r-6 transition-all cursor-pointer"
                                />
                                {index === 10 && (
                                  <circle
                                    cx={800/12 * index}
                                    cy={240 - (data.emissions/30)*240}
                                    r="10"
                                    fill="#FFB74D"
                                    fillOpacity="0.2"
                                    className="animate-ping"
                                  />
                                )}
                              </g>
                            ))}

                            {/* Projected point */}
                            <circle
                              cx={800/12 * 11}
                              cy={240 - (23.5/30)*240}
                              r="4"
                              fill="#D6C4FF"
                              stroke="#ffffff"
                              strokeWidth="2"
                              strokeDasharray="3,3"
                            />
                          </svg>
                        </div>

                        {/* Interactive tooltips */}
                        <div className="absolute inset-0 ml-12">
                          {monthlyData.map((data, index) => (
                            <div
                              key={index}
                              className="absolute group"
                              style={{
                                left: `${(100/12) * index}%`,
                                bottom: `${(data.emissions/30)*100}%`,
                                transform: 'translate(-50%, 20px)'
                              }}
                            >
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-agri-text text-white text-xs px-3 py-2 rounded-lg shadow-lg mb-2 whitespace-nowrap">
                                <div className="font-semibold">{data.month} 2024</div>
                                <div>{data.emissions > 0 ? `${data.emissions} tCO₂` : 'Projected'}</div>
                                <div className="text-gray-300">{data.uploads} uploads</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* X-axis labels */}
                      <div className="flex justify-between mt-4 ml-12">
                        {monthlyData.map((data, index) => (
                          <div
                            key={index}
                            className={`text-xs font-medium ${
                              index === 10 ? 'text-agri-accent' : 'text-agri-text-light'
                            }`}
                          >
                            {data.month}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Legend */}
                    <div className="flex items-center justify-between bg-agri-background/30 p-4 rounded-xl border border-agri-primary/10">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-0.5 bg-agri-primary rounded"></div>
                          <span className="text-sm text-agri-text font-medium">Actual Emissions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-0.5 bg-agri-accent rounded"></div>
                          <span className="text-sm text-agri-text font-medium">Current Month</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-0.5 bg-agri-secondary rounded"></div>
                          <span className="text-sm text-agri-text font-medium">Projected</span>
                        </div>
                      </div>
                      <div className="text-sm text-agri-text-light">
                        <span className="font-medium">Next goal:</span> &lt;22 tCO₂ by Dec 2024
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ESG Metrics Breakdown */}
              <Card className="dashboard-card border-0 bg-white md:bg-white/90 md:backdrop-blur-sm overflow-visible">
                <CardHeader>
                  <CardTitle className="text-agri-text">ESG Metrics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Environmental Metrics */}
                    <div>
                      <h4 className="text-sm font-semibold text-agri-text mb-4 flex items-center">
                        <div className="w-3 h-3 bg-agri-success rounded-full mr-2"></div>
                        Environmental
                      </h4>
                      <div className="space-y-4">
                        {[
                          { category: 'Energy Consumption', value: 14.9, percentage: 60, icon: <Zap className="h-4 w-4" />, color: 'bg-agri-success' },
                          { category: 'Transportation', value: 6.2, percentage: 25, icon: <Car className="h-4 w-4" />, color: 'bg-agri-primary-light' },
                          { category: 'Supply Chain', value: 3.7, percentage: 15, icon: <Factory className="h-4 w-4" />, color: 'bg-agri-secondary-light' }
                        ].map((item, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-agri-primary/10 rounded-lg text-agri-primary">
                                  {item.icon}
                                </div>
                                <div>
                                  <div className="font-medium text-agri-text">{item.category}</div>
                                  <div className="text-sm text-agri-text-light">{item.value} tCO₂</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-agri-text">{item.percentage}%</div>
                              </div>
                            </div>
                            <div className="w-full bg-agri-background/50 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${item.color} transition-all duration-1000`}
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Metrics */}
                    <div>
                      <h4 className="text-sm font-semibold text-agri-text mb-4 flex items-center">
                        <div className="w-3 h-3 bg-agri-accent rounded-full mr-2"></div>
                        Social
                      </h4>
                      <div className="space-y-4">
                        {[
                          { category: 'Employee Satisfaction', value: '4.2/5', percentage: 84, icon: <Users className="h-4 w-4" />, color: 'bg-agri-accent' },
                          { category: 'Gender Diversity', value: '40%', percentage: 40, icon: <Users className="h-4 w-4" />, color: 'bg-agri-accent' },
                          { category: 'Safety Record', value: '0 incidents', percentage: 100, icon: <CheckCircle className="h-4 w-4" />, color: 'bg-agri-accent-dark' }
                        ].map((item, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-agri-accent/10 rounded-lg text-agri-accent">
                                  {item.icon}
                                </div>
                                <div>
                                  <div className="font-medium text-agri-text">{item.category}</div>
                                  <div className="text-sm text-agri-text-light">{item.value}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-agri-text">{item.percentage}{item.percentage === 100 ? '%' : '/100'}</div>
                              </div>
                            </div>
                            <div className="w-full bg-agri-background/50 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${item.color} transition-all duration-1000`}
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Governance Metrics */}
                    <div>
                      <h4 className="text-sm font-semibold text-agri-text mb-4 flex items-center">
                        <div className="w-3 h-3 bg-agri-secondary rounded-full mr-2"></div>
                        Governance
                      </h4>
                      <div className="space-y-4">
                        {[
                          { category: 'Board Diversity', value: '33%', percentage: 67, icon: <Users className="h-4 w-4" />, color: 'bg-agri-secondary' },
                          { category: 'Ethics Training', value: '96%', percentage: 96, icon: <Award className="h-4 w-4" />, color: 'bg-agri-secondary-light' },
                          { category: 'Data Privacy Compliance', value: 'GDPR', percentage: 88, icon: <CheckCircle className="h-4 w-4" />, color: 'bg-agri-secondary-dark' }
                        ].map((item, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-agri-secondary/10 rounded-lg text-agri-secondary">
                                  {item.icon}
                                </div>
                                <div>
                                  <div className="font-medium text-agri-text">{item.category}</div>
                                  <div className="text-sm text-agri-text-light">{item.value}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-agri-text">{item.percentage}/100</div>
                              </div>
                            </div>
                            <div className="w-full bg-agri-background/50 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${item.color} transition-all duration-1000`}
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Sources & Upload Impact */}
              <Card className="dashboard-card border-0 bg-white md:bg-white/90 md:backdrop-blur-sm overflow-visible">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-br from-agri-accent to-agri-accent-dark rounded-lg">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-agri-text">Recent Data Uploads</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUploads.map((upload) => (
                      <div key={upload.id} className="flex items-center justify-between p-4 border border-agri-primary/10 rounded-xl hover:bg-agri-background/30 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            upload.status === 'processed' ? 'bg-agri-success/10 text-agri-success' :
                            upload.status === 'processing' ? 'bg-agri-warning/10 text-agri-warning' :
                            'bg-agri-text-light/10 text-agri-text-light'
                          }`}>
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-agri-text">{upload.name}</div>
                            <div className="text-sm text-agri-text-light">{upload.type} • {upload.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${
                            upload.impact.startsWith('+') ? 'text-agri-danger' : 'text-agri-success'
                          }`}>
                            {upload.impact}
                          </div>
                          <Badge 
                            className={`text-xs mt-1 ${
                              upload.status === 'processed' ? 'bg-agri-success/10 text-agri-success border-agri-success/20' :
                              upload.status === 'processing' ? 'bg-agri-warning/10 text-agri-warning border-agri-warning/20' :
                              'bg-agri-text-light/10 text-agri-text-light border-agri-text-light/20'
                            }`}
                          >
                            {upload.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* ESG Compliance Score */}
              <Card className="dashboard-card border-0 bg-white md:bg-white/90 md:backdrop-blur-sm overflow-visible">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-lg">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-agri-text">ESG Compliance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-heading font-bold text-agri-primary mb-2">94%</div>
                    <div className="text-sm text-agri-text-light">Overall ESG Score</div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-agri-success rounded-full"></div>
                          <span className="text-sm text-agri-text font-medium">Environmental</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={96} className="w-16 h-2" />
                          <span className="text-sm font-medium text-agri-text">96%</span>
                        </div>
                      </div>
                      <div className="text-xs text-agri-text-light ml-5">CSRD E1-E5, GRI 300 series</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-agri-info rounded-full"></div>
                          <span className="text-sm text-agri-text font-medium">Social</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={92} className="w-16 h-2" />
                          <span className="text-sm font-medium text-agri-text">92%</span>
                        </div>
                      </div>
                      <div className="text-xs text-agri-text-light ml-5">CSRD S1-S4, GRI 400 series</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-agri-secondary rounded-full"></div>
                          <span className="text-sm text-agri-text font-medium">Governance</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={94} className="w-16 h-2" />
                          <span className="text-sm font-medium text-agri-text">94%</span>
                        </div>
                      </div>
                      <div className="text-xs text-agri-text-light ml-5">CSRD G1, GRI 100 series</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goals & Targets */}
              <Card className="dashboard-card border-0 bg-white md:bg-white/90 md:backdrop-blur-sm overflow-visible">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-br from-agri-accent to-agri-accent-dark rounded-lg">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-agri-text">2024 Goals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-agri-text">Carbon Reduction</span>
                        <span className="text-sm text-agri-primary">12% of 15%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-agri-text">Renewable Energy</span>
                        <span className="text-sm text-agri-primary">65% of 70%</span>
                      </div>
                      <Progress value={93} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-agri-text">Waste Reduction</span>
                        <span className="text-sm text-agri-danger">8% of 20%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Items */}
              <Card className="border-agri-warning/30 bg-agri-warning/5 overflow-visible">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-agri-warning">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Action Items</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-agri-warning mt-0.5" />
                      <span className="text-sm text-agri-text">3 suppliers need sustainability certifications</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-agri-warning mt-0.5" />
                      <span className="text-sm text-agri-text">Upload October utility bills</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-agri-success mt-0.5" />
                      <span className="text-sm text-agri-text">Employee diversity survey completed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-agri-primary to-agri-primary-dark text-white shadow-lg overflow-visible">
                <CardContent className="p-2 space-y-4">
                  <h3 className="font-heading font-semibold text-lg">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/upload">
                      <Button variant="secondary" className="w-full bg-white text-agri-primary hover:bg-agri-background hover:text-agri-primary-dark transition-all duration-300" style={{ marginBottom: "1px" }}>
                        Upload New Data
                      </Button>
                    </Link>
                    <Link to="/audit-trail">
                      <Button variant="secondary" className="w-full bg-white text-agri-primary hover:bg-agri-background hover:text-agri-primary-dark transition-all duration-300" style={{ marginBottom: "1px" }}>
                        View Audit Trail
                      </Button>
                    </Link>
                    <Link to="/report">
                      <Button variant="secondary" className="w-full bg-white text-agri-primary hover:bg-agri-background hover:text-agri-primary-dark transition-all duration-300">
                        Generate Report
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
