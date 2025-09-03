import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Leaf,
  ArrowLeft,
  FileText,
  Camera,
  Table,
  Receipt,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Archive,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SampleBillViewer from "@/components/SampleBillViewer";
import { Logo } from "@/components/Logo";

interface AuditDocument {
  id: string;
  name: string;
  type: 'pdf' | 'csv' | 'excel' | 'image';
  uploadMethod: 'file' | 'camera' | 'api';
  uploadDate: string;
  processedDate: string;
  fileSize: string;
  status: 'processed' | 'processing' | 'error' | 'archived';
  carbonImpact: string;
  dataExtracted: {
    amount?: string;
    category: string;
    period: string;
    co2Impact: number;
  };
  verificationStatus: 'verified' | 'pending' | 'flagged';
  source: string;
  description: string;
}

const auditDocuments: AuditDocument[] = [
  {
    id: '1',
    name: 'November_Energy_Bill_2024.pdf',
    type: 'pdf',
    uploadMethod: 'file',
    uploadDate: '2024-12-01T14:23:00Z',
    processedDate: '2024-12-01T14:24:15Z',
    fileSize: '2.4 MB',
    status: 'processed',
    carbonImpact: '+2.1 tCO₂',
    dataExtracted: {
      amount: '€234.50',
      category: 'Energy Consumption',
      period: 'November 2024',
      co2Impact: 2.1
    },
    verificationStatus: 'verified',
    source: 'Green Energy Solutions Ltd',
    description: 'Monthly electricity bill with energy consumption data'
  },
  {
    id: '2',
    name: 'Fleet_Fuel_Receipts_Q4.csv',
    type: 'csv',
    uploadMethod: 'file',
    uploadDate: '2024-11-28T09:15:00Z',
    processedDate: '2024-11-28T09:16:22Z',
    fileSize: '1.2 MB',
    status: 'processed',
    carbonImpact: '+1.8 tCO₂',
    dataExtracted: {
      amount: '156 receipts',
      category: 'Transportation',
      period: 'Q4 2024',
      co2Impact: 1.8
    },
    verificationStatus: 'verified',
    source: 'Fleet Management System',
    description: 'Quarterly fuel consumption receipts from company vehicles'
  },
  {
    id: '3',
    name: 'Supplier_Sustainability_Data.xlsx',
    type: 'excel',
    uploadMethod: 'file',
    uploadDate: '2024-11-25T16:45:00Z',
    processedDate: '2024-11-25T16:47:10Z',
    fileSize: '850 KB',
    status: 'processed',
    carbonImpact: '+0.9 tCO₂',
    dataExtracted: {
      amount: '23 suppliers',
      category: 'Supply Chain',
      period: 'Annual 2024',
      co2Impact: 0.9
    },
    verificationStatus: 'verified',
    source: 'Manufacturing Partners',
    description: 'Supplier sustainability certifications and emission data'
  },
  {
    id: '4',
    name: 'Camera_Waste_Report_2024-11-22.jpg',
    type: 'image',
    uploadMethod: 'camera',
    uploadDate: '2024-11-22T11:30:00Z',
    processedDate: '2024-11-22T11:33:45Z',
    fileSize: '1.8 MB',
    status: 'processed',
    carbonImpact: '-0.3 tCO₂',
    dataExtracted: {
      amount: '1.2 tonnes',
      category: 'Waste Management',
      period: 'November 2024',
      co2Impact: -0.3
    },
    verificationStatus: 'verified',
    source: 'OCR Extraction',
    description: 'Office waste management report captured via camera OCR'
  },
  {
    id: '5',
    name: 'October_Water_Usage.pdf',
    type: 'pdf',
    uploadMethod: 'file',
    uploadDate: '2024-11-20T08:45:00Z',
    processedDate: '2024-11-20T08:46:30Z',
    fileSize: '1.1 MB',
    status: 'processed',
    carbonImpact: '+0.4 tCO₂',
    dataExtracted: {
      amount: '2,340 L',
      category: 'Water Usage',
      period: 'October 2024',
      co2Impact: 0.4
    },
    verificationStatus: 'verified',
    source: 'Municipal Water Authority',
    description: 'Monthly water consumption and treatment facility data'
  },
  {
    id: '6',
    name: 'Employee_Commute_Survey.csv',
    type: 'csv',
    uploadMethod: 'file',
    uploadDate: '2024-11-15T12:00:00Z',
    processedDate: '2024-11-15T12:02:15Z',
    fileSize: '320 KB',
    status: 'processing',
    carbonImpact: 'Processing...',
    dataExtracted: {
      amount: '127 responses',
      category: 'Employee Transport',
      period: 'Q4 2024',
      co2Impact: 0
    },
    verificationStatus: 'pending',
    source: 'HR Department',
    description: 'Employee commuting survey for Scope 3 emissions calculation'
  }
];

