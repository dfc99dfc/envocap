import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Download, FileText, Zap, Calendar, Building, Euro } from "lucide-react";
import { useState } from "react";

interface SampleBillViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  documentType: string;
}

export default function SampleBillViewer({ isOpen, onClose, documentName, documentType }: SampleBillViewerProps) {
  if (!isOpen) return null;

  const getSampleBillContent = () => {
    switch (documentType) {
      case 'Energy Invoice':
        return (
          <div className="space-y-6">
            {/* Energy Bill Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Green Energy Solutions Ltd</h3>
                  <p className="text-blue-100">Sustainable Energy Provider</p>
                  <p className="text-sm text-blue-200 mt-2">123 Clean Energy St, Amsterdam, Netherlands</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-200">Invoice #</div>
                  <div className="text-xl font-bold">GES-2024-11-001</div>
                </div>
              </div>
            </div>

            {/* Bill Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span>Bill To</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-semibold">Your Company Ltd</div>
                    <div className="text-sm text-gray-600">456 Business Park</div>
                    <div className="text-sm text-gray-600">Rotterdam, Netherlands</div>
                    <div className="text-sm text-gray-600">VAT: NL123456789B01</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>Billing Period</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div><span className="text-gray-600">Period:</span> November 1-30, 2024</div>
                    <div><span className="text-gray-600">Due Date:</span> December 15, 2024</div>
                    <div><span className="text-gray-600">Meter Reading:</span> 12,450 kWh</div>
                    <Badge className="bg-green-100 text-green-800">100% Renewable</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Energy Consumption Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>Energy Consumption Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200 font-semibold">
                    <div>Description</div>
                    <div>Usage (kWh)</div>
                    <div>Rate (€/kWh)</div>
                    <div>Amount (€)</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 py-2">
                    <div>Peak Hours (07:00-23:00)</div>
                    <div>8,920</div>
                    <div>0.285</div>
                    <div>€254.22</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 py-2">
                    <div>Off-Peak Hours (23:00-07:00)</div>
                    <div>3,530</div>
                    <div>0.165</div>
                    <div>€582.45</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 py-3 border-t border-gray-300 font-bold">
                    <div>Total Consumption</div>
                    <div>12,450 kWh</div>
                    <div>-</div>
                    <div>€836.67</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carbon Impact */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                  <span>Environmental Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-700">2.1 tCO₂</div>
                    <div className="text-sm text-green-600">Carbon Footprint</div>
                    <div className="text-xs text-gray-500">0.168 kg CO₂/kWh</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">100%</div>
                    <div className="text-sm text-green-600">Renewable Energy</div>
                    <div className="text-xs text-gray-500">Wind & Solar</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">-65%</div>
                    <div className="text-sm text-green-600">vs Grid Average</div>
                    <div className="text-xs text-gray-500">0.485 kg CO₂/kWh</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Amount */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Total Amount Due</div>
                    <div className="text-sm text-gray-600">Including 21% VAT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-700">€1,012.47</div>
                    <div className="text-sm text-blue-600">Due: Dec 15, 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'Transportation':
        return (
          <div className="space-y-6">
            {/* Fuel Receipt Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Shell Station Amsterdam</h3>
                  <p className="text-orange-100">Fuel & Services</p>
                  <p className="text-sm text-orange-200 mt-2">A10 Highway Exit 3, Amsterdam</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-orange-200">Receipt #</div>
                  <div className="text-xl font-bold">SH-24-11-28-1543</div>
                </div>
              </div>
            </div>

            {/* Fuel Purchase Details */}
            <Card>
              <CardHeader>
                <CardTitle>Fuel Purchase Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 font-semibold">
                    <div>Fuel Type</div>
                    <div>Quantity</div>
                    <div>Amount</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <div>Diesel (B7) - Pump 5</div>
                    <div>65.4 Liters</div>
                    <div>€92.18</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2 text-sm text-gray-600">
                    <div>Price per liter: €1.41</div>
                    <div>Vehicle: NL-123-AB</div>
                    <div>Odometer: 87,234 km</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carbon Impact */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <div className="w-5 h-5 bg-red-600 rounded-full"></div>
                  <span>Environmental Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-700">+1.8 tCO₂</div>
                    <div className="text-sm text-green-600">Carbon Emissions</div>
                    <div className="text-xs text-gray-500">2.68 kg CO₂/liter diesel</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-700">175 km</div>
                    <div className="text-sm text-orange-600">Est. Distance</div>
                    <div className="text-xs text-gray-500">Based on avg consumption</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sample Document</h3>
            <p className="text-gray-600">This is a preview of the uploaded document type: {documentType}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{documentName}</h2>
            <p className="text-sm text-gray-600">Document Preview - {documentType}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {getSampleBillContent()}
        </div>
      </div>
    </div>
  );
}
