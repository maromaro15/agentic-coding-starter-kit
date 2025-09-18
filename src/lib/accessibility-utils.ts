/**
 * Accessibility Testing Utilities
 * Provides helpers for testing and validating accessibility features
 */

// Screen reader testing utilities
export const screenReaderUtils = {
  /**
   * Announces text to screen readers using aria-live regions
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  /**
   * Validates ARIA labels and descriptions
   */
  validateAriaLabels: (element: HTMLElement): string[] => {
    const issues: string[] = [];
    
    // Check for missing aria-label on interactive elements
    const interactiveElements = element.querySelectorAll('button, input, select, textarea, [role="button"], [role="link"]');
    interactiveElements.forEach((el) => {
      const hasLabel = el.getAttribute('aria-label') || 
                      el.getAttribute('aria-labelledby') || 
                      (el as HTMLElement).innerText.trim();
      
      if (!hasLabel) {
        issues.push(`Interactive element missing accessible name: ${el.tagName}`);
      }
    });
    
    // Check for proper heading structure
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > previousLevel + 1) {
        issues.push(`Heading level skip detected: ${heading.tagName} after h${previousLevel}`);
      }
      previousLevel = level;
    });
    
    return issues;
  },

  /**
   * Tests focus management
   */
  testFocusManagement: (container: HTMLElement): string[] => {
    const issues: string[] = [];
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((el, index) => {
      const element = el as HTMLElement;
      
      // Check if element is focusable
      element.focus();
      if (document.activeElement !== element) {
        issues.push(`Element at index ${index} is not focusable: ${element.tagName}`);
      }
      
      // Check for visible focus indicator
      const computedStyle = window.getComputedStyle(element, ':focus');
      const hasOutline = computedStyle.outline !== 'none' && computedStyle.outline !== '0px';
      const hasBoxShadow = computedStyle.boxShadow !== 'none';
      
      if (!hasOutline && !hasBoxShadow) {
        issues.push(`Element missing focus indicator: ${element.tagName}`);
      }
    });
    
    return issues;
  }
};

// Keyboard navigation testing utilities
export const keyboardUtils = {
  /**
   * Simulates keyboard events for testing
   */
  simulateKeyPress: (element: HTMLElement, key: string, options: KeyboardEventInit = {}) => {
    const event = new KeyboardEvent('keydown', {
      key,
      code: key,
      bubbles: true,
      cancelable: true,
      ...options
    });
    
    element.dispatchEvent(event);
    return event;
  },

  /**
   * Tests tab navigation through elements
   */
  testTabNavigation: (container: HTMLElement): string[] => {
    const issues: string[] = [];
    const focusableElements = Array.from(container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )) as HTMLElement[];
    
    // Test forward tab navigation
    for (let i = 0; i < focusableElements.length; i++) {
      const current = focusableElements[i];
      current.focus();
      
      // Simulate Tab key
      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        code: 'Tab',
        bubbles: true,
        cancelable: true
      });
      
      current.dispatchEvent(tabEvent);
      
      // Check if focus moved to next element
      const next = focusableElements[i + 1];
      if (next && document.activeElement !== next) {
        issues.push(`Tab navigation failed from ${current.tagName} to ${next.tagName}`);
      }
    }
    
    return issues;
  },

  /**
   * Tests escape key functionality
   */
  testEscapeKey: (element: HTMLElement): boolean => {
    const escapeEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      bubbles: true,
      cancelable: true
    });
    
    element.dispatchEvent(escapeEvent);
    return escapeEvent.defaultPrevented;
  },

  /**
   * Tests Enter/Space key activation
   */
  testActivationKeys: (element: HTMLElement): { enter: boolean; space: boolean } => {
    const results = { enter: false, space: false };
    
    // Test Enter key
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      bubbles: true,
      cancelable: true
    });
    
    element.dispatchEvent(enterEvent);
    results.enter = enterEvent.defaultPrevented;
    
    // Test Space key
    const spaceEvent = new KeyboardEvent('keydown', {
      key: ' ',
      code: 'Space',
      bubbles: true,
      cancelable: true
    });
    
    element.dispatchEvent(spaceEvent);
    results.space = spaceEvent.defaultPrevented;
    
    return results;
  }
};

