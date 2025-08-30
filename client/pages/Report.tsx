import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, X, Download, Lock, CheckCircle, BarChart3, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { downloadSamplePDF, downloadStyledReport } from "@/lib/pdf-utils";
import { Logo } from "@/components/Logo";

export default function Report() {
  const currentDate = new Date().toLocaleDateString();
  const reportId = `VDT-${Date.now()}`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-background via-white to-agri-primary/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <Link to="/dashboard">
            <Button variant="outline" className="border-agri-primary/20 text-agri-primary hover:bg-agri-primary/10">
              Dashboard
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" aria-label="Close and return to dashboard">
                <X className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="sm"
              className="bg-gradient-to-r from-agri-primary to-agri-primary-light hover:from-agri-primary-dark hover:to-agri-primary text-white"
              onClick={downloadSamplePDF}
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white"
              onClick={downloadStyledReport}
            >
              <Download className="h-4 w-4 mr-2" />
              Styled Report
            </Button>
          </div>
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
                  i === 3 ? 'bg-agri-primary text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 text-center mt-2" style={{
                  ...(i === 3 ? {fontWeight: 'medium', color: 'rgba(74, 74, 74, 1)'} : {})
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
              <div className="h-full bg-agri-primary rounded-full" style={{width: '100%'}} />
            </div>
          </div>
        </div>
      </div>

      {/* Full Page Report Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl">
        {/* Professional Header with Enhanced ENVOCAP Branding */}
        <div className="text-white p-6 sm:p-8 lg:p-12 relative overflow-hidden" style={{backgroundColor: 'rgba(255, 255, 255, 1)'}}>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <Logo size="md" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6" style={{lineHeight: '1.1'}}>
              <div style={{color: 'rgba(0, 0, 0, 1)', lineHeight: '72px'}}>Corporate Sustainability</div>
              <div className="bg-clip-text text-transparent" style={{backgroundColor: 'rgba(0, 0, 0, 1)', lineHeight: '72px'}}>Reporting Directive</div>
            </h1>
            <div className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 font-medium" style={{color: 'rgba(149, 149, 149, 1)'}}>ESG Disclosure Report 2024 • CSRD Compliant</div>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-8">
              <Badge className="bg-white px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold backdrop-blur-sm" style={{border: '1px solid #5CCC6D', color: '#5CCC6D'}}>✓ CSRD COMPLIANT</Badge>
              <Badge className="bg-white px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold backdrop-blur-sm" style={{border: '1px solid rgba(144, 195, 53, 1)', color: 'rgba(144, 195, 53, 1)'}}>✓ GRI STANDARDS</Badge>
              <Badge className="bg-white px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold backdrop-blur-sm" style={{border: '1px solid #D6C4FF', color: '#D6C4FF'}}>✓ ISSB ALIGNED</Badge>
              <Badge className="bg-white px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold backdrop-blur-sm" style={{border: '1px solid #4dacfd', color: 'rgb(71, 170, 253)'}}>✓ EU TAXONOMY</Badge>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="p-4 sm:p-6 lg:p-10 border-l-4 sm:border-l-8" style={{marginBottom: '20px', backgroundColor: '#F5F7FA', color: '#D6C4FF', borderLeftColor: '#D6C4FF'}}>
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg mr-3" style={{backgroundColor: '#D6C4FF', color: '#D6C4FF'}}>
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-6 sm:leading-8" style={{color: '#D6C4FF', letterSpacing: '-0.6px'}}>Report Information</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-sm">
            <div>
              <span className="text-gray-600">Company Name:</span>
              <div className="font-semibold text-gray-900">Green Solutions Ltd</div>
            </div>
            <div>
              <span className="text-gray-600">Industry Sector:</span>
              <div className="font-semibold text-gray-900">Manufacturing (NACE Code C25)</div>
            </div>
            <div>
              <span className="text-gray-600">Reporting Period:</span>
              <div className="font-semibold text-gray-900">FY 2024 (January 1 - December 31, 2024)</div>
            </div>
            <div>
              <span className="text-gray-600">Report ID:</span>
              <div className="font-semibold text-gray-900">{reportId}</div>
            </div>
            <div>
              <span className="text-gray-600">Generated Date:</span>
              <div className="font-semibold text-gray-900">{currentDate}</div>
            </div>
            <div>
              <span className="text-gray-600">Prepared By:</span>
              <div className="font-semibold text-gray-900">ENVOCAP Platform</div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl mx-2 sm:mx-4" style={{border: '2px solid #f0fbe7'}}>
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl mr-4" style={{backgroundColor: '#5CCC6D'}}>
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Executive Summary</h2>
              <div className="font-medium" style={{color: '#5CCC6D'}}>Key Performance Highlights</div>
            </div>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            This Corporate Sustainability Reporting Directive (CSRD) compliant report presents Green Solutions Ltd's
            environmental, social, and governance performance for the 2024 fiscal year. Our comprehensive approach to
            sustainability demonstrates a <strong>12% reduction in carbon emissions</strong> and <strong>94% compliance</strong>
            with CSRD requirements, reflecting our commitment to the European Green Deal objectives.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center transition-all duration-300" style={{backgroundColor: 'rgba(255, 255, 255, 1)', border: '2px solid #5CCC6D'}}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 flex items-center justify-center">
                <div style={{fontSize: 'clamp(20px, 4vw, 32px)', color: '#5CCC6D'}}>24.8 tCO₂</div>
              </div>
              <div className="text-xs sm:text-sm font-bold mb-2" style={{color: '#5CCC6D'}}>Scope 1 & 2 Emissions</div>
              <div className="text-xs text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full font-semibold" style={{backgroundColor: '#5CCC6D'}}>↓ 12% vs. 2023</div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center transition-all duration-300" style={{backgroundColor: 'rgba(255, 255, 255, 1)', border: '2px solid rgba(254, 174, 138, 1)'}}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 flex items-center justify-center">
                <div style={{fontSize: 'clamp(18px, 4vw, 28px)', color: '#FFA726'}}>156.2 MWh</div>
              </div>
              <div className="text-xs sm:text-sm font-bold mb-2" style={{color: '#FFA726'}}>Energy Consumption</div>
              <div className="text-xs text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full font-semibold" style={{backgroundColor: '#FFA726'}}>↑ 3% vs. 2023</div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center transition-all duration-300" style={{backgroundColor: 'rgba(255, 255, 255, 1)', border: '2px solid #ba9eff'}}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 flex items-center justify-center">
                <div style={{fontSize: 'clamp(20px, 4vw, 32px)', color: '#D6C4FF'}}>€2.1M</div>
              </div>
              <div className="text-xs sm:text-sm font-bold mb-2" style={{color: '#D6C4FF'}}>Green Investments</div>
              <div className="text-xs text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full font-semibold" style={{backgroundColor: '#D6C4FF'}}>↑ 45% vs. 2023</div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center transition-all duration-300" style={{backgroundColor: 'rgba(255, 255, 255, 1)', border: '2px solid #48aafd'}}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 flex items-center justify-center">
                <div style={{fontSize: 'clamp(20px, 4vw, 32px)', color: '#29B6F6'}}>94%</div>
              </div>
              <div className="text-xs sm:text-sm font-bold mb-2" style={{color: '#29B6F6'}}>CSRD Compliance Score</div>
              <div className="text-xs text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full font-semibold" style={{backgroundColor: '#29B6F6'}}>Target: 90%</div>
            </div>
          </div>
        </div>

        {/* CSRD Environmental Disclosures */}
        <div className="p-4 sm:p-6 lg:p-10">
          <div className="text-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 relative overflow-hidden" style={{backgroundColor: '#F5F7FA'}}>
          <div className="relative z-10 flex items-center">
            <div className="px-4 py-2 rounded-xl font-black text-lg mr-6 backdrop-blur-sm border border-white/20" style={{backgroundColor: '#D6C4FF'}}>E1</div>
            <div>
              <h2 className="font-bold leading-6 sm:leading-8" style={{fontWeight: '700', fontSize: 'clamp(24px, 5vw, 32px)', color: '#D6C4FF', letterSpacing: '-0.6px'}}>
                <span style={{color: 'rgba(0, 0, 0, 1)'}}>Climate Change</span>
              </h2>
              <p className="text-base sm:text-lg font-medium" style={{color: 'rgba(17, 24, 39, 1)'}}>Environmental disclosure requirements under CSRD</p>
            </div>
          </div>
        </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-xl p-3 border-l-4 border-l-agri-primary">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge variant="secondary" className="mb-2 bg-gray-100 text-gray-700 font-mono text-xs">CSRD E1-1</Badge>
                  <h4 className="text-lg font-semibold text-gray-900">Transition Plan for Climate Change Mitigation</h4>
                </div>
                <Badge style={{backgroundColor: 'rgba(184, 233, 134, 0.2)', color: 'rgba(65, 117, 5, 1)'}}>✓&nbsp;COMPLIANT</Badge>
              </div>
              <p className="text-gray-700">Comprehensive climate transition plan targeting net-zero emissions by 2050, with interim targets of 50% reduction by 2030.</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-3 border-l-4 border-l-agri-primary">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge variant="secondary" className="mb-2 bg-gray-100 text-gray-700 font-mono text-xs">CSRD E1-6</Badge>
                  <h4 className="text-lg font-semibold text-gray-900">Gross Scopes 1, 2, 3 GHG Emissions</h4>
                </div>
                <Badge style={{backgroundColor: 'rgba(184, 233, 134, 0.2)', color: 'rgba(65, 117, 5, 1)'}}>✓&nbsp;COMPLIANT</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{color: '#5CCC6D'}}>8.2 tCO₂</div>
                  <div className="text-xs text-gray-600">Scope 1 (Direct)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{color: '#29B6F6'}}>16.6 tCO₂</div>
                  <div className="text-xs text-gray-600">Scope 2 (Indirect)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{color: '#D6C4FF'}}>12.4 tCO₂</div>
                  <div className="text-xs text-gray-600">Scope 3 (Value Chain)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Data Sources & Audit Trail */}
        <div className="p-4 sm:p-6 lg:p-10">
          <div className="flex items-center mb-8">
            <div className="p-3 rounded-xl mr-4" style={{backgroundColor: '#D6C4FF'}}>
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold" style={{color: 'rgba(0, 0, 0, 1)'}}>Data Sources & Audit Trail</h3>
              <div className="font-medium" style={{color: 'rgba(17, 24, 39, 1)'}}>Complete traceability and verification</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl mb-6" style={{borderColor: '#B29DFF', backgroundColor: '#D6C4FF'}}>
            <div className="text-center">
              <div className="text-lg font-bold mb-2" style={{color: 'rgba(255, 255, 255, 1)'}}>🛡️ Verification Summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div><span className="font-bold" style={{color: 'rgba(255, 255, 255, 1)'}}>127</span>
                  <div style={{color: 'rgba(255, 255, 255, 1)'}}> Documents Processed</div>
                </div>
                <div><span className="font-bold" style={{color: 'rgba(255, 255, 255, 1)'}}>100%</span>
                  <div style={{color: 'rgba(255, 255, 255, 1)'}}> Verification Rate</div>
                </div>
                <div><span className="font-bold" style={{color: 'rgba(255, 255, 255, 1)'}}>94%</span>
                  <div style={{color: 'rgba(255, 255, 255, 1)'}}> Data Quality Score</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-xl sm:rounded-2xl transition-all duration-300 space-y-2 sm:space-y-0" style={{backgroundColor: 'rgba(255, 255, 255, 1)', border: '2px solid #fff9c4'}}>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="text-xl sm:text-2xl p-2 sm:p-3 bg-yellow-100 rounded-lg sm:rounded-xl">⚡</div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg truncate sm:whitespace-normal">November Energy Bill - Green Energy Solutions Ltd</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">PDF • Uploaded: 2024-12-01 14:23</div>
                </div>
              </div>
              <div className="font-black text-base sm:text-lg px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl self-end sm:self-auto" style={{backgroundColor: '#FFF3E0', color: '#FFA726'}}>
                +2.1 tCO₂
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-xl sm:rounded-2xl transition-all duration-300 space-y-2 sm:space-y-0" style={{border: '2px solid #ffedd6'}}>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="text-xl sm:text-2xl p-2 sm:p-3 bg-orange-100 rounded-lg sm:rounded-xl">⛽</div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg truncate sm:whitespace-normal">Fleet Fuel Receipts - Q4 2024</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">CSV • Uploaded: 2024-11-28 09:15</div>
                </div>
              </div>
              <div className="font-black text-base sm:text-lg px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl self-end sm:self-auto" style={{backgroundColor: '#FFF3E0', color: '#FFA726'}}>
                +1.8 tCO₂
              </div>
            </div>

            <div className="flex justify-between items-center p-3 rounded-2xl transition-all duration-300" style={{border: '2px solid #dceaff'}}>
              <div className="flex items-center space-x-4">
                <div className="text-2xl p-3 bg-blue-100 rounded-xl">🤝</div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Supplier Sustainability Data - Manufacturing Partners</div>
                  <div className="text-sm text-slate-600 font-medium">XLSX • Uploaded: 2024-11-25 16:45</div>
                </div>
              </div>
              <div className="font-black text-lg px-4 py-2 rounded-xl" style={{backgroundColor: '#E3F2FD', color: '#29B6F6'}}>
                +0.9 tCO₂
              </div>
            </div>

            <div className="flex justify-between items-center p-3 rounded-2xl transition-all duration-300" style={{backgroundColor: 'rgba(255, 255, 255, 1)', border: '2px solid #ddfde8'}}>
              <div className="flex items-center space-x-4">
                <div className="text-2xl p-3 bg-green-100 rounded-xl">📱</div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Camera Scan - Office Waste Report</div>
                  <div className="text-sm text-slate-600 font-medium">JPG (OCR) • Uploaded: 2024-11-22 11:30</div>
                </div>
              </div>
              <div className="font-black text-lg px-4 py-2 rounded-xl" style={{backgroundColor: '#E8F5E8', color: '#5CCC6D'}}>
                -0.3 tCO₂
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Verification Stamp */}
        <div className="p-8 sm:p-12 lg:p-16 text-white text-center" style={{backgroundColor: '#5CCC6D'}}>
          <div>
            <div className="text-2xl font-bold tracking-wide" style={{fontSize: '24px', lineHeight: '36px', margin: '-1px 0 24px'}}>AUDIT-READY REPORT</div>
            <div className="font-medium max-w-md mx-auto">
              <div style={{fontWeight: '400', color: 'rgba(255, 255, 255, 1)', fontSize: '15px', lineHeight: '15px', margin: '-1px 0 8px'}}>✓ Generated and verified by ENVOCAP AI Platform</div>
              <div style={{fontWeight: '400', margin: '-1px 0 8px', color: 'rgba(255, 255, 255, 1)', fontSize: '15px', lineHeight: '15px'}}>✓ Compliant with CSRD, GRI, and ISSB standards</div>
              <div style={{fontWeight: '400', marginTop: '4px', color: 'rgba(255, 255, 255, 1)', fontSize: '15px', lineHeight: '15px', margin: '-1px 0 32px'}}>✓ Report ID: VDT-1756314874697</div>
            </div>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 font-bold backdrop-blur-sm">⭐ ENTERPRISE GRADE</Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 font-bold backdrop-blur-sm">🔒 SOC2 COMPLIANT</Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Professional Footer */}
        <div className="p-8 sm:p-12 lg:p-16 text-white text-center" style={{backgroundColor: '#2C3E50'}}>
          <div>
            <div className="mb-8">
              <div className="text-3xl font-medium tracking-wide mb-2" style={{letterSpacing: '-0.4px', fontFamily: 'Albert Sans, sans-serif', fontSize: '30px', lineHeight: '40px', color: '#5CCC6D'}}>ENVOCAP</div>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-2xl font-bold text-white" style={{marginBottom: '4px'}}>This is a sample report demonstrating ENVOCAP's capabilities.</p>
              <p className="text-gray-300 leading-relaxed" style={{fontSize: '15px', lineHeight: '15px', margin: '-1px 0 32px'}}>For full functionality, regulatory updates, and continuous compliance monitoring, upgrade to ENVOCAP Pro.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm">
            <div>
              <h4 className="font-bold mb-1" style={{color: '#5CCC6D'}}>🌍 Global Compliance</h4>
              <p className="text-gray-300">CSRD, GRI, ISSB, TCFD, SASB</p>
            </div>
            <div>
              <h4 className="font-bold mb-1" style={{color: '#5CCC6D'}}>🤖 AI-Powered</h4>
              <p className="text-gray-300">OCR, NLP, Data Verification</p>
            </div>
            <div>
              <h4 className="font-bold mb-1" style={{color: '#5CCC6D'}}>🔒 Enterprise Security</h4>
              <p className="text-gray-300">SOC2, GDPR, ISO 27001</p>
            </div>
          </div>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            © 2024 ENVOCAP Platform. All rights reserved. | envocap.com | contact@envocap.com<br/>
            Generated in compliance with Commission Delegated Regulation (EU) 2023/2772 - CSRD
          </p>
        </div>
      </div>
    </div>
  );
}
