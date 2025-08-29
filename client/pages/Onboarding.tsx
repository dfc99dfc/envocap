import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Leaf, ArrowLeft, ArrowRight, Building, Users, Globe, FileCheck, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import CountrySelector from "@/components/CountrySelector";
import IndustrySelector from "@/components/IndustrySelector";
import { Logo } from "@/components/Logo";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    sector: "",
    country: "",
    frameworks: [],
    useCase: ""
  });

  const handleFrameworkChange = (framework: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      frameworks: checked 
        ? [...prev.frameworks, framework]
        : prev.frameworks.filter(f => f !== framework)
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return Boolean(formData.companyName && formData.companySize);
      case 2:
        return Boolean(formData.sector && formData.country);
      case 3:
        return formData.frameworks.length > 0;
      case 4:
        return Boolean(formData.useCase);
      default:
        return false;
    }
  };

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
      <div className="container mx-auto mb-8" style={{padding: "24px 16px 0"}}>
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-4 mb-4 px-2 relative">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center relative z-10 justify-self-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                  i === step ? 'bg-agri-primary text-white' :
                  i < step ? 'bg-agri-primary text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 text-center mt-2" style={{
                  ...(i === step ? {fontWeight: 'medium', color: 'rgba(74, 74, 74, 1)'} : {})
                }}>
                  {i === 1 && "Company Info"}
                  {i === 2 && "Industry & Country"}
                  {i === 3 && "Framework Selection"}
                  {i === 4 && "Use Case"}
                </div>
              </div>
            ))}
            {/* Connecting line - positioned behind circles */}
            <div className="absolute top-4 sm:top-5 h-1 sm:h-2 bg-gray-200 rounded-full z-0" style={{
              left: 'calc(25% / 2)',
              right: 'calc(25% / 2)'
            }}>
              <div className={`h-full bg-agri-primary rounded-full`} style={{
                width: step === 1 ? '0%' : step === 2 ? '33%' : step === 3 ? '66%' : '100%'
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center" style={{padding: "24px 12px 12px"}}>
              <CardTitle className="text-xl sm:text-2xl text-gray-900">
                {step === 1 && "Onboarding - Tell us about your company"}
                {step === 2 && "Onboarding - Industry & Country"}
                {step === 3 && "Onboarding - Select Framework"}
                {step === 4 && "Onboarding - Primary Use Case"}
              </CardTitle>
              <p className="text-gray-600">
                {step === 1 && "Help us customize your sustainability reporting experience"}
                {step === 2 && "Select your industry and country"}
                {step === 3 && "Choose the report frameworks you need for compliance"}
                {step === 4 && "This helps us prioritize the right metrics for your report"}
              </p>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 lg:p-8">
              {/* Step 1: Company Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>Company Name</span>
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="e.g. Green Solutions Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companySize" className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Company Size</span>
                      </Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of employees" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10" className="pl-2">1-10 employees</SelectItem>
                          <SelectItem value="11-50" className="pl-2">11-50 employees</SelectItem>
                          <SelectItem value="51-250" className="pl-2">51-250 employees</SelectItem>
                          <SelectItem value="251-500" className="pl-2">251-500 employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Industry & Country */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <IndustrySelector
                      value={formData.sector}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}
                      placeholder="Select your industry"
                    />
                    <CountrySelector
                      value={formData.country}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                      placeholder="Select your country"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Framework Selection */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    {[
                      { id: "csrd", name: "CSRD", desc: "Corporate Sustainability Reporting Directive (EU)" },
                      { id: "gri", name: "GRI", desc: "Global Reporting Initiative Standards" },
                      { id: "issb", name: "ISSB", desc: "International Sustainability Standards Board" },
                      { id: "sasb", name: "SASB", desc: "Sustainability Accounting Standards Board" },
                      { id: "ecocert", name: "EcoCert", desc: "Environmental Certification Standards" }
                    ].map((framework) => (
                      <div key={framework.id} className="flex items-start space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-agri-primary/5 transition-colors">
                        <Checkbox
                          id={framework.id}
                          checked={formData.frameworks.includes(framework.id)}
                          onCheckedChange={(checked) => handleFrameworkChange(framework.id, checked as boolean)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <FileCheck className="h-4 w-4 text-agri-primary" />
                            <Label htmlFor={framework.id} className="font-medium text-gray-900 cursor-pointer">
                              {framework.name}
                            </Label>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{framework.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Use Case */}
              {step === 4 && (
                <div className="space-y-6">
                  <RadioGroup 
                    value={formData.useCase} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, useCase: value }))}
                  >
                    {[
                      { id: "bank-loan", label: "Bank loan application", desc: "Need ESG metrics for financing" },
                      { id: "supplier-request", label: "Supplier request", desc: "Responding to supply chain sustainability requirements" },
                      { id: "tender-application", label: "Tender application", desc: "Required for public/private sector bids" },
                      { id: "internal-report", label: "Internal reporting", desc: "For board reporting and strategic planning" }
                    ].map((option) => (
                      <div key={option.id} className="flex items-start space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-agri-primary/5 transition-colors">
                        <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-agri-primary" />
                            <Label htmlFor={option.id} className="font-medium text-gray-900 cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between pt-6 sm:pt-8 space-y-4 sm:space-y-0">
                <div>
                  {step > 1 && (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                </div>
                
                <div>
                  {step < 4 ? (
                    <Button
                      onClick={() => setStep(step + 1)}
                      disabled={!canProceed()}
                      className="bg-gradient-to-r from-agri-primary to-agri-primary-light hover:from-agri-primary-dark hover:to-agri-primary text-white"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Link to="/dashboard">
                        <Button variant="outline" disabled={!canProceed()}>
                          Finish Onboarding
                        </Button>
                      </Link>
                      <Link to="/upload">
                        <Button
                          disabled={!canProceed()}
                          className="bg-gradient-to-r from-agri-primary to-agri-primary-light hover:from-agri-primary-dark hover:to-agri-primary text-white"
                        >
                          Upload Data
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
