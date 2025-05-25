
import { Card } from '@/components/ui/card';
import { Shield, Brain, Users, Target, Zap, Globe } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Analysis",
      description: "Uses state-of-the-art NLP and machine learning algorithms to detect patterns of misinformation"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Instant analysis with progressive feedback and detailed step-by-step processing"
    },
    {
      icon: Target,
      title: "High Accuracy",
      description: "Multi-factor analysis including sentiment, pattern recognition, and source credibility"
    },
    {
      icon: Globe,
      title: "Comprehensive Coverage",
      description: "Monitors trends across multiple topics and provides real-time misinformation tracking"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      expertise: "Natural Language Processing, Machine Learning"
    },
    {
      name: "Michael Rodriguez",
      role: "Data Science Director",
      expertise: "Statistical Analysis, Pattern Recognition"
    },
    {
      name: "Dr. Emily Johnson",
      role: "Media Studies Expert",
      expertise: "Journalism, Information Verification"
    },
    {
      name: "David Kim",
      role: "Software Engineering Lead",
      expertise: "Full-stack Development, System Architecture"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">About VeriNews AI</h1>
            <p className="text-gray-600 text-lg">Fighting misinformation with artificial intelligence</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Mission Statement */}
        <Card className="p-8 mb-12 text-center">
          <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            To empower individuals and organizations with advanced AI tools to identify and combat misinformation, 
            promoting a more informed and truthful digital information ecosystem.
          </p>
        </Card>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">How VeriNews AI Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Technology & Methodology</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-blue-600">AI & Machine Learning</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Advanced Natural Language Processing (NLP)</li>
                <li>• Transformer-based language models</li>
                <li>• Sentiment and emotion analysis</li>
                <li>• Pattern recognition algorithms</li>
                <li>• Real-time processing capabilities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-purple-600">Analysis Factors</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Source credibility assessment</li>
                <li>• Linguistic manipulation detection</li>
                <li>• Emotional trigger identification</li>
                <li>• Cross-reference fact verification</li>
                <li>• Historical pattern matching</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                <p className="text-xs text-gray-500">{member.expertise}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h2 className="text-2xl font-bold mb-4">Join the Fight Against Misinformation</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Help us build a more informed world. VeriNews AI is continuously learning and improving. 
            Your feedback and engagement help us enhance our detection capabilities.
          </p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1M+</div>
              <div className="text-sm text-gray-500">Articles Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-500">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50K+</div>
              <div className="text-sm text-gray-500">Users Protected</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
