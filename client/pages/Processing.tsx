import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, ArrowLeft, CheckCircle, Loader2, Brain, BarChart3, FileCheck, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed';
  duration: number; // seconds
}

const processingSteps: ProcessingStep[] = [
  {
    id: '1',
    title: 'Extracting data...',
    description: 'Reading and parsing uploaded files using OCR and data extraction algorithms',
    icon: <FileCheck className="h-5 w-5" />,
    status: 'pending',
    duration: 2
  },
  {
    id: '2',
    title: 'Mapping to sustainability categories...',
    description: 'Classifying data into environmental, social, and governance metrics',
    icon: <Brain className="h-5 w-5" />,
    status: 'pending',
    duration: 2.5
  },
  {
    id: '3',
    title: 'Calculating carbon emissions...',
    description: 'Computing CO₂ footprint using industry-standard emission factors',
    icon: <BarChart3 className="h-5 w-5" />,
    status: 'pending',
    duration: 2
  },
  {
    id: '4',
    title: 'Drafting ESG report...',
    description: 'Generating comprehensive sustainability report with compliance mappings',
    icon: <Sparkles className="h-5 w-5" />,
    status: 'pending',
    duration: 1.5
  }
];

export default function Processing() {
  const [steps, setSteps] = useState<ProcessingStep[]>(processingSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [overallProgress, setOverallProgress] = useState(0);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Start processing automatically when component mounts
    const startProcessing = () => {
      let cumulativeTime = 0;
      
      steps.forEach((step, index) => {
        // Start processing this step
        setTimeout(() => {
          setCurrentStepIndex(index);
          setSteps(prev => prev.map((s, i) => 
            i === index ? { ...s, status: 'processing' } : s
          ));
          setOverallProgress((index / steps.length) * 100);
        }, cumulativeTime * 1000);

        // Complete this step
        cumulativeTime += step.duration;
        setTimeout(() => {
          setSteps(prev => prev.map((s, i) => 
            i === index ? { ...s, status: 'completed' } : s
          ));
          setOverallProgress(((index + 1) / steps.length) * 100);
          
          // If this is the last step
          if (index === steps.length - 1) {
            setTimeout(() => {
              setProcessingComplete(true);
              setCurrentStepIndex(-1);
              setShowStats(true);
            }, 500);
          }
        }, cumulativeTime * 1000);
      });
    };

    startProcessing();
  }, []);

  const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-background via-white to-agri-primary/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/dashboard">
            <Button variant="outline" className="border-agri-primary/20 text-agri-primary hover:bg-agri-primary/10">
              Dashboard
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            Back
          </Button>
        </nav>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 mb-4 px-2 relative">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center relative z-10 justify-self-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                  i === 1 ? 'bg-agri-primary text-white' :
                  i === 2 ? 'bg-agri-primary text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 text-center mt-2" style={{
                  ...(i === 2 ? {fontWeight: 'medium', color: 'rgba(74, 74, 74, 1)'} : {})
                }}>
                  {i === 1 && "Upload Data"}
                  {i === 2 && "Processing"}
                  {i === 3 && "Report Preview"}
                </div>
              </div>
            ))}
            {/* Connecting line - positioned behind circles */}
            <div className="absolute top-4 sm:top-5 h-1 sm:h-2 bg-gray-200 rounded-full z-0" style={{
              left: 'calc(33.33% / 2)',
              right: 'calc(33.33% / 2)'
            }}>
              <div className="h-full bg-agri-primary rounded-full" style={{width: '50%'}} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-4" style={{padding: '20px 0 12px'}}>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              AI Processing Your Data
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI is analyzing your uploaded files and generating your sustainability report. This typically takes 3-5 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Processing Steps */}
            <div className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Processing Progress</span>
                    <span className="text-sm font-normal text-gray-500">
                      {processingComplete ? 'Complete' : `${Math.round(overallProgress)}%`}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Progress value={overallProgress} className="h-1 sm:h-2" />
                  
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`p-4 rounded-lg border transition-all`}
                        style={{
                          borderColor: step.status === 'completed' ? 'rgba(184, 233, 134, 0.4)' : step.status === 'processing' ? 'rgba(71,170,253,0.2)' : 'rgb(229, 231, 235)',
                          backgroundColor: step.status === 'completed' ? 'rgba(184, 233, 134, 0.1)' : step.status === 'processing' ? 'rgba(71,170,253,0.05)' : 'rgb(255, 255, 255)'
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className="p-2 rounded-full"
                            style={{
                              backgroundColor: step.status === 'completed' ? 'rgba(184, 233, 134, 1)' : step.status === 'processing' ? 'rgba(71,170,253,0.1)' : 'rgb(243, 244, 246)',
                              color: step.status === 'completed' ? 'rgba(65, 117, 5, 1)' : step.status === 'processing' ? 'rgba(71,170,253,1)' : 'rgb(156, 163, 175)'
                            }}
                          >
                            {step.status === 'processing' ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : step.status === 'completed' ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              step.icon
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4
                              className="font-medium"
                              style={{
                                color: step.status === 'completed' ? 'rgba(65, 117, 5, 1)' : step.status === 'processing' ? 'rgba(71,170,253,1)' : 'rgb(75, 85, 99)'
                              }}
                            >
                              {step.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {step.description}
                            </p>
                            
                            {step.status === 'processing' && (
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div className="h-1 rounded-full animate-pulse" style={{ width: '60%', backgroundColor: 'rgba(71,170,253,1)' }}></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Stats */}
            <div className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-agri-primary" />
                    <span>Real-time Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showStats ? (
                    <div className="space-y-6 opacity-50">
                      <div className="text-center py-12">
                        <Loader2 className="h-12 w-12 text-agri-primary animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">Analyzing your data...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Key Metrics Preview */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-agri-primary/5 p-3 sm:p-4 rounded-lg">
                          <div className="text-xl sm:text-2xl font-bold text-agri-primary">24.8 tCO₂</div>
                          <div className="text-xs sm:text-sm text-gray-600">Total Carbon Emissions</div>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg" style={{backgroundColor: 'rgba(71,170,253,0.05)'}}>
                          <div className="text-xl sm:text-2xl font-bold" style={{color: 'rgba(71,170,253,1)'}}>94%</div>
                          <div className="text-xs sm:text-sm text-gray-600">CSRD Compliance</div>
                        </div>
                      </div>

                      {/* Data Sources */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Data Sources Processed</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Energy consumption</span>
                            <span className="font-medium" style={{color: 'rgba(65, 117, 5, 1)'}}>✓ 12 months</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Transportation data</span>
                            <span className="font-medium" style={{color: 'rgba(65, 117, 5, 1)'}}>✓ 156 receipts</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Supplier information</span>
                            <span className="font-medium" style={{color: 'rgba(65, 117, 5, 1)'}}>✓ 23 vendors</span>
                          </div>
                        </div>
                      </div>

                      {/* Compliance Preview */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Framework Coverage</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">CSRD Requirements</span>
                            <span className="font-medium" style={{color: 'rgba(65, 117, 5, 1)'}}>18/19 covered</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">GRI Standards</span>
                            <span className="font-medium" style={{color: 'rgba(65, 117, 5, 1)'}}>12/15 covered</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card style={{borderColor: 'rgba(71,170,253,0.2)', backgroundColor: 'rgba(71,170,253,0.05)'}}>
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <Brain className="h-5 w-5 mt-0.5" style={{color: 'rgba(71,170,253,1)'}} />
                    <div>
                      <h3 className="font-medium mb-2" style={{color: 'rgba(71,170,253,0.9)'}}>AI Insights</h3>
                      {!processingComplete ? (
                        <p className="text-sm" style={{color: 'rgba(71,170,253,0.8)'}}>
                          Our AI is analyzing patterns in your data to provide actionable sustainability insights...
                        </p>
                      ) : (
                        <ul className="text-sm space-y-1" style={{color: 'rgba(71,170,253,0.8)'}}>
                          <li>• Energy usage 23% above industry average</li>
                          <li>• 3 suppliers lack sustainability certifications</li>
                          <li>• Transport emissions could be reduced by 15%</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center mt-12 pt-8">
            {processingComplete ? (
              <Link to="/report">
                <Button size="lg" className="bg-gradient-to-r from-agri-primary to-agri-primary-light hover:from-agri-primary-dark hover:to-agri-primary text-white px-8 py-4">
                  View Report Preview
                  <CheckCircle className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-3 text-gray-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing will complete automatically...</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
