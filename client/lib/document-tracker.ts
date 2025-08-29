// Document metadata tracking system for audit trail and compliance

export interface DocumentMetadata {
  id: string;
  fileName: string;
  originalName: string;
  fileType: 'pdf' | 'csv' | 'excel' | 'image' | 'other';
  fileSize: number;
  uploadMethod: 'file' | 'camera' | 'api' | 'manual';
  uploadTimestamp: Date;
  processingTimestamp?: Date;
  completionTimestamp?: Date;
  status: 'pending' | 'processing' | 'completed' | 'error' | 'archived';
  
  // Data extraction results
  extractedData: {
    amount?: string;
    currency?: string;
    category: string;
    subcategory?: string;
    period: string;
    co2Impact: number;
    scope: '1' | '2' | '3' | 'mixed';
    confidence: number; // 0-100
    rawText?: string;
  };
  
  // Source information
  source: {
    provider: string;
    documentType: string;
    issueDate?: Date;
    reference?: string;
  };
  
  // Compliance mapping
  compliance: {
    csrdCategories: string[];
    griStandards: string[];
    issbTopics: string[];
    euTaxonomyAligned: boolean;
  };
  
  // Verification and audit
  verification: {
    status: 'verified' | 'pending' | 'flagged' | 'rejected';
    verifiedBy?: string;
    verificationDate?: Date;
    notes?: string;
    checksumHash?: string;
  };
  
  // Processing metadata
  processing: {
    ocrUsed: boolean;
    aiModelVersion?: string;
    processingDuration?: number; // milliseconds
    errors?: string[];
    warnings?: string[];
  };
}

export interface AuditTrailEntry {
  id: string;
  documentId: string;
  action: 'upload' | 'process' | 'verify' | 'approve' | 'reject' | 'archive' | 'export';
  timestamp: Date;
  userId?: string;
  details: string;
  previousValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
}

class DocumentTracker {
  private documents: Map<string, DocumentMetadata> = new Map();
  private auditTrail: AuditTrailEntry[] = [];

