
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TrendData {
  topic: string;
  fakeNewsCount: number;
  realNewsCount: string;
  trendDirection: 'up' | 'down';
  riskLevel: 'low' | 'medium' | 'high';
  percentage: number;
}

const Trends = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const trendData: TrendData[] = [
    { topic: 'Climate Change', fakeNewsCount: 234, realNewsCount: '1.2k', trendDirection: 'up', riskLevel: 'high', percentage: 85 },
    { topic: 'Political Elections', fakeNewsCount: 456, realNewsCount: '2.1k', trendDirection: 'up', riskLevel: 'high', percentage: 92 },
    { topic: 'Health & Medicine', fakeNewsCount: 189, realNewsCount: '890', trendDirection: 'down', riskLevel: 'medium', percentage: 67 },
    { topic: 'Technology', fakeNewsCount: 123, realNewsCount: '1.5k', trendDirection: 'down', riskLevel: 'low', percentage: 45 },
    { topic: 'Economic Policy', fakeNewsCount: 345, realNewsCount: '987', trendDirection: 'up', riskLevel: 'medium', percentage: 78 },
    { topic: 'International Relations', fakeNewsCount: 267, realNewsCount: '1.1k', trendDirection: 'up', riskLevel: 'medium', percentage: 72 }
  ];

  const categories = ['all', 'politics', 'health', 'technology', 'climate', 'economy'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Misinformation Trends</h1>
              <p className="text-gray-600">Real-time analysis of fake news patterns and topics</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Updated hourly</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search trends..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Trends Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {trendData.map((trend, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg">{trend.topic}</h3>
                <div className="flex items-center gap-1">
                  {trend.trendDirection === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                  <Badge variant={trend.riskLevel === 'high' ? 'destructive' : trend.riskLevel === 'medium' ? 'default' : 'secondary'}>
                    {trend.riskLevel} risk
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fake news detected</span>
                  <span className="font-medium text-red-600">{trend.fakeNewsCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Legitimate articles</span>
                  <span className="font-medium text-green-600">{trend.realNewsCount}</span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Misinformation rate</span>
                    <span>{trend.percentage}%</span>
                  </div>
                  <Progress 
                    value={trend.percentage} 
                    className={`h-2 ${trend.percentage > 70 ? '[&>div]:bg-red-500' : trend.percentage > 40 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'}`}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Alert Section */}
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 mb-2">High Activity Alert</h3>
              <p className="text-red-700 text-sm">
                Increased misinformation activity detected in Political Elections and Climate Change topics. 
                Exercise extra caution when consuming content in these areas.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Trends;
