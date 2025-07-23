import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Download, Briefcase, CheckCircle, FileText, Sparkles, Target, Zap } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  features: string[];
  color: string;
}

const resumeTemplates: Template[] = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean, contemporary design perfect for corporate roles and tech positions.",
    category: "Professional",
    preview: "/api/templates/modern-professional/preview.png",
    features: ["ATS Optimized", "Clean Layout", "Professional Fonts", "Contact Icons"],
    color: "blue"
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    description: "Eye-catching design ideal for creative professionals and designers.",
    category: "Creative",
    preview: "/api/templates/creative-designer/preview.png",
    features: ["Visual Impact", "Creative Layout", "Color Accents", "Portfolio Section"],
    color: "purple"
  },
  {
    id: "executive-premium",
    name: "Executive Premium",
    description: "Sophisticated layout designed for senior executives and leadership roles.",
    category: "Executive",
    preview: "/api/templates/executive-premium/preview.png",
    features: ["Executive Style", "Leadership Focus", "Achievement Highlights", "Premium Design"],
    color: "green"
  },
  {
    id: "tech-minimalist",
    name: "Tech Minimalist",
    description: "Minimal, clean design perfect for software developers and engineers.",
    category: "Technical",
    preview: "/api/templates/tech-minimalist/preview.png",
    features: ["Minimal Design", "Tech-Focused", "Skills Showcase", "Project Highlights"],
    color: "cyan"
  },
  {
    id: "academic-scholar",
    name: "Academic Scholar",
    description: "Traditional layout ideal for academic positions and research roles.",
    category: "Academic",
    preview: "/api/templates/academic-scholar/preview.png",
    features: ["Academic Format", "Publication Ready", "Research Focus", "Traditional Layout"],
    color: "indigo"
  },
  {
    id: "startup-dynamic",
    name: "Startup Dynamic",
    description: "Dynamic design perfect for startup environments and entrepreneurial roles.",
    category: "Startup",
    preview: "/api/templates/startup-dynamic/preview.png",
    features: ["Dynamic Layout", "Growth Mindset", "Innovation Focus", "Flexible Sections"],
    color: "pink"
  }
];

const colorClasses = {
  blue: {
    card: "border-blue-500/30 hover:border-blue-500/50",
    icon: "bg-gradient-to-br from-blue-500 to-cyan-500",
    badge: "bg-blue-500/20 text-blue-300",
    button: "bg-gradient-to-r from-blue-500 to-cyan-500"
  },
  purple: {
    card: "border-purple-500/30 hover:border-purple-500/50",
    icon: "bg-gradient-to-br from-purple-500 to-pink-500",
    badge: "bg-purple-500/20 text-purple-300",
    button: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  green: {
    card: "border-green-500/30 hover:border-green-500/50",
    icon: "bg-gradient-to-br from-green-500 to-emerald-500",
    badge: "bg-green-500/20 text-green-300",
    button: "bg-gradient-to-r from-green-500 to-emerald-500"
  },
  cyan: {
    card: "border-cyan-500/30 hover:border-cyan-500/50",
    icon: "bg-gradient-to-br from-cyan-500 to-blue-500",
    badge: "bg-cyan-500/20 text-cyan-300",
    button: "bg-gradient-to-r from-cyan-500 to-blue-500"
  },
  indigo: {
    card: "border-indigo-500/30 hover:border-indigo-500/50",
    icon: "bg-gradient-to-br from-indigo-500 to-purple-500",
    badge: "bg-indigo-500/20 text-indigo-300",
    button: "bg-gradient-to-r from-indigo-500 to-purple-500"
  },
  pink: {
    card: "border-pink-500/30 hover:border-pink-500/50",
    icon: "bg-gradient-to-br from-pink-500 to-rose-500",
    badge: "bg-pink-500/20 text-pink-300",
    button: "bg-gradient-to-r from-pink-500 to-rose-500"
  }
};

export default function Templates() {
  const useTemplate = (templateId: string) => {
    // Store selected template in localStorage and redirect to resume builder
    localStorage.setItem("selectedTemplate", templateId);
    window.location.href = "/resume-builder";
  };

  const previewTemplate = (templateId: string) => {
    // Open template preview in new window
    window.open(`/templates/${templateId}/preview`, '_blank');
  };

  const categories = [...new Set(resumeTemplates.map(t => t.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-400/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg border border-white/20">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                CareerCraft Templates
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Professional{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Resume Templates
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose from our collection of professionally designed resume templates. 
            Each template is optimized for ATS systems and designed to impress hiring managers.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant="secondary" 
              className="bg-white/10 text-white border border-white/20 hover:bg-white/20 cursor-pointer px-4 py-2 text-sm"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {resumeTemplates.map((template) => {
            const colors = colorClasses[template.color as keyof typeof colorClasses];
            return (
              <Card 
                key={template.id} 
                className={`bg-black/30 backdrop-blur-xl border ${colors.card} shadow-glow transform hover:scale-105 transition-all duration-300 animate-slide-up`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center shadow-glow`}>
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={colors.badge}>
                      {template.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Template Preview */}
                  <div className="bg-white/5 rounded-lg p-6 mb-4 border border-white/10">
                    <div className="space-y-3">
                      {/* Simulated Resume Preview */}
                      <div className="h-4 bg-white/20 rounded w-3/4"></div>
                      <div className="h-2 bg-white/10 rounded w-full"></div>
                      <div className="h-2 bg-white/10 rounded w-5/6"></div>
                      <div className="space-y-1 mt-4">
                        <div className="h-3 bg-white/15 rounded w-1/2"></div>
                        <div className="h-2 bg-white/10 rounded w-full"></div>
                        <div className="h-2 bg-white/10 rounded w-4/5"></div>
                      </div>
                      <div className="space-y-1 mt-4">
                        <div className="h-3 bg-white/15 rounded w-1/3"></div>
                        <div className="h-2 bg-white/10 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.features.map((feature, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs border-white/30 text-gray-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => useTemplate(template.id)}
                      className={`flex-1 ${colors.button} hover:shadow-glow-strong transition-all duration-300 text-white border-0`}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => previewTemplate(template.id)}
                      className="border-white/30 text-gray-300 hover:bg-white/10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Create Your{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Perfect Resume?
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Start with a template or build from scratch. Our resume builder makes it easy to create 
            professional documents that get results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resume-builder">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-glow-strong transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold text-white border-0"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Building
              </Button>
            </Link>
            <Link to="/cover-letter-builder">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400/10 bg-black/20 backdrop-blur-sm px-8 py-6 text-lg font-semibold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Cover Letter Builder
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
