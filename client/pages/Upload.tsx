import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, ArrowRight, Upload as UploadIcon, FileText, Table, Receipt, CheckCircle, AlertCircle, Info, Camera, Scan, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useRef } from "react";
import { Logo } from "@/components/Logo";

interface MockFile {
  id: string;
  name: string;
  type: 'pdf' | 'csv' | 'excel';
  size: string;
  status: 'pending' | 'uploaded' | 'processing';
  description: string;
  icon: React.ReactNode;
}

const mockFiles: MockFile[] = [
  {
    id: '1',
    name: 'EnergyBill.pdf',
    type: 'pdf',
    size: '2.4 MB',
    status: 'pending',
    description: 'Monthly electricity invoice from utility provider',
    icon: <FileText className="h-5 w-5" style={{color: 'rgba(71,170,253,1)'}} />
  },
  {
    id: '2',
    name: 'SupplierData.csv',
    type: 'csv',
    size: '1.2 MB',
    status: 'pending',
    description: 'Supplier sustainability data and certifications',
    icon: <Table className="h-5 w-5 text-agri-primary" />
  },
  {
    id: '3',
    name: 'FuelReceipt.pdf',
    type: 'pdf',
    size: '850 KB',
    status: 'pending',
    description: 'Fleet fuel consumption receipts',
    icon: <Receipt className="h-5 w-5 text-orange-600" />
  }
];