export default function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<AuditDocument | null>(null);

  const filteredDocuments = auditDocuments
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      const matchesType = typeFilter === 'all' || doc.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      } else if (sortBy === 'impact') {
        return Math.abs(b.dataExtracted.co2Impact) - Math.abs(a.dataExtracted.co2Impact);
      }
      return a.name.localeCompare(b.name);
    });

  const getTypeIcon = (type: string, uploadMethod: string) => {
    if (uploadMethod === 'camera') return <Camera className="h-5 w-5 text-purple-600" />;
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-600" />;
      case 'csv': return <Table className="h-5 w-5 text-agri-primary" />;
      case 'excel': return <Table className="h-5 w-5" style={{color: 'rgba(71,170,253,1)'}} />;
      case 'image': return <Camera className="h-5 w-5 text-purple-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-agri-success/10 text-agri-success hover:bg-agri-success/10">✓ Processed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">⏳ Processing</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">❌ Error</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">📁 Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge style={{backgroundColor: 'rgba(71,170,253,0.1)', color: 'rgba(71,170,253,1)'}} className="hover:bg-blue-100">🛡️ Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">⏳ Pending</Badge>;
      case 'flagged':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">🚩 Flagged</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalDocuments = auditDocuments.length;
  const processedDocuments = auditDocuments.filter(doc => doc.status === 'processed').length;
  const totalCarbonImpact = auditDocuments
    .filter(doc => doc.status === 'processed')
    .reduce((sum, doc) => sum + doc.dataExtracted.co2Impact, 0);

  const handleViewDocument = (document: AuditDocument) => {
    setSelectedDocument(document);
    setViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-background via-white to-agri-primary/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <Link to="/">
            <Logo size="md" className="bg-white rounded-[10px] overflow-hidden p-2.5" />
          </Link>
          <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto overflow-y-auto whitespace-nowrap">
            <Link to="/dashboard" className="nav-link text-agri-text-light hover:text-agri-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/audit-trail" className="nav-link active text-agri-primary font-medium">
              Audit Trail
            </Link>
            <Link to="/report" className="nav-link text-agri-text-light hover:text-agri-primary transition-colors">
              Reports
            </Link>
            <Link to="/onboarding">
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-agri-primary/20 transition-all">
                <AvatarImage src="https://cdn.builder.io/api/v1/image/assets%2Fdf2c5e12a17845a7ba13483fac72a40b%2Fa4ccea5dc54f4207833e22e4067769f3?format=webp&width=800" alt="User avatar" />
                <AvatarFallback className="bg-agri-primary text-white font-medium">JD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </nav>
        </div>
      </header>

      {/* Page Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Link to="/upload">
                <Button className="bg-gradient-to-r from-agri-primary to-agri-primary-light hover:from-agri-primary-dark hover:to-agri-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{totalDocuments}</div>
                    <div className="text-sm text-gray-600">Total Documents</div>
                  </div>
                  <div className="p-3 rounded-xl" style={{backgroundColor: 'rgba(71,170,253,0.1)'}}>
                    <FileText className="h-6 w-6" style={{color: 'rgba(71,170,253,1)'}} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-agri-primary">{processedDocuments}</div>
                    <div className="text-sm text-gray-600">Processed Successfully</div>
                  </div>
                  <div className="p-3 bg-agri-primary/10 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-agri-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-agri-primary">{totalCarbonImpact.toFixed(1)} tCO₂</div>
                    <div className="text-sm text-gray-600">Total Carbon Impact</div>
                  </div>
                  <div className="p-3 bg-agri-primary/10 rounded-xl">
                    <BarChart3 className="h-6 w-6 text-agri-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="shadow-lg border-0 mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF Documents</SelectItem>
                    <SelectItem value="csv">CSV Files</SelectItem>
                    <SelectItem value="excel">Excel Files</SelectItem>
                    <SelectItem value="image">Camera Captures</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Upload Date</SelectItem>
                    <SelectItem value="impact">Carbon Impact</SelectItem>
                    <SelectItem value="name">File Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-agri-primary" />
                <span>Audit Trail History ({filteredDocuments.length} documents)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-agri-primary/20"
                  >
                    <div className="grid lg:grid-cols-4 gap-4">
                      {/* Document Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getTypeIcon(doc.type, doc.uploadMethod)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{doc.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(doc.uploadDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(doc.uploadDate).toLocaleTimeString()}
                              </span>
                              <span>{doc.fileSize}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Data Extracted */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Extracted Data</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-medium">{doc.dataExtracted.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium">{doc.dataExtracted.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Period:</span>
                            <span className="font-medium">{doc.dataExtracted.period}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">CO₂ Impact:</span>
                            <span className={`font-bold ${
                              doc.dataExtracted.co2Impact > 0 ? 'text-agri-primary' :
                              doc.dataExtracted.co2Impact < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {doc.carbonImpact}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            {getStatusBadge(doc.status)}
                            {getVerificationBadge(doc.verificationStatus)}
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            <div>Source: {doc.source}</div>
                            <div>Method: {doc.uploadMethod === 'camera' ? 'Camera OCR' : 'File Upload'}</div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDocument(doc)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sample Bill Viewer */}
      <SampleBillViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        documentName={selectedDocument?.name || ''}
        documentType={selectedDocument?.dataExtracted.category || ''}
      />
    </div>
  );
}