  // Generate unique document ID
  generateDocumentId(): string {
    return `DOC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track new document upload
  trackUpload(file: File, uploadMethod: DocumentMetadata['uploadMethod']): DocumentMetadata {
    const documentId = this.generateDocumentId();
    const metadata: DocumentMetadata = {
      id: documentId,
      fileName: `${documentId}_${file.name}`,
      originalName: file.name,
      fileType: this.getFileType(file.name),
      fileSize: file.size,
      uploadMethod,
      uploadTimestamp: new Date(),
      status: 'pending',
      
      extractedData: {
        category: 'Unknown',
        period: 'TBD',
        co2Impact: 0,
        scope: '1',
        confidence: 0
      },
      
      source: {
        provider: 'Unknown',
        documentType: 'Invoice/Bill'
      },
      
      compliance: {
        csrdCategories: [],
        griStandards: [],
        issbTopics: [],
        euTaxonomyAligned: false
      },
      
      verification: {
        status: 'pending'
      },
      
      processing: {
        ocrUsed: false
      }
    };

    this.documents.set(documentId, metadata);
    this.addAuditEntry(documentId, 'upload', `Document uploaded: ${file.name}`);
    
    return metadata;
  }

  // Track camera capture
  trackCameraCapture(fileName: string): DocumentMetadata {
    const documentId = this.generateDocumentId();
    const metadata: DocumentMetadata = {
      id: documentId,
      fileName: `${documentId}_${fileName}`,
      originalName: fileName,
      fileType: 'image',
      fileSize: 0, // Will be updated after capture
      uploadMethod: 'camera',
      uploadTimestamp: new Date(),
      status: 'pending',
      
      extractedData: {
        category: 'Camera Capture',
        period: 'TBD',
        co2Impact: 0,
        scope: '1',
        confidence: 0
      },
      
      source: {
        provider: 'Camera OCR',
        documentType: 'Scanned Document'
      },
      
      compliance: {
        csrdCategories: [],
        griStandards: [],
        issbTopics: [],
        euTaxonomyAligned: false
      },
      
      verification: {
        status: 'pending'
      },
      
      processing: {
        ocrUsed: true
      }
    };

    this.documents.set(documentId, metadata);
    this.addAuditEntry(documentId, 'upload', `Document captured via camera: ${fileName}`);
    
    return metadata;
  }

  // Update document processing status
  updateProcessingStatus(documentId: string, status: DocumentMetadata['status'], extractedData?: Partial<DocumentMetadata['extractedData']>) {
    const doc = this.documents.get(documentId);
    if (!doc) return;

    const previousStatus = doc.status;
    doc.status = status;
    
    if (status === 'processing') {
      doc.processingTimestamp = new Date();
    } else if (status === 'completed') {
      doc.completionTimestamp = new Date();
    }

    if (extractedData) {
      doc.extractedData = { ...doc.extractedData, ...extractedData };
    }

    this.addAuditEntry(
      documentId, 
      'process', 
      `Status changed from ${previousStatus} to ${status}`,
      previousStatus,
      status
    );
  }

  // Update verification status
  updateVerificationStatus(documentId: string, status: DocumentMetadata['verification']['status'], notes?: string) {
    const doc = this.documents.get(documentId);
    if (!doc) return;

    const previousStatus = doc.verification.status;
    doc.verification.status = status;
    doc.verification.verificationDate = new Date();
    if (notes) doc.verification.notes = notes;

    this.addAuditEntry(
      documentId,
      'verify',
      `Verification status changed from ${previousStatus} to ${status}`,
      previousStatus,
      status
    );
  }

  // Map data to compliance frameworks
  mapToCompliance(documentId: string, category: string, amount?: string) {
    const doc = this.documents.get(documentId);
    if (!doc) return;

    // Auto-map based on category
    const complianceMapping = this.getComplianceMapping(category);
    doc.compliance = complianceMapping;
    doc.extractedData.category = category;
    if (amount) doc.extractedData.amount = amount;

    this.addAuditEntry(documentId, 'process', `Mapped to compliance frameworks: ${category}`);
  }

  // Get compliance mapping based on category
  private getComplianceMapping(category: string): DocumentMetadata['compliance'] {
    const mappings: Record<string, DocumentMetadata['compliance']> = {
      'Energy Consumption': {
        csrdCategories: ['E1-1', 'E1-6'],
        griStandards: ['GRI 302-1', 'GRI 302-3'],
        issbTopics: ['S2 Climate-related Disclosures'],
        euTaxonomyAligned: true
      },
      'Transportation': {
        csrdCategories: ['E1-6'],
        griStandards: ['GRI 305-1', 'GRI 305-2'],
        issbTopics: ['S2 Climate-related Disclosures'],
        euTaxonomyAligned: true
      },
      'Supply Chain': {
        csrdCategories: ['E1-6', 'S2-1'],
        griStandards: ['GRI 305-3', 'GRI 308-1'],
        issbTopics: ['S2 Climate-related Disclosures'],
        euTaxonomyAligned: false
      },
      'Water Usage': {
        csrdCategories: ['E3-1', 'E3-4'],
        griStandards: ['GRI 303-1', 'GRI 303-3'],
        issbTopics: ['S2 Climate-related Disclosures'],
        euTaxonomyAligned: true
      },
      'Waste Management': {
        csrdCategories: ['E5-1', 'E5-5'],
        griStandards: ['GRI 306-1', 'GRI 306-2'],
        issbTopics: ['S2 Climate-related Disclosures'],
        euTaxonomyAligned: true
      }
    };

    return mappings[category] || {
      csrdCategories: [],
      griStandards: [],
      issbTopics: [],
      euTaxonomyAligned: false
    };
  }

  // Add audit trail entry
  private addAuditEntry(documentId: string, action: AuditTrailEntry['action'], details: string, previousValue?: any, newValue?: any) {
    const entry: AuditTrailEntry = {
      id: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      documentId,
      action,
      timestamp: new Date(),
      details,
      previousValue,
      newValue
    };

    this.auditTrail.push(entry);
  }

  // Get file type from extension
  private getFileType(fileName: string): DocumentMetadata['fileType'] {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'pdf';
      case 'csv': return 'csv';
      case 'xlsx':
      case 'xls': return 'excel';
      case 'jpg':
      case 'jpeg':
      case 'png': return 'image';
      default: return 'other';
    }
  }

  // Get all documents
  getAllDocuments(): DocumentMetadata[] {
    return Array.from(this.documents.values());
  }

  // Get document by ID
  getDocument(documentId: string): DocumentMetadata | undefined {
    return this.documents.get(documentId);
  }

  // Get audit trail for document
  getDocumentAuditTrail(documentId: string): AuditTrailEntry[] {
    return this.auditTrail.filter(entry => entry.documentId === documentId);
  }

  // Get full audit trail
  getFullAuditTrail(): AuditTrailEntry[] {
    return [...this.auditTrail].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Calculate aggregate metrics
  getAggregateMetrics() {
    const docs = this.getAllDocuments();
    return {
      totalDocuments: docs.length,
      processedDocuments: docs.filter(d => d.status === 'completed').length,
      totalCarbonImpact: docs
        .filter(d => d.status === 'completed')
        .reduce((sum, d) => sum + d.extractedData.co2Impact, 0),
      verifiedDocuments: docs.filter(d => d.verification.status === 'verified').length,
      averageProcessingTime: this.calculateAverageProcessingTime(docs),
      complianceCoverage: this.calculateComplianceCoverage(docs)
    };
  }

  private calculateAverageProcessingTime(docs: DocumentMetadata[]): number {
    const processedDocs = docs.filter(d => d.processingTimestamp && d.completionTimestamp);
    if (processedDocs.length === 0) return 0;

    const totalTime = processedDocs.reduce((sum, doc) => {
      if (doc.processingTimestamp && doc.completionTimestamp) {
        return sum + (doc.completionTimestamp.getTime() - doc.processingTimestamp.getTime());
      }
      return sum;
    }, 0);

    return totalTime / processedDocs.length;
  }

  private calculateComplianceCoverage(docs: DocumentMetadata[]): {csrd: number, gri: number, issb: number} {
    const completedDocs = docs.filter(d => d.status === 'completed');
    if (completedDocs.length === 0) return {csrd: 0, gri: 0, issb: 0};

    const allCsrd = new Set<string>();
    const allGri = new Set<string>();
    const allIssb = new Set<string>();

    completedDocs.forEach(doc => {
      doc.compliance.csrdCategories.forEach(cat => allCsrd.add(cat));
      doc.compliance.griStandards.forEach(std => allGri.add(std));
      doc.compliance.issbTopics.forEach(topic => allIssb.add(topic));
    });

    // These are approximate totals for the frameworks
    const totalCsrd = 19; // CSRD has ~19 main disclosure requirements
    const totalGri = 15; // Using subset of relevant GRI standards
    const totalIssb = 8;  // ISSB main topic areas

    return {
      csrd: Math.min(100, (allCsrd.size / totalCsrd) * 100),
      gri: Math.min(100, (allGri.size / totalGri) * 100),
      issb: Math.min(100, (allIssb.size / totalIssb) * 100)
    };
  }

  // Export audit trail for compliance
  exportAuditTrail(): string {
    const auditData = {
      exportDate: new Date().toISOString(),
      documents: this.getAllDocuments(),
      auditTrail: this.getFullAuditTrail(),
      metrics: this.getAggregateMetrics()
    };

    return JSON.stringify(auditData, null, 2);
  }
}

// Singleton instance
export const documentTracker = new DocumentTracker();

// Export for use in components
export default documentTracker;
