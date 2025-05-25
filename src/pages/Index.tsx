
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, TrendingUp, Brain, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface AnalysisResult {
  prediction: 'REAL' | 'FAKE';
  confidence: number;
  factors: {
    sentimentScore: number;
    keywordFlags: string[];
    patternAnalysis: number;
    sourceCredibility: number;
  };
  explanation: string;
}

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeText = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis - in real implementation, this would call your AI model
    const mockAnalysis = simulateAIAnalysis(inputText);
    setResult(mockAnalysis);
    setIsAnalyzing(false);
    
    toast.success('Analysis complete!');
  };

  const simulateAIAnalysis = (text: string): AnalysisResult => {
    const suspiciousKeywords = ['breaking', 'shocking', 'you won\'t believe', 'exclusive', 'urgent'];
    const foundKeywords = suspiciousKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );

    const hasExcessiveCaps = (text.match(/[A-Z]/g) || []).length / text.length > 0.3;
    const hasExclamationMarks = (text.match(/!/g) || []).length > 3;
    
    let suspicionScore = 0;
    suspicionScore += foundKeywords.length * 0.2;
    suspicionScore += hasExcessiveCaps ? 0.3 : 0;
    suspicionScore += hasExclamationMarks ? 0.2 : 0;
    
    const confidence = Math.min(0.95, 0.6 + Math.random() * 0.3);
    const isFake = suspicionScore > 0.4 || Math.random() < 0.3;

    return {
      prediction: isFake ? 'FAKE' : 'REAL',
      confidence: confidence * 100,
      factors: {
        sentimentScore: Math.random() * 100,
        keywordFlags: foundKeywords,
        patternAnalysis: (1 - suspicionScore) * 100,
        sourceCredibility: 60 + Math.random() * 40
      },
      explanation: isFake 
        ? 'The text contains patterns commonly associated with misinformation, including sensationalized language and emotional triggers.'
        : 'The text appears to follow journalistic standards with balanced language and factual presentation.'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">VeriNews AI</h1>
              <p className="text-gray-600">Advanced Fake News Detection System</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Analysis Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Article Analysis
          </h2>
          
          <Textarea
            placeholder="Paste your news article or headline here for analysis..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] mb-4 text-base"
          />
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={analyzeText}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
            </Button>
            <span className="text-sm text-gray-500">
              {inputText.length}/5000 characters
            </span>
          </div>
        </Card>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="p-6 mb-8">
            <div className="space-y-4">
              <h3 className="font-semibold">AI Analysis in Progress...</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing text patterns</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sentiment analysis</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cross-referencing sources</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </Card>
        )}

        {/* Results */}
        {result && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Result */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Detection Result</h3>
              
              <div className="text-center mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold ${
                  result.prediction === 'REAL' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {result.prediction === 'REAL' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5" />
                  )}
                  {result.prediction}
                </div>
                
                <div className="mt-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {result.confidence.toFixed(1)}%
                  </div>
                  <div className="text-gray-600">Confidence Score</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Confidence Level</span>
                    <span>{result.confidence.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={result.confidence} 
                    className={`h-3 ${result.prediction === 'REAL' ? '[&>div]:bg-green-500' : '[&>div]:bg-red-500'}`}
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Analysis Explanation</h4>
                <p className="text-sm text-gray-700">{result.explanation}</p>
              </div>
            </Card>

            {/* Detailed Metrics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Detailed Analysis
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sentiment Score</span>
                    <span>{result.factors.sentimentScore.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.factors.sentimentScore} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pattern Analysis</span>
                    <span>{result.factors.patternAnalysis.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.factors.patternAnalysis} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Source Credibility</span>
                    <span>{result.factors.sourceCredibility.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.factors.sourceCredibility} className="h-2" />
                </div>

                {result.factors.keywordFlags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Flagged Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.factors.keywordFlags.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-orange-600 border-orange-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-gray-600">
              Advanced NLP algorithms analyze text patterns, sentiment, and linguistic features
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Real-time Detection</h3>
            <p className="text-sm text-gray-600">
              Instant analysis with confidence scores and detailed explanations
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Comprehensive Metrics</h3>
            <p className="text-sm text-gray-600">
              Multiple analysis factors including sentiment, patterns, and source credibility
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
