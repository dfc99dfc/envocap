import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, BarChart3, CheckCircle, Zap, Target, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-background via-white to-agri-primary/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              {/* Hero Heading */}
              <h1 className="font-heading font-semibold text-agri-text" style={{ fontSize: '60px', letterSpacing: '-1.5px', lineHeight: '60px' }}>
                <div style={{ fontFamily: 'Albert Sans, sans-serif', lineHeight: '68px', fontWeight: 600 }}>ENVOCAP</div>
                <div className="block bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, rgb(91, 204, 109), rgb(182, 228, 96))', marginTop: '8px', fontFamily: 'Glegoo, serif', fontSize: '36px', lineHeight: '48px', fontWeight: 400 }}>
                  <span style={{ color: 'rgb(39, 75, 113)' }}>
                    Generate Sustainability Reports
                    <br />
                  </span>
                  In Hours, Not Months
                </div>
              </h1>
              
            </div>

            <div className="text-sm text-agri-text-light mt-4" style={{ fontSize: '14px', lineHeight: '20px' }}>
              ENCOVAP turns your invoices and operations data into CSRD/GRI-ready reports – for SMEs. Professional sustainability reporting made simple and affordable.
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/onboarding">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-agri-primary to-agri-primary-light hover:from-agri-primary-dark hover:to-agri-primary text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl hover-lift"
                >
                  Start Onboarding
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/report">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white px-8 py-6 text-lg border-2 border-agri-secondary/30 text-agri-secondary hover:bg-agri-secondary/5 rounded-xl transition-all duration-300 hover-lift"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  View Sample Report
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8">
              <p className="text-sm text-agri-text-light" style={{ fontSize: '14px', lineHeight: '20px' }}>
                No Credit card required · 5-minute setup&nbsp;
                <br />
                Trusted by SMEs across Europe
              </p>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative animate-scale-in">
            <Card className="glass shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 rounded-2xl overflow-hidden group">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between border-b border-agri-primary/10 pb-4">
                    <h3 className="text-xl font-heading font-semibold text-agri-text flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-xl flex items-center justify-center shadow-md">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <span>ESG Dashboard</span>
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-agri-success to-agri-primary-light rounded-full animate-pulse"></div>
                      <span className="text-sm text-agri-text-light font-medium">Real-time</span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-agri-primary/10 to-agri-primary/5 p-3 rounded-xl border border-agri-primary/20 hover:scale-105 transition-transform duration-300 group-hover:shadow-md">
                      <div className="text-2xl font-heading font-bold text-agri-primary">24 tCO₂</div>
                      <div className="text-sm text-agri-text-light font-medium">Carbon Emissions</div>
                    </div>
                    <div className="bg-gradient-to-br from-agri-secondary/10 to-agri-secondary/5 p-3 rounded-xl border border-agri-secondary/20 hover:scale-105 transition-transform duration-300 group-hover:shadow-md">
                      <div className="text-2xl font-heading font-bold text-agri-secondary">92%</div>
                      <div className="text-sm text-agri-text-light font-medium">Compliance Score</div>
                    </div>
                  </div>

                  {/* Chart Mockup */}
                  <div className="space-y-4">
                    <h4 className="text-base font-heading font-semibold text-agri-text">Carbon Footprint Breakdown</h4>
                    <div className="space-y-4">
                      {[
                        { label: "Energy", percentage: 60, color: "agri-primary" },
                        { label: "Transport", percentage: 25, color: "agri-secondary" },
                        { label: "Suppliers", percentage: 15, color: "agri-accent" }
                      ].map((item, index) => (
                        <div key={index} className="grid grid-cols-[80px_1fr_50px] gap-3 items-center">
                          <span className="text-sm text-agri-text-light font-medium">{item.label}</span>
                          <div className="bg-agri-background/50 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-3 rounded-full transition-all duration-1000 bg-gradient-to-r ${
                                item.color === 'agri-primary' ? 'from-agri-primary to-agri-primary-light' :
                                item.color === 'agri-secondary' ? 'from-agri-secondary to-agri-secondary-light' :
                                'from-agri-accent to-agri-accent-light'
                              }`}
                              style={{ 
                                width: `${item.percentage}%`,
                                animationDelay: `${index * 200}ms`
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-agri-text text-right">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Report Preview */}
                  <div className="bg-gradient-to-r from-agri-background to-white p-3 rounded-xl border border-agri-primary/10">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-xl shadow-md">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-heading font-semibold text-agri-text">ESG Report Q4 2024</div>
                        <div className="text-xs text-agri-text-light">CSRD & GRI compliant</div>
                      </div>
                      <div className="p-2 bg-agri-success/10 rounded-full">
                        <CheckCircle className="h-5 w-5 text-agri-success" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-agri-accent to-agri-accent-dark text-white p-4 rounded-2xl shadow-xl animate-bounce">
              <Zap className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass shadow-xl p-4 rounded-2xl border border-white/30 animate-pulse">
              <Upload className="h-6 w-6 text-agri-primary" />
            </div>
            <div className="absolute top-1/2 -right-2 bg-gradient-to-br from-agri-primary to-agri-primary-light text-white p-3 rounded-full shadow-lg">
              <Target className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
