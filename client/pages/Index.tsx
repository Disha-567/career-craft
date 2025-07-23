import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Sparkles, Zap, Shield, Heart, Briefcase, CheckCircle } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-400/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-violet-400/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Professional Logo */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center border border-white/30">
                <CheckCircle className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                CareerCraft
              </span>
              <span className="text-xs text-blue-300 -mt-1">Professional Documents</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">Features</a>
            <Link to="/templates" className="text-gray-300 hover:text-purple-400 transition-colors">Templates</Link>
            <a href="#pricing" className="text-gray-300 hover:text-pink-400 transition-colors">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Create{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Radiant
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Resumes & Cover Letters
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Illuminate your career path with professionally designed resumes and cover letters 
              that showcase your unique brilliance and land you dream jobs in the modern world.
            </p>
          </div>
          
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/resume-builder">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-glow-strong transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold text-white border-0"
              >
                <FileText className="w-5 h-5 mr-2" />
                Build Resume
              </Button>
            </Link>
            <Link to="/cover-letter-builder">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 bg-black/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Create Cover Letter
              </Button>
            </Link>
          </div>

          {/* Preview Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            <Card className="bg-black/30 backdrop-blur-xl border border-cyan-500/30 shadow-glow transform hover:scale-105 transition-all duration-300 animate-slide-up">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-glow">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Resume Builder</h3>
                <p className="text-gray-300 mb-6">
                  Professional templates with expert-designed layouts to create the perfect resume
                </p>
                <div className="flex justify-center">
                  <Link to="/resume-builder">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 transition-all duration-300">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-xl border border-pink-500/30 shadow-glow transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-glow">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Cover Letter Builder</h3>
                <p className="text-gray-300 mb-6">
                  Craft compelling cover letters that tell your story and impress employers
                </p>
                <div className="flex justify-center">
                  <Link to="/cover-letter-builder">
                    <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 transition-all duration-300">
                      Create Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-black/20 backdrop-blur-sm border-y border-white/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Why Choose CareerCraft?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Everything you need to create professional documents that radiate success
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300 shadow-glow">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Lightning Fast</h3>
                <p className="text-gray-300">
                  Create professional documents in minutes, not hours. Our streamlined process gets you results quickly.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300 shadow-glow">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">ATS Optimized</h3>
                <p className="text-gray-300">
                  All templates are designed to pass Applicant Tracking Systems and reach human recruiters.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300 shadow-glow">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Made with Love</h3>
                <p className="text-gray-300">
                  Crafted by career experts and designers who understand what employers want to see.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Land Your{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Dream Job?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of professionals who've advanced their careers with CareerCraft
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/resume-builder">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-glow-strong transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold text-white border-0"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Start Building Now
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 bg-black/20 backdrop-blur-sm px-8 py-6 text-lg font-semibold"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg border border-white/20">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center border border-white/30">
                    <CheckCircle className="w-2 h-2 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                  CareerCraft
                </span>
              </div>
              <p className="text-gray-400">
                Create stunning resumes and cover letters that showcase your professional excellence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/resume-builder" className="hover:text-cyan-400 transition-colors">Resume Builder</Link></li>
                <li><Link to="/cover-letter-builder" className="hover:text-purple-400 transition-colors">Cover Letter Builder</Link></li>
                <li><Link to="/templates" className="hover:text-pink-400 transition-colors">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CareerCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
