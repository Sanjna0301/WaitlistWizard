import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WaitlistForm from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function HomePage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 bg-gradient-to-r from-primary-500 to-secondary-300">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-inter leading-tight">
                Your AI-Powered Mental Health Companion
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Mental Health Tracker provides personalized support through AI conversations, mood tracking, and evidence-based resources to help you on your mental wellness journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-7 rounded-lg font-bold shadow-md text-lg"
                  onClick={() => user ? navigate('/chatbot') : navigate('/auth')}
                >
                  Try the AI Companion
                </Button>
                <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-primary-700 text-white hover:bg-primary-800 px-8 py-7 rounded-lg font-bold border border-white/20 shadow-md text-lg"
                    >
                      Join Waitlist
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <WaitlistForm onSuccess={() => setIsWaitlistOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-12 flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-300 flex items-center justify-center">
                    <span className="text-xs text-neutral-600">👤</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-300 flex items-center justify-center">
                    <span className="text-xs text-neutral-600">👤</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-300 flex items-center justify-center">
                    <span className="text-xs text-neutral-600">👤</span>
                  </div>
                </div>
                <div className="ml-4 text-white">
                  <span className="font-semibold">Join 2,500+ users</span>
                  <div className="flex items-center mt-1">
                    <div className="flex text-amber-400">
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-half-fill"></i>
                    </div>
                    <span className="ml-2 text-sm">4.8/5 from 350 reviews</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 bg-primary-500 text-white">
                  <h3 className="font-semibold">Mental Health Tracker</h3>
                </div>
                <div className="p-6">
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter text-neutral-800">Key Features</h2>
            <p className="text-lg text-neutral-600">Our comprehensive toolkit to support your mental well-being journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-xl p-6 shadow-md transition hover:shadow-lg">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-message-3-line text-2xl text-primary-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 font-inter">AI Chatbot</h3>
              <p className="text-neutral-600">
                Powered by Google's Gemini API, our conversational AI provides real-time mental health support with empathy and understanding.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6 shadow-md transition hover:shadow-lg">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-alarm-warning-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 font-inter">SOS & Emergency Support</h3>
              <p className="text-neutral-600">
                Instant access to crisis intervention with our SOS button that connects you directly to mental health experts and resources.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6 shadow-md transition hover:shadow-lg">
              <div className="w-14 h-14 bg-accent-500 bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <i className="ri-mic-line text-2xl text-accent-500"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 font-inter">Voice Recognition</h3>
              <p className="text-neutral-600">
                Talk through your concerns with our voice recognition system that analyzes tone and provides tailored support.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6 shadow-md transition hover:shadow-lg">
              <div className="w-14 h-14 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-dashboard-3-line text-2xl text-secondary-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 font-inter">User Dashboard</h3>
              <p className="text-neutral-600">
                Track your mood and mental health progress with visual insights, personalized strategies, and journaling tools.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6 shadow-md transition hover:shadow-lg">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-book-read-line text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 font-inter">Resource Hub</h3>
              <p className="text-neutral-600">
                Access a curated library of scientific articles, guided meditations, and exercises to support your mental wellness.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6 shadow-md transition hover:shadow-lg">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 font-inter">Security & Privacy</h3>
              <p className="text-neutral-600">
                End-to-end encryption and anonymous mode options ensure your data stays private and secure at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-inter">Ready to Transform Your Mental Wellness Journey?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who are taking proactive steps toward better mental health with AI-powered support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-7 rounded-lg font-bold shadow-md text-lg"
                  >
                    Join the Waitlist
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <WaitlistForm onSuccess={() => setIsWaitlistOpen(false)} />
                </DialogContent>
              </Dialog>
              <Button 
                size="lg"
                variant="outline"
                className="bg-primary-700/30 backdrop-blur-sm text-white hover:bg-primary-800/40 px-8 py-7 rounded-lg font-bold border border-white/20 text-lg"
                onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
