"use client";

import React, { useState } from 'react';
import { useAccessibilityTesting, useAccessibilityValidator } from '@/hooks/use-accessibility-testing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, Play, Smartphone, Keyboard, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilityTestPanelProps {
  /** Target container to test (defaults to document.body) */
  targetContainer?: HTMLElement;
  /** Show detailed test results */
  showDetails?: boolean;
  /** Auto-run tests on mount */
  autoTest?: boolean;
}

export function AccessibilityTestPanel({ 
  targetContainer, 
  showDetails = true, 
  autoTest = false 
}: AccessibilityTestPanelProps) {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  
  const {
    results,
    runTests,
    screenReader,
    keyboard,
    mobile,
    containerRef,
    getSummary,
    isLoading
  } = useAccessibilityTesting({ 
    autoTest,
    logResults: true 
  });
  
  const screenReaderValidator = useAccessibilityValidator('screen-reader');
  const keyboardValidator = useAccessibilityValidator('keyboard');
  const mobileValidator = useAccessibilityValidator('mobile');
  
  const summary = getSummary();
  
  const handleRunTest = async (testType: string) => {
    setActiveTest(testType);
    
    try {
      const container = targetContainer || containerRef.current || document.body;
      
      switch (testType) {
        case 'full':
          await runTests(container);
          break;
        case 'screen-reader':
          await screenReaderValidator.validate(container);
          break;
        case 'keyboard':
          await keyboardValidator.validate(container);
          break;
        case 'mobile':
          await mobileValidator.validate(container);
          break;
      }
    } finally {
      setActiveTest(null);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4" />;
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'needs-improvement': return <AlertTriangle className="h-4 w-4" />;
      case 'poor': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Accessibility Testing Panel
        </CardTitle>
        <CardDescription>
          Test and validate accessibility features including screen reader compatibility, 
          keyboard navigation, and mobile accessibility.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className={cn('border-2', getStatusColor(summary.status))}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Overall Score</p>
                  <p className="text-2xl font-bold">{summary.score}%</p>
                </div>
                {getStatusIcon(summary.status)}
              </div>
              <Badge variant="outline" className="mt-2 capitalize">
                {summary.status.replace('-', ' ')}
              </Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Issues</p>
                  <p className="text-2xl font-bold">{summary.totalIssues}</p>
                </div>
                <XCircle className="h-4 w-4 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Warnings</p>
                  <p className="text-2xl font-bold">{summary.totalWarnings}</p>
                </div>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Passed</p>
                  <p className="text-2xl font-bold">{summary.totalPassed}</p>
                </div>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Test Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button
            onClick={() => handleRunTest('full')}
            disabled={isLoading || activeTest === 'full'}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {activeTest === 'full' ? 'Running...' : 'Full Test'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleRunTest('screen-reader')}
            disabled={screenReaderValidator.isValidating || activeTest === 'screen-reader'}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {activeTest === 'screen-reader' ? 'Testing...' : 'Screen Reader'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleRunTest('keyboard')}
            disabled={keyboardValidator.isValidating || activeTest === 'keyboard'}
            className="flex items-center gap-2"
          >
            <Keyboard className="h-4 w-4" />
            {activeTest === 'keyboard' ? 'Testing...' : 'Keyboard Nav'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleRunTest('mobile')}
            disabled={mobileValidator.isValidating || activeTest === 'mobile'}
            className="flex items-center gap-2"
          >
            <Smartphone className="h-4 w-4" />
            {activeTest === 'mobile' ? 'Testing...' : 'Mobile A11y'}
          </Button>
        </div>
        
        {/* Test Results */}
        {showDetails && (results.issues.length > 0 || results.warnings.length > 0 || results.passed.length > 0) && (
          <Tabs defaultValue="issues" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="issues" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Issues ({results.issues.length})
              </TabsTrigger>
              <TabsTrigger value="warnings" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Warnings ({results.warnings.length})
              </TabsTrigger>
              <TabsTrigger value="passed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Passed ({results.passed.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="issues" className="space-y-2">
              {results.issues.length === 0 ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    No accessibility issues found! Great job!
                  </AlertDescription>
                </Alert>
              ) : (
                results.issues.map((issue, index) => (
                  <Alert key={index} variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{issue}</AlertDescription>
                  </Alert>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="warnings" className="space-y-2">
              {results.warnings.length === 0 ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    No warnings found!
                  </AlertDescription>
                </Alert>
              ) : (
                results.warnings.map((warning, index) => (
                  <Alert key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{warning}</AlertDescription>
                  </Alert>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="passed" className="space-y-2">
              {results.passed.length === 0 ? (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    No tests have passed yet. Run some tests to see results.
                  </AlertDescription>
                </Alert>
              ) : (
                results.passed.map((passed, index) => (
                  <Alert key={index} className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{passed}</AlertDescription>
                  </Alert>
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
        
        {/* Last Tested Info */}
        {summary.lastTested && (
          <div className="text-sm text-gray-500 text-center">
            Last tested: {summary.lastTested.toLocaleString()}
          </div>
        )}
        
        {/* Hidden container ref for testing */}
        <div ref={containerRef} className="sr-only" aria-hidden="true" />
      </CardContent>
    </Card>
  );
}

/**
 * Lightweight accessibility status indicator
 */
export function AccessibilityStatus({ className }: { className?: string }) {
  const { getSummary, runTests, isLoading } = useAccessibilityTesting({ autoTest: true });
  const summary = getSummary();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => runTests()}
      disabled={isLoading}
      className={cn('flex items-center gap-2', className)}
      aria-label={`Accessibility score: ${summary.score}%. Click to run tests.`}
    >
      {summary.status === 'excellent' && <CheckCircle className="h-4 w-4 text-green-500" />}
      {summary.status === 'good' && <CheckCircle className="h-4 w-4 text-blue-500" />}
      {summary.status === 'needs-improvement' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
      {summary.status === 'poor' && <XCircle className="h-4 w-4 text-red-500" />}
      <span className="text-sm font-medium">{summary.score}%</span>
      {isLoading && <span className="text-xs text-gray-500">Testing...</span>}
    </Button>
  );
}