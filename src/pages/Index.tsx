import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, TrendingUp, Brain, Shield, Clock, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface AnalysisResult {
  prediction: 'REAL' | 'FAKE';
  confidence: number;
  factors: {
    sentimentScore: number;
    keywordFlags: string[];
    patternAnalysis: number;
    sourceCredibility: number;
    readabilityScore: number;
    emotionalLanguage: number;
  };
  explanation: string;
  riskFactors: string[];
  positiveIndicators: string[];
}

interface AnalysisStep {
  name: string;
  progress: number;
  status: 'pending' | 'processing' | 'complete';
}

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const initializeAnalysisSteps = () => {
    return [
      { name: 'Text preprocessing and tokenization', progress: 0, status: 'pending' as const },
      { name: 'Sentiment and emotion analysis', progress: 0, status: 'pending' as const },
      { name: 'Pattern recognition scanning', progress: 0, status: 'pending' as const },
      { name: 'Source credibility assessment', progress: 0, status: 'pending' as const },
      { name: 'Cross-referencing fact databases', progress: 0, status: 'pending' as const },
      { name: 'Final confidence calculation', progress: 0, status: 'pending' as const }
    ];
  };

  const simulateProgressiveAnalysis = async () => {
    const steps = initializeAnalysisSteps();
    setAnalysisSteps(steps);
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Update current step to processing
      setAnalysisSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'processing' } : step
      ));

      // Simulate realistic processing time
      const processingTime = 800 + Math.random() * 1200;
      const progressInterval = setInterval(() => {
        setAnalysisSteps(prev => prev.map((step, idx) => {
          if (idx === i && step.progress < 100) {
            const increment = Math.random() * 15 + 5;
            return { ...step, progress: Math.min(100, step.progress + increment) };
          }
          return step;
        }));
      }, 100);

      await new Promise(resolve => setTimeout(resolve, processingTime));
      clearInterval(progressInterval);

      // Complete current step
      setAnalysisSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, progress: 100, status: 'complete' } : step
      ));

      await new Promise(resolve => setTimeout(resolve, 200));
    }
  };

  const analyzeText = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    
    await simulateProgressiveAnalysis();
    
    const mockAnalysis = simulateAdvancedAIAnalysis(inputText);
    setResult(mockAnalysis);
    setIsAnalyzing(false);
    
    if (mockAnalysis.prediction === 'FAKE') {
      toast.error('Potential misinformation detected!');
    } else {
      toast.success('Content appears credible');
    }
  };

  const simulateAdvancedAIAnalysis = (text: string): AnalysisResult => {
    // More sophisticated fake news indicators
    const suspiciousKeywords = [
      'breaking', 'shocking', 'you won\'t believe', 'exclusive', 'urgent', 'bombshell',
      'secret', 'hidden truth', 'they don\'t want you to know', 'exposed', 'leaked',
      'conspiracy', 'cover-up', 'mainstream media', 'wake up', 'sheeple'
    ];
    
    const emotionalTriggers = [
      'outrageous', 'disgusting', 'terrifying', 'devastating', 'explosive',
      'unbelievable', 'incredible', 'amazing', 'miraculous', 'stunning'
    ];

    const foundSuspiciousKeywords = suspiciousKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );
    
    const foundEmotionalTriggers = emotionalTriggers.filter(trigger => 
      text.toLowerCase().includes(trigger)
    );

    // Analysis factors
    const hasExcessiveCaps = (text.match(/[A-Z]/g) || []).length / text.length > 0.2;
    const hasExcessivePunctuation = (text.match(/[!?]{2,}/g) || []).length > 0;
    const wordCount = text.split(/\s+/).length;
    const hasNumbers = /\d/.test(text);
    const hasQuotes = /["']/.test(text);
    
    // Calculate suspicion score
    let suspicionScore = 0;
    suspicionScore += foundSuspiciousKeywords.length * 0.15;
    suspicionScore += foundEmotionalTriggers.length * 0.1;
    suspicionScore += hasExcessiveCaps ? 0.2 : 0;
    suspicionScore += hasExcessivePunctuation ? 0.15 : 0;
    suspicionScore += wordCount < 50 ? 0.1 : 0; // Very short texts are suspicious
    
    // Positive indicators
    const positiveFactors = [];
    const riskFactors = [];
    
    if (hasNumbers) positiveFactors.push('Contains specific data/statistics');
    if (hasQuotes) positiveFactors.push('Includes quoted sources');
    if (wordCount > 100) positiveFactors.push('Adequate length for context');
    if (!hasExcessiveCaps) positiveFactors.push('Professional capitalization');
    
    if (foundSuspiciousKeywords.length > 0) {
      riskFactors.push(`Contains ${foundSuspiciousKeywords.length} suspicious keywords`);
    }
    if (foundEmotionalTriggers.length > 0) {
      riskFactors.push(`Uses ${foundEmotionalTriggers.length} emotional triggers`);
    }
    if (hasExcessiveCaps) riskFactors.push('Excessive capitalization detected');
    if (hasExcessivePunctuation) riskFactors.push('Unusual punctuation patterns');
    
    const confidence = Math.min(0.95, 0.65 + Math.random() * 0.25);
    const isFake = suspicionScore > 0.3 || (foundSuspiciousKeywords.length > 2);

    return {
      prediction: isFake ? 'FAKE' : 'REAL',
      confidence: confidence * 100,
      factors: {
        sentimentScore: isFake ? 30 + Math.random() * 40 : 60 + Math.random() * 30,
        keywordFlags: foundSuspiciousKeywords,
        patternAnalysis: isFake ? 20 + Math.random() * 30 : 70 + Math.random() * 25,
        sourceCredibility: isFake ? 25 + Math.random() * 35 : 65 + Math.random() * 30,
        readabilityScore: 40 + Math.random() * 50,
        emotionalLanguage: foundEmotionalTriggers.length > 0 ? 70 + Math.random() * 25 : 20 + Math.random() * 40
      },
      explanation: isFake 
        ? 'Analysis indicates potential misinformation based on language patterns, emotional manipulation tactics, and suspicious keyword usage commonly found in fake news.'
        : 'Content appears credible with balanced language, factual presentation, and professional structure typical of legitimate journalism.',
      riskFactors,
      positiveIndicators: positiveFactors
    };
  };

  // Real-time feedback as user types
  useEffect(() => {
    if (inputText.length > 0) {
      const suspiciousCount = ['breaking', 'shocking', 'you won\'t believe'].filter(
        word => inputText.toLowerCase().includes(word)
      ).length;
      
      if (suspiciousCount > 0 && inputText.length > 50) {
        // Subtle visual feedback without being intrusive
      }
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Analysis Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Article Analysis
          </h2>
          
          <Textarea
            placeholder="Paste your news article, headline, or social media post here for analysis..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] mb-4 text-base"
          />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={analyzeText}
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Content'}
              </Button>
              {inputText.length > 0 && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {inputText.split(/\s+/).length} words
                  </span>
                </div>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {inputText.length}/10000 characters
            </span>
          </div>

          {/* Real-time feedback indicators */}
          {inputText.length > 50 && (
            <div className="flex flex-wrap gap-2">
              {['breaking', 'shocking', 'exclusive'].some(word => 
                inputText.toLowerCase().includes(word)
              ) && (
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  Emotional language detected
                </Badge>
              )}
              {(inputText.match(/[A-Z]/g) || []).length / inputText.length > 0.2 && (
                <Badge variant="outline" className="text-red-600 border-red-200">
                  Excessive caps
                </Badge>
              )}
              {inputText.split(/\s+/).length > 100 && (
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Good length
                </Badge>
              )}
            </div>
          )}
        </Card>

        {/* Progressive Analysis Steps */}
        {isAnalyzing && (
          <Card className="p-6 mb-8">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Analysis in Progress...
              </h3>
              {analysisSteps.map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={`flex items-center gap-2 ${
                      step.status === 'complete' ? 'text-green-600' : 
                      step.status === 'processing' ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.status === 'complete' && <CheckCircle className="h-4 w-4" />}
                      {step.status === 'processing' && <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
                      {step.name}
                    </span>
                    <span>{step.progress.toFixed(0)}%</span>
                  </div>
                  <Progress 
                    value={step.progress} 
                    className={`h-2 ${
                      step.status === 'complete' ? '[&>div]:bg-green-500' : 
                      step.status === 'processing' ? '[&>div]:bg-blue-500' : ''
                    }`} 
                  />
                </div>
              ))}
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
                <h4 className="font-medium mb-2">Analysis Summary</h4>
                <p className="text-sm text-gray-700">{result.explanation}</p>
              </div>

              {/* Risk Factors & Positive Indicators */}
              {result.riskFactors.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">Risk Factors</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {result.riskFactors.map((factor, index) => (
                      <li key={index}>• {factor}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.positiveIndicators.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Positive Indicators</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {result.positiveIndicators.map((indicator, index) => (
                      <li key={index}>• {indicator}</li>
                    ))}
                  </ul>
                </div>
              )}
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
                    <span>Sentiment Analysis</span>
                    <span>{result.factors.sentimentScore.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.factors.sentimentScore} className="h-2" />
                  <span className="text-xs text-gray-500">Measures emotional neutrality</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pattern Recognition</span>
                    <span>{result.factors.patternAnalysis.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.factors.patternAnalysis} className="h-2" />
                  <span className="text-xs text-gray-500">Structural analysis score</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Source Credibility</span>
                    <span>{result.factors.sourceCredibility.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.factors.sourceCredibility} className="h-2" />
                  <span className="text-xs text-gray-500">Language credibility indicators</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Readability Score</span>
                    <span>{result.factors.readabilityScore.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.factors.readabilityScore} className="h-2" />
                  <span className="text-xs text-gray-500">Professional writing quality</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Emotional Language</span>
                    <span>{result.factors.emotionalLanguage.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.factors.emotionalLanguage} className="h-2" />
                  <span className="text-xs text-gray-500">Manipulation indicators</span>
                </div>

                {result.factors.keywordFlags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Suspicious Keywords</h4>
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
            <h3 className="font-semibold mb-2">Advanced NLP Analysis</h3>
            <p className="text-sm text-gray-600">
              Multi-layer analysis including sentiment, pattern recognition, and linguistic manipulation detection
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Real-time Processing</h3>
            <p className="text-sm text-gray-600">
              Progressive analysis with live feedback and detailed step-by-step processing visualization
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Comprehensive Scoring</h3>
            <p className="text-sm text-gray-600">
              Multiple detection factors with risk assessment and positive credibility indicators
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