export default function Upload() {
  const [files, setFiles] = useState<MockFile[]>(mockFiles);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    simulateUpload();
  }, []);

  const handleClick = () => {
    simulateUpload();
  };

  const simulateUpload = () => {
    if (uploadStarted) return;

    setUploadStarted(true);

    // Simulate sequential file uploads
    files.forEach((file, index) => {
      setTimeout(() => {
        setFiles(prev => prev.map(f =>
          f.id === file.id ? { ...f, status: 'uploaded' } : f
        ));
      }, (index + 1) * 1000);
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      // Fallback for demo - simulate camera
      setCameraActive(true);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraActive(false);
    setCapturedImage(null);
    setOcrResult(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);

        // Simulate OCR processing
        simulateOCR();
      }
    } else {
      // Demo fallback - use a mock image
      setCapturedImage('/api/placeholder/640/480');
      simulateOCR();
    }
  };

  const simulateOCR = () => {
    setOcrProcessing(true);

    // Simulate OCR processing time
    setTimeout(() => {
      setOcrProcessing(false);
      setOcrResult(`
INVOICE #INV-2024-1205
Date: December 5, 2024
Green Energy Solutions Ltd
Energy Bill - November 2024

Total Amount: €234.50
kWh Used: 1,247 kWh
CO₂ Emissions: +2.1 tCO₂
      `);

      // Add extracted data as uploaded file
      const newFile: MockFile = {
        id: Date.now().toString(),
        name: 'Camera_Invoice_' + new Date().toISOString().slice(0, 10) + '.jpg',
        type: 'pdf',
        size: '1.8 MB',
        status: 'uploaded',
        description: 'Invoice captured via camera and processed with OCR',
        icon: <Camera className="h-5 w-5 text-purple-600" />
      };

      setFiles(prev => [newFile, ...prev]);
    }, 3000);
  };

  const allFilesUploaded = files.every(file => file.status === 'uploaded');
  const uploadedCount = files.filter(file => file.status === 'uploaded').length;

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
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 text-center mt-2" style={{
                  ...(i === 1 ? {fontWeight: 'medium', color: 'rgba(74, 74, 74, 1)'} : {})
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
              <div className="h-full bg-agri-primary rounded-full" style={{width: '0%'}} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 px-4" style={{padding: '20px 0 12px'}}>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Upload Your Sustainability Data
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your invoices, bills, and operational data. Our AI will extract relevant sustainability metrics and calculate your carbon footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Upload Area */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-agri-primary/10 rounded-lg">
                      <UploadIcon className="h-5 w-5 text-agri-primary" />
                    </div>
                    <span className="text-xl font-semibold">Upload Your Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
                      <TabsTrigger value="upload" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                        <UploadIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">File Upload</span>
                        <span className="sm:hidden">Upload</span>
                      </TabsTrigger>
                      <TabsTrigger value="camera" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                        <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Camera Scan</span>
                        <span className="sm:hidden">Camera</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload">
                      <div
                        className={`border-2 border-dashed rounded-xl p-6 sm:p-8 lg:p-12 text-center transition-all cursor-pointer ${
                          isDragOver
                            ? 'border-agri-primary bg-agri-primary/5 scale-102'
                            : uploadStarted
                            ? 'border-gray-300 bg-gray-50'
                            : 'border-gray-300 hover:border-agri-primary/40 hover:bg-agri-primary/5 hover:scale-102'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={!uploadStarted ? handleClick : undefined}
                      >
                        <div className="space-y-4">
                          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto transition-all ${
                            uploadStarted ? 'bg-agri-primary/10 scale-110' : 'bg-gray-100'
                          }`}>
                            <UploadIcon className={`h-8 w-8 sm:h-10 sm:w-10 ${
                              uploadStarted ? 'text-agri-primary' : 'text-gray-400'
                            }`} />
                          </div>

                          {!uploadStarted ? (
                            <>
                              <div>
                                <p className="text-lg sm:text-xl font-semibold text-gray-900">
                                  Drop files here or click to upload
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                                  Supports PDF, CSV, Excel files up to 10MB
                                </p>
                              </div>

                              <Button className="bg-gradient-to-r from-agri-primary to-agri-primary-light hover:from-agri-primary-dark hover:to-agri-primary text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-xl shadow-lg">
                                Choose Files
                              </Button>
                            </>
                          ) : (
                            <div>
                              <p className="text-lg sm:text-xl font-semibold text-agri-primary">
                                {allFilesUploaded ? 'All files uploaded!' : `Uploading... ${uploadedCount}/${files.length}`}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                                {allFilesUploaded ? 'Ready to process your data' : 'Please wait while we upload your files'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="camera">
                      <div className="space-y-4">
                        {!cameraActive ? (
                          <div className="border-2 border-dashed border-purple-300 rounded-xl p-12 text-center bg-gradient-to-br from-purple-50 to-white">
                            <div className="space-y-4">
                              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                                <Camera className="h-10 w-10 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-xl font-semibold text-gray-900">
                                  Scan Invoice with Camera
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                  Use your camera to capture and process invoices with OCR
                                </p>
                              </div>
                              <Button
                                onClick={startCamera}
                                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg"
                              >
                                <Camera className="h-5 w-5 mr-2" />
                                Start Camera
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {/* Camera View */}
                            <div className="relative bg-black rounded-xl overflow-hidden">
                              <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-64 object-cover"
                              />
                              <canvas ref={canvasRef} className="hidden" />

                              {capturedImage && (
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                                  <img
                                    src={capturedImage}
                                    alt="Captured invoice"
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                  />
                                </div>
                              )}

                              {/* Camera Controls */}
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                                {!capturedImage ? (
                                  <Button
                                    onClick={capturePhoto}
                                    className="bg-white text-gray-900 hover:bg-gray-100 rounded-full w-16 h-16 p-0"
                                  >
                                    <Camera className="h-8 w-8" />
                                  </Button>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      onClick={() => setCapturedImage(null)}
                                      variant="outline"
                                      className="bg-white/90 text-gray-900 hover:bg-white rounded-xl"
                                    >
                                      Retake
                                    </Button>
                                  </div>
                                )}

                                <Button
                                  onClick={stopCamera}
                                  variant="outline"
                                  className="bg-red-500/90 text-white hover:bg-red-600 rounded-xl"
                                >
                                  <X className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>

                            {/* OCR Processing */}
                            {ocrProcessing && (
                              <Card className="border-purple-200 bg-purple-50">
                                <CardContent className="p-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                    <div>
                                      <h3 className="font-medium text-purple-900">Processing with OCR...</h3>
                                      <p className="text-sm text-purple-700">Extracting text and data from your invoice</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            {/* OCR Result */}
                            {ocrResult && (
                              <Card className="border-green-200 bg-green-50">
                                <CardHeader>
                                  <CardTitle className="flex items-center space-x-2" style={{color: 'rgba(65, 117, 5, 1)'}}>
                                    <Scan className="h-5 w-5" />
                                    <span>OCR Results</span>
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <pre className="text-sm whitespace-pre-wrap bg-white p-4 rounded-lg border" style={{color: 'rgba(65, 117, 5, 0.8)'}}>
                                    {ocrResult}
                                  </pre>
                                  <div className="mt-4 flex items-center justify-between">
                                    <Badge style={{backgroundColor: 'rgba(184, 233, 134, 0.2)', color: 'rgba(65, 117, 5, 1)'}}>
                                      ✓ Data extracted successfully
                                    </Badge>
                                    <Button
                                      onClick={() => {
                                        stopCamera();
                                        setOcrResult(null);
                                      }}
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      Add to Files
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card style={{borderColor: 'rgba(71,170,253,0.2)', backgroundColor: 'rgba(71,170,253,0.05)'}}>
                <CardContent className="p-3">
                  <div className="flex items-start justify-start space-x-3">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: 'rgba(71,170,253,1)'}} />
                    <div>
                      <h3 className="font-medium mb-2" style={{color: 'rgba(71,170,253,0.9)'}}>What files should I upload?</h3>
                      <ul className="text-sm space-y-1" style={{color: 'rgba(71,170,253,0.8)'}}>
                        <li>• Energy bills and utility invoices</li>
                        <li>• Fuel receipts and transportation data</li>
                        <li>• Supplier invoices with sustainability info</li>
                        <li>• Employee commuting surveys (CSV/Excel)</li>
                        <li>• Waste management reports</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* File List */}
            <div className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Sample Files to Upload</span>
                    {uploadStarted && (
                      <Badge variant="secondary" className="bg-agri-primary/10 text-agri-primary">
                        {uploadedCount}/{files.length} uploaded
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className={`p-4 rounded-lg border transition-all ${
                          file.status === 'uploaded'
                            ? 'border-green-200 bg-green-50'
                            : file.status === 'processing'
                            ? ''
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        style={file.status === 'processing' ? {borderColor: 'rgba(71,170,253,0.2)', backgroundColor: 'rgba(71,170,253,0.05)'} : {}}
                      >
                        <div className="flex items-start space-x-3">
                          {file.icon}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{file.size}</span>
                                {file.status === 'uploaded' && (
                                  <CheckCircle className="h-5 w-5 text-agri-success" />
                                )}
                                {file.status === 'processing' && (
                                  <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{borderColor: 'rgba(71,170,253,1) transparent transparent transparent'}} />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {file.description}
                            </p>
                            {file.status === 'uploaded' && (
                              <div className="flex items-center space-x-1 mt-2">
                                <Badge variant="secondary" className="text-xs" style={{backgroundColor: 'rgba(184, 233, 134, 0.2)', color: 'rgba(65, 117, 5, 1)'}}>
                                  ✓ Uploaded
                                </Badge>
                                <Badge variant="secondary" className="text-xs" style={{backgroundColor: 'rgba(71,170,253,0.1)', color: 'rgba(71,170,253,1)'}}>
                                  Data extracted
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card style={{borderColor: 'rgba(184, 233, 134, 0.4)', backgroundColor: 'rgba(184, 233, 134, 0.1)'}}>
                <CardContent className="p-3">
                  <div className="flex items-start justify-start space-x-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: 'rgba(65, 117, 5, 1)'}} />
                    <div>
                      <h3 className="font-medium mb-2" style={{color: 'rgba(65, 117, 5, 1)'}}>Your data is secure</h3>
                      <p className="text-sm" style={{color: 'rgba(65, 117, 5, 0.8)'}}>
                        All files are encrypted during upload and processed in compliance with GDPR.
                        Your data is securely stored and used to generate comprehensive sustainability reports.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center mt-12 pt-8">
            <div className="flex items-center space-x-4">
              {!allFilesUploaded && uploadStarted && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-4 h-4 border-2 border-agri-primary border-t-transparent rounded-full animate-spin" />
                  <span>Uploading files...</span>
                </div>
              )}
              
              <Link to="/processing">
                <Button
                  disabled={!allFilesUploaded}
                  className="bg-gradient-to-r from-agri-primary to-agri-primary-light hover:from-agri-primary-dark hover:to-agri-primary text-white disabled:opacity-50"
                >
                  Generate Report
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
