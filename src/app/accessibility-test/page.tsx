"use client";

import React, { useState } from 'react';
import { AccessibilityTestPanel, AccessibilityStatus } from '@/components/accessibility/accessibility-test-panel';
import { useAccessibilityTesting } from '@/hooks/use-accessibility-testing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Keyboard, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Info,
  Play,
  Pause,
  SkipForward
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AccessibilityTestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: '',
    priority: '',
    notifications: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const {
    containerRef,
    keyboard,
    mobile,
    screenReader
  } = useAccessibilityTesting();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowResults(true);
    
    // Announce to screen readers
    screenReader.announce('Form submitted successfully!');
  };
  
  const handleKeyboardTest = async () => {
    if (containerRef.current) {
      const results = await keyboard.testKeyboardInteractions(containerRef.current);
      console.log('Keyboard test results:', results);
      
      if (results.issues.length === 0) {
        screenReader.announce('Keyboard navigation test passed!');
      } else {
        screenReader.announce(`Keyboard navigation test found ${results.issues.length} issues`);
      }
    }
  };
  
  const handleMobileTest = async () => {
    if (containerRef.current) {
      const results = await mobile.testMobileAccessibility(containerRef.current);
      console.log('Mobile accessibility test results:', results);
      
      if (results.issues.length === 0) {
        screenReader.announce('Mobile accessibility test passed!');
      } else {
        screenReader.announce(`Mobile accessibility test found ${results.issues.length} issues`);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Accessibility Testing Suite
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Test and validate accessibility features including screen reader compatibility,
            keyboard navigation, and mobile accessibility.
          </p>
          <div className="mt-4 flex justify-center">
            <AccessibilityStatus />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Form */}
          <div ref={containerRef}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Keyboard className="h-5 w-5" />
                  Interactive Test Form
                </CardTitle>
                <CardDescription>
                  This form is designed to test various accessibility features.
                  Try navigating with keyboard only (Tab, Enter, Space, Arrow keys).
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Text Inputs */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        aria-describedby="name-help"
                        className="mt-1"
                      />
                      <p id="name-help" className="text-sm text-gray-500 mt-1">
                        Enter your full name as it appears on official documents
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        aria-describedby="email-help"
                        className="mt-1"
                      />
                      <p id="email-help" className="text-sm text-gray-500 mt-1">
                        We'll use this to send you updates
                      </p>
                    </div>
                  </div>
                  
                  {/* Select Dropdown */}
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="mt-1" aria-describedby="category-help">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                      </SelectContent>
                    </Select>
                    <p id="category-help" className="text-sm text-gray-500 mt-1">
                      Choose the category that best describes your inquiry
                    </p>
                  </div>
                  
                  {/* Radio Group */}
                  <div>
                    <Label className="text-base font-medium">Priority Level</Label>
                    <RadioGroup 
                      value={formData.priority} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                      className="mt-2"
                      aria-describedby="priority-help"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="priority-low" />
                        <Label htmlFor="priority-low">Low - Can wait</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="priority-medium" />
                        <Label htmlFor="priority-medium">Medium - Important</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="priority-high" />
                        <Label htmlFor="priority-high">High - Urgent</Label>
                      </div>
                    </RadioGroup>
                    <p id="priority-help" className="text-sm text-gray-500 mt-1">
                      Select the urgency level for your request
                    </p>
                  </div>
                  
                  {/* Textarea */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows={4}
                      aria-describedby="message-help"
                      className="mt-1"
                      placeholder="Please describe your inquiry in detail..."
                    />
                    <p id="message-help" className="text-sm text-gray-500 mt-1">
                      Provide as much detail as possible to help us assist you
                    </p>
                  </div>
                  
                  {/* Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifications"
                      checked={formData.notifications}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifications: !!checked }))}
                      aria-describedby="notifications-help"
                    />
                    <Label htmlFor="notifications" className="text-sm">
                      Send me email notifications about updates
                    </Label>
                  </div>
                  <p id="notifications-help" className="text-sm text-gray-500">
                    You can unsubscribe at any time
                  </p>
                  
                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2"
                      aria-describedby="submit-help"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Submit Form
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleKeyboardTest}
                      className="flex items-center gap-2"
                    >
                      <Keyboard className="h-4 w-4" />
                      Test Keyboard Nav
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleMobileTest}
                      className="flex items-center gap-2"
                    >
                      <Smartphone className="h-4 w-4" />
                      Test Mobile A11y
                    </Button>
                  </div>
                  <p id="submit-help" className="text-sm text-gray-500">
                    All required fields must be completed before submission
                  </p>
                </form>
                
                {/* Success Message */}
                {showResults && (
                  <Alert className="mt-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Form submitted successfully! Thank you for testing our accessibility features.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
            
            {/* Keyboard Navigation Guide */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Keyboard Navigation Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Basic Navigation</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li><Badge variant="outline" className="mr-2">Tab</Badge>Move to next element</li>
                      <li><Badge variant="outline" className="mr-2">Shift+Tab</Badge>Move to previous element</li>
                      <li><Badge variant="outline" className="mr-2">Enter</Badge>Activate buttons/links</li>
                      <li><Badge variant="outline" className="mr-2">Space</Badge>Toggle checkboxes/buttons</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Form Controls</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li><Badge variant="outline" className="mr-2">↑↓</Badge>Navigate radio buttons</li>
                      <li><Badge variant="outline" className="mr-2">↑↓</Badge>Navigate select options</li>
                      <li><Badge variant="outline" className="mr-2">Esc</Badge>Close dropdowns</li>
                      <li><Badge variant="outline" className="mr-2">Home/End</Badge>Move to start/end</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Accessibility Test Panel */}
          <div>
            <AccessibilityTestPanel 
              targetContainer={containerRef.current || undefined}
              showDetails={true}
              autoTest={false}
            />
            
            {/* Mobile Testing Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile Testing Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Eye className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Screen Reader Testing:</strong> Enable VoiceOver (iOS) or TalkBack (Android) 
                    to test screen reader compatibility. Navigate using swipe gestures.
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <Keyboard className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Keyboard Navigation:</strong> Connect an external keyboard to test 
                    tab navigation on mobile browsers. Ensure all interactive elements are reachable.
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <Smartphone className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Touch Targets:</strong> Ensure all interactive elements are at least 
                    44x44 pixels for comfortable touch interaction.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">iOS Testing</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Enable VoiceOver in Settings</li>
                      <li>• Use 3-finger triple-tap</li>
                      <li>• Swipe right/left to navigate</li>
                      <li>• Double-tap to activate</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Android Testing</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Enable TalkBack in Settings</li>
                      <li>• Use volume keys shortcut</li>
                      <li>• Swipe right/left to navigate</li>
                      <li>• Double-tap to activate</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}