// Mobile accessibility testing utilities
export const mobileA11yUtils = {
  /**
   * Tests touch target sizes (minimum 44px)
   */
  validateTouchTargets: (container: HTMLElement): string[] => {
    const issues: string[] = [];
    const interactiveElements = container.querySelectorAll(
      'button, [role="button"], input, select, textarea, a'
    );
    
    interactiveElements.forEach((el) => {
      const element = el as HTMLElement;
      const rect = element.getBoundingClientRect();
      const minSize = 44; // WCAG recommended minimum
      
      if (rect.width < minSize || rect.height < minSize) {
        issues.push(
          `Touch target too small: ${element.tagName} (${Math.round(rect.width)}x${Math.round(rect.height)}px, minimum ${minSize}x${minSize}px)`
        );
      }
    });
    
    return issues;
  },

  /**
   * Tests for proper mobile viewport configuration
   */
  validateViewport: (): string[] => {
    const issues: string[] = [];
    const viewport = document.querySelector('meta[name="viewport"]');
    
    if (!viewport) {
      issues.push('Missing viewport meta tag');
    } else {
      const content = viewport.getAttribute('content') || '';
      
      if (!content.includes('width=device-width')) {
        issues.push('Viewport should include width=device-width');
      }
      
      if (!content.includes('initial-scale=1')) {
        issues.push('Viewport should include initial-scale=1');
      }
      
      if (content.includes('user-scalable=no')) {
        issues.push('Viewport should not disable user scaling');
      }
    }
    
    return issues;
  },

  /**
   * Tests for proper color contrast
   */
  validateColorContrast: (element: HTMLElement): string[] => {
    const issues: string[] = [];
    
    // This is a simplified contrast check
    // In a real implementation, you'd use a proper contrast calculation library
    const style = window.getComputedStyle(element);
    const color = style.color;
    const backgroundColor = style.backgroundColor;
    
    if (color === backgroundColor) {
      issues.push(`Poor color contrast detected on ${element.tagName}`);
    }
    
    return issues;
  },

  /**
   * Tests for proper loading states and feedback
   */
  validateLoadingStates: (container: HTMLElement): string[] => {
    const issues: string[] = [];
    
    // Check for loading indicators with proper ARIA
    const loadingElements = container.querySelectorAll('[role="status"], [aria-live]');
    
    if (loadingElements.length === 0) {
      const buttons = container.querySelectorAll('button[disabled]');
      if (buttons.length > 0) {
        issues.push('Disabled buttons found without loading indicators');
      }
    }
    
    loadingElements.forEach((el) => {
      const element = el as HTMLElement;
      const hasAriaLabel = element.getAttribute('aria-label');
      const hasAriaLive = element.getAttribute('aria-live');
      
      if (!hasAriaLabel && !hasAriaLive) {
        issues.push('Loading element missing accessibility attributes');
      }
    });
    
    return issues;
  }
};

// Comprehensive accessibility test runner
export const runAccessibilityTests = (container: HTMLElement = document.body): {
  issues: string[];
  warnings: string[];
  passed: string[];
} => {
  const issues: string[] = [];
  const warnings: string[] = [];
  const passed: string[] = [];
  
  try {
    // Run all tests
    const ariaIssues = screenReaderUtils.validateAriaLabels(container);
    const focusIssues = screenReaderUtils.testFocusManagement(container);
    const tabIssues = keyboardUtils.testTabNavigation(container);
    const touchIssues = mobileA11yUtils.validateTouchTargets(container);
    const viewportIssues = mobileA11yUtils.validateViewport();
    const contrastIssues = mobileA11yUtils.validateColorContrast(container);
    const loadingIssues = mobileA11yUtils.validateLoadingStates(container);
    
    // Collect all issues
    issues.push(...ariaIssues, ...focusIssues, ...tabIssues, ...touchIssues, ...viewportIssues, ...contrastIssues, ...loadingIssues);
    
    // Add success messages for passed tests
    if (ariaIssues.length === 0) passed.push('ARIA labels validation passed');
    if (focusIssues.length === 0) passed.push('Focus management validation passed');
    if (tabIssues.length === 0) passed.push('Tab navigation validation passed');
    if (touchIssues.length === 0) passed.push('Touch target validation passed');
    if (viewportIssues.length === 0) passed.push('Viewport configuration validation passed');
    if (loadingIssues.length === 0) passed.push('Loading states validation passed');
    
  } catch (error) {
    issues.push(`Accessibility test error: ${error}`);
  }
  
  return { issues, warnings, passed };
};

// Development helper to log accessibility test results
export const logAccessibilityResults = (container?: HTMLElement) => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const results = runAccessibilityTests(container);
  
  console.group('🔍 Accessibility Test Results');
  
  if (results.passed.length > 0) {
    console.group('✅ Passed Tests');
    results.passed.forEach(test => console.log(`✓ ${test}`));
    console.groupEnd();
  }
  
  if (results.warnings.length > 0) {
    console.group('⚠️ Warnings');
    results.warnings.forEach(warning => console.warn(`⚠ ${warning}`));
    console.groupEnd();
  }
  
  if (results.issues.length > 0) {
    console.group('❌ Issues Found');
    results.issues.forEach(issue => console.error(`✗ ${issue}`));
    console.groupEnd();
  } else {
    console.log('🎉 No accessibility issues found!');
  }
  
  console.groupEnd();
};