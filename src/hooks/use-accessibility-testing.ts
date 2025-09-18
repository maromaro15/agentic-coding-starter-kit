"use client";

import { useEffect, useRef, useState } from 'react';
import { 
  runAccessibilityTests, 
  screenReaderUtils, 
  keyboardUtils, 
  mobileA11yUtils,
  logAccessibilityResults 
} from '@/lib/accessibility-utils';

interface AccessibilityTestResults {
  issues: string[];
  warnings: string[];
  passed: string[];
  isLoading: boolean;
  lastTested: Date | null;
}

interface UseAccessibilityTestingOptions {
  /** Auto-run tests when component mounts */
  autoTest?: boolean;
  /** Auto-run tests when dependencies change */
  dependencies?: any[];
  /** Log results to console in development */
  logResults?: boolean;
  /** Test interval in milliseconds (0 to disable) */
  testInterval?: number;
}

/**
 * Hook for testing accessibility features of components
 * Provides utilities for screen reader, keyboard, and mobile accessibility testing
 */
export function useAccessibilityTesting(options: UseAccessibilityTestingOptions = {}) {
  const {
    autoTest = false,
    dependencies = [],
    logResults = true,
    testInterval = 0
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const [results, setResults] = useState<AccessibilityTestResults>({
    issues: [],
    warnings: [],
    passed: [],
    isLoading: false,
    lastTested: null
  });

  // Run accessibility tests
  const runTests = async (container?: HTMLElement) => {
    setResults(prev => ({ ...prev, isLoading: true }));
    
    try {
      const testContainer = container || containerRef.current || document.body;
      const testResults = runAccessibilityTests(testContainer);
      
      setResults({
        ...testResults,
        isLoading: false,
        lastTested: new Date()
      });
      
      if (logResults && process.env.NODE_ENV === 'development') {
        logAccessibilityResults(testContainer);
      }
      
      return testResults;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResults({
        issues: [`Test execution failed: ${errorMessage}`],
        warnings: [],
        passed: [],
        isLoading: false,
        lastTested: new Date()
      });
      
      throw error;
    }
  };

  // Screen reader testing utilities
  const screenReader = {
    announce: screenReaderUtils.announce,
    
    testAriaLabels: (container?: HTMLElement) => {
      const testContainer = container || containerRef.current;
      if (!testContainer) return [];
      return screenReaderUtils.validateAriaLabels(testContainer);
    },
    
    testFocusManagement: (container?: HTMLElement) => {
      const testContainer = container || containerRef.current;
      if (!testContainer) return [];
      return screenReaderUtils.testFocusManagement(testContainer);
    }
  };

  // Keyboard navigation testing utilities
  const keyboard = {
    simulateKeyPress: keyboardUtils.simulateKeyPress,
    
    testTabNavigation: (container?: HTMLElement) => {
      const testContainer = container || containerRef.current;
      if (!testContainer) return [];
      return keyboardUtils.testTabNavigation(testContainer);
    },
    
    testEscapeKey: (element: HTMLElement) => {
      return keyboardUtils.testEscapeKey(element);
    },
    
    testActivationKeys: (element: HTMLElement) => {
      return keyboardUtils.testActivationKeys(element);
    },
    
    // Test common keyboard interactions
    testKeyboardInteractions: async (container?: HTMLElement) => {
      const testContainer = container || containerRef.current;
      if (!testContainer) return { issues: [], passed: [] };
      
      const issues: string[] = [];
      const passed: string[] = [];
      
      // Test tab navigation
      const tabIssues = keyboardUtils.testTabNavigation(testContainer);
      issues.push(...tabIssues);
      if (tabIssues.length === 0) passed.push('Tab navigation works correctly');
      
      // Test interactive elements
      const buttons = testContainer.querySelectorAll('button, [role="button"]');
      buttons.forEach((button, index) => {
        const element = button as HTMLElement;
        const activationResults = keyboardUtils.testActivationKeys(element);
        
        if (!activationResults.enter && !activationResults.space) {
          issues.push(`Button ${index + 1} doesn't respond to Enter or Space keys`);
        } else {
          passed.push(`Button ${index + 1} keyboard activation works`);
        }
      });
      
      return { issues, passed };
    }
  };

  // Mobile accessibility testing utilities
  const mobile = {
    testTouchTargets: (container?: HTMLElement) => {
      const testContainer = container || containerRef.current;
      if (!testContainer) return [];
      return mobileA11yUtils.validateTouchTargets(testContainer);
    },
    
    testViewport: () => {
      return mobileA11yUtils.validateViewport();
    },
    
    testColorContrast: (container?: HTMLElement) => {
      const testContainer = container || containerRef.current;
      if (!testContainer) return [];
      return mobileA11yUtils.validateColorContrast(testContainer);
    },
    
    testLoadingStates: (container?: HTMLElement) => {
      const testContainer = container || containerRef.current;
      if (!testContainer) return [];
      return mobileA11yUtils.validateLoadingStates(testContainer);
    },
    
    // Comprehensive mobile test
    testMobileAccessibility: async (container?: HTMLElement) => {
      const testContainer = container || containerRef.current;
      if (!testContainer) return { issues: [], passed: [] };
      
      const issues: string[] = [];
      const passed: string[] = [];
      
      // Test touch targets
      const touchIssues = mobileA11yUtils.validateTouchTargets(testContainer);
      issues.push(...touchIssues);
      if (touchIssues.length === 0) passed.push('Touch targets are appropriately sized');
      
      // Test viewport
      const viewportIssues = mobileA11yUtils.validateViewport();
      issues.push(...viewportIssues);
      if (viewportIssues.length === 0) passed.push('Viewport configuration is correct');
      
      // Test loading states
      const loadingIssues = mobileA11yUtils.validateLoadingStates(testContainer);
      issues.push(...loadingIssues);
      if (loadingIssues.length === 0) passed.push('Loading states are accessible');
      
      return { issues, passed };
    }
  };

  // Auto-test on mount and dependency changes
  useEffect(() => {
    if (autoTest) {
      runTests();
    }
  }, [autoTest, ...dependencies]);

  // Set up test interval
  useEffect(() => {
    if (testInterval > 0) {
      const interval = setInterval(() => {
        runTests();
      }, testInterval);
      
      return () => clearInterval(interval);
    }
  }, [testInterval]);

  // Utility to get accessibility score
  const getAccessibilityScore = () => {
    const totalTests = results.issues.length + results.warnings.length + results.passed.length;
    if (totalTests === 0) return 0;
    
    const passedTests = results.passed.length;
    return Math.round((passedTests / totalTests) * 100);
  };

  // Utility to get summary
  const getSummary = () => {
    const score = getAccessibilityScore();
    const totalIssues = results.issues.length;
    const totalWarnings = results.warnings.length;
    
    let status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
    
    if (score >= 90 && totalIssues === 0) status = 'excellent';
    else if (score >= 75 && totalIssues <= 2) status = 'good';
    else if (score >= 50) status = 'needs-improvement';
    else status = 'poor';
    
    return {
      score,
      status,
      totalIssues,
      totalWarnings,
      totalPassed: results.passed.length,
      lastTested: results.lastTested
    };
  };

  return {
    // Test results
    results,
    
    // Test runner
    runTests,
    
    // Testing utilities
    screenReader,
    keyboard,
    mobile,
    
    // Container ref for targeting specific elements
    containerRef,
    
    // Utility functions
    getAccessibilityScore,
    getSummary,
    
    // State
    isLoading: results.isLoading,
    hasIssues: results.issues.length > 0,
    hasWarnings: results.warnings.length > 0,
    lastTested: results.lastTested
  };
}

/**
 * Hook for testing specific accessibility features
 * Lighter weight version focused on specific tests
 */
export function useAccessibilityValidator(testType: 'screen-reader' | 'keyboard' | 'mobile' | 'all' = 'all') {
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidation, setLastValidation] = useState<Date | null>(null);
  
  const validate = async (container: HTMLElement = document.body) => {
    setIsValidating(true);
    
    try {
      let results: { issues: string[]; passed: string[] };
      
      switch (testType) {
        case 'screen-reader':
          const ariaIssues = screenReaderUtils.validateAriaLabels(container);
          const focusIssues = screenReaderUtils.testFocusManagement(container);
          results = {
            issues: [...ariaIssues, ...focusIssues],
            passed: ariaIssues.length === 0 && focusIssues.length === 0 ? ['Screen reader compatibility validated'] : []
          };
          break;
          
        case 'keyboard':
          const tabIssues = keyboardUtils.testTabNavigation(container);
          results = {
            issues: tabIssues,
            passed: tabIssues.length === 0 ? ['Keyboard navigation validated'] : []
          };
          break;
          
        case 'mobile':
          const touchIssues = mobileA11yUtils.validateTouchTargets(container);
          const viewportIssues = mobileA11yUtils.validateViewport();
          results = {
            issues: [...touchIssues, ...viewportIssues],
            passed: touchIssues.length === 0 && viewportIssues.length === 0 ? ['Mobile accessibility validated'] : []
          };
          break;
          
        default:
          results = runAccessibilityTests(container);
      }
      
      setLastValidation(new Date());
      return results;
      
    } finally {
      setIsValidating(false);
    }
  };
  
  return {
    validate,
    isValidating,
    lastValidation
  };
}