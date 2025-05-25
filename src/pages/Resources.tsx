
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, BookOpen, Shield, Users, Globe, CheckCircle } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  category: string;
  url: string;
  trustScore: number;
  isVerified: boolean;
}

const Resources = () => {
  const factCheckSites: Resource[] = [
    {
      title: "Snopes",
      description: "Comprehensive fact-checking of urban legends, folklore, myths, rumors, and misinformation",
      category: "General",
      url: "https://snopes.com",
      trustScore: 95,
      isVerified: true
    },
    {
      title: "PolitiFact",
      description: "Fact-checking political claims and statements by public figures",
      category: "Politics",
      url: "https://politifact.com",
      trustScore: 92,
      isVerified: true
    },
    {
      title: "FactCheck.org",
      description: "Nonpartisan fact-checking service monitoring political accuracy",
      category: "Politics",
      url: "https://factcheck.org",
      trustScore: 94,
      isVerified: true
    },
    {
      title: "BBC Reality Check",
      description: "BBC's fact-checking service examining claims in the news",
      category: "News",
      url: "https://bbc.com/news/reality_check",
      trustScore: 90,
      isVerified: true
    }
  ];

  const mediaLiteracyResources = [
    {
      title: "How to Spot Fake News",
      description: "Essential guide to identifying misinformation online",
      icon: Shield
    },
    {
      title: "Understanding Media Bias",
      description: "Learn to recognize different types of bias in news reporting",
      icon: BookOpen
    },
    {
      title: "Source Verification Techniques",
      description: "Methods for verifying the credibility of news sources",
      icon: CheckCircle
    },
    {
      title: "Social Media Literacy",
      description: "Navigate information on social platforms safely",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fact-Checking Resources</h1>
            <p className="text-gray-600">Trusted sources and tools for verifying information</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Trusted Fact-Checkers */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Trusted Fact-Checkers</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {factCheckSites.map((site, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {site.title}
                      {site.isVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </h3>
                    <Badge variant="secondary" className="mt-1">
                      {site.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Trust Score</div>
                    <div className="font-bold text-green-600">{site.trustScore}%</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{site.description}</p>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(site.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Site
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Media Literacy Guide */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">Media Literacy Guide</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaLiteracyResources.map((resource, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                  <resource.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <Card className="p-8 bg-blue-50 border-blue-200">
          <h3 className="text-xl font-bold mb-4 text-blue-800">Quick Verification Tips</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">Before Sharing:</h4>
              <ul className="space-y-1 text-blue-600 text-sm">
                <li>• Check the source and publication date</li>
                <li>• Look for author credentials</li>
                <li>• Verify with multiple sources</li>
                <li>• Check fact-checking websites</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">Red Flags:</h4>
              <ul className="space-y-1 text-blue-600 text-sm">
                <li>• Emotional headlines or language</li>
                <li>• No author or source listed</li>
                <li>• Poor grammar or spelling</li>
                <li>• Claims that seem too good/bad to be true</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
