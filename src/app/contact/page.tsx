'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Mail, MessageSquare, Bug, Lightbulb, Send, CheckCircle, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'general',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setErrorMsg('Could not send message. Please check your connection and try again.');
      setStatus('error');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-lg font-bold text-foreground mb-2">Message Sent!</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Thank you for reaching out. We&apos;ll respond as soon as possible.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/">
              <Button variant="outline" size="sm">Home</Button>
            </Link>
            <Button size="sm" onClick={() => {
              setStatus('idle');
              setFormData({ name: '', email: '', type: 'general', subject: '', message: '' });
            }}>
              Send Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b [--tw-gradient-from:var(--brand-subtle)] to-background border-b border-border/40">
        <div className="container mx-auto px-4 py-6 max-w-lg">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground text-xs -ml-2">
              <ArrowLeft className="mr-2 h-3 w-3" />
              Home
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground mb-1">Get in Touch</h1>
          <p className="text-xs text-muted-foreground">
            Found a mistake? Have a suggestion? We read every message.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 max-w-lg">
        {/* Quick Options */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <Mail className="h-4 w-4 mx-auto mb-1 text-brand" />
            <p className="text-[10px] font-medium">General</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <Bug className="h-4 w-4 mx-auto mb-1 text-red-500" />
            <p className="text-[10px] font-medium">Bug Report</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <Lightbulb className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
            <p className="text-[10px] font-medium">Suggestion</p>
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-brand" />
              Send a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Name</Label>
                  <Input
                    id="name"
                    placeholder="Optional"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-9 text-sm"
                    disabled={status === 'sending'}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Optional"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-9 text-sm"
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="type" className="text-xs">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange('type', value)}
                  disabled={status === 'sending'}
                >
                  <SelectTrigger id="type" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="bug">Report a Bug</SelectItem>
                    <SelectItem value="content">Content Error</SelectItem>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief summary"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                  className="h-9 text-sm"
                  disabled={status === 'sending'}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                  className="text-sm resize-none"
                  disabled={status === 'sending'}
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-600 dark:text-red-400">{errorMsg}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-brand hover:bg-brand-dark text-white"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-[10px] text-muted-foreground mt-4">
          We typically respond within 24–48 hours
        </p>
      </div>
    </div>
  );
}
