import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Eye,
  Save,
  User,
  Building,
  FileText,
  Wand2,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";

interface CoverLetterData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  jobInfo: {
    companyName: string;
    hiringManagerName: string;
    jobTitle: string;
    jobSource: string;
  };
  content: {
    introduction: string;
    bodyParagraph1: string;
    bodyParagraph2: string;
    conclusion: string;
  };
}

const templates = {
  professional: {
    name: "Professional",
    introduction: "Dear {{hiringManager}},\n\nI am writing to express my strong interest in the {{jobTitle}} position at {{company}}. With my background and passion for this field, I am confident that I would be a valuable addition to your team.",
    bodyParagraph1: "In my previous roles, I have developed skills that directly align with the requirements outlined in your job posting. My experience has taught me the importance of [specific skill/quality relevant to the role], and I am excited about the opportunity to bring this expertise to {{company}}.",
    bodyParagraph2: "What particularly attracts me to {{company}} is [mention something specific about the company/role]. I am impressed by [company achievement/value], and I believe my [relevant experience/skill] would contribute meaningfully to your continued success.",
    conclusion: "Thank you for considering my application. I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to {{company}}'s success. I look forward to hearing from you.\n\nSincerely,\n{{fullName}}"
  },
  creative: {
    name: "Creative",
    introduction: "Hello {{hiringManager}},\n\nYour {{jobTitle}} posting caught my attention immediately – it's exactly the kind of opportunity I've been seeking. I'm excited to share why I believe we'd make a great team.",
    bodyParagraph1: "Throughout my career, I've thrived in roles that challenge me to think outside the box. Whether it's [specific example], I bring a unique perspective that helps drive innovation and results.",
    bodyParagraph2: "{{company}}'s reputation for [company strength] really resonates with me. I'm particularly drawn to [specific aspect of role/company], and I'm confident my [relevant skill] would add value to your team's already impressive work.",
    conclusion: "I'd love the chance to discuss how we can create something amazing together. Thank you for your time and consideration.\n\nBest regards,\n{{fullName}}"
  },
  executive: {
    name: "Executive",
    introduction: "Dear {{hiringManager}},\n\nI am pleased to submit my candidacy for the {{jobTitle}} position at {{company}}. With [X years] of leadership experience and a proven track record of driving organizational success, I am well-positioned to contribute to your executive team.",
    bodyParagraph1: "My career has been built on delivering measurable results in challenging environments. At [Previous Company], I successfully [specific achievement], which resulted in [quantifiable outcome]. This experience has prepared me to tackle the strategic challenges facing {{company}}.",
    bodyParagraph2: "I am particularly drawn to {{company}}'s commitment to [company value/initiative]. My expertise in [relevant area] and passion for [relevant field] align perfectly with your organization's vision and the requirements of this role.",
    conclusion: "I would appreciate the opportunity to discuss how my leadership experience and strategic vision can contribute to {{company}}'s continued growth and success. Thank you for your consideration.\n\nRespectfully,\n{{fullName}}"
  }
};

export default function CoverLetterBuilder() {
  const [activeTab, setActiveTab] = useState("info");
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>("professional");
  const [showPreview, setShowPreview] = useState(false);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: ""
    },
    jobInfo: {
      companyName: "",
      hiringManagerName: "",
      jobTitle: "",
      jobSource: ""
    },
    content: {
      introduction: "",
      bodyParagraph1: "",
      bodyParagraph2: "",
      conclusion: ""
    }
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("coverLetterData");
    if (saved) {
      setCoverLetterData(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("coverLetterData", JSON.stringify(coverLetterData));
  }, [coverLetterData]);

  const updatePersonalInfo = (field: keyof CoverLetterData['personalInfo'], value: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateJobInfo = (field: keyof CoverLetterData['jobInfo'], value: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      jobInfo: { ...prev.jobInfo, [field]: value }
    }));
  };

  const updateContent = (field: keyof CoverLetterData['content'], value: string) => {
    setCoverLetterData(prev => ({
      ...prev,
      content: { ...prev.content, [field]: value }
    }));
  };

  const applyTemplate = (templateKey: keyof typeof templates) => {
    const template = templates[templateKey];
    setCoverLetterData(prev => ({
      ...prev,
      content: {
        introduction: template.introduction,
        bodyParagraph1: template.bodyParagraph1,
        bodyParagraph2: template.bodyParagraph2,
        conclusion: template.conclusion
      }
    }));
    setSelectedTemplate(templateKey);
  };

  const replacePlaceholders = (text: string) => {
    return text
      .replace(/{{hiringManager}}/g, coverLetterData.jobInfo.hiringManagerName || "Hiring Manager")
      .replace(/{{company}}/g, coverLetterData.jobInfo.companyName || "[Company Name]")
      .replace(/{{jobTitle}}/g, coverLetterData.jobInfo.jobTitle || "[Job Title]")
      .replace(/{{fullName}}/g, `${coverLetterData.personalInfo.firstName} ${coverLetterData.personalInfo.lastName}`.trim() || "[Your Name]");
  };

  const exportToPDF = () => {
    setShowPreview(true);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const tabs = [
    { id: "info", label: "Personal & Job Info", icon: User },
    { id: "template", label: "Choose Template", icon: FileText },
    { id: "content", label: "Write Content", icon: Sparkles }
  ];

  if (showPreview) {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return (
      <div className="min-h-screen bg-white print:p-0">
        <div className="max-w-4xl mx-auto bg-white print:shadow-none print:max-w-none">
          {/* Print Styles */}
          <div className="hidden print:block">
            <style dangerouslySetInnerHTML={{
              __html: `
                @media print {
                  @page { margin: 1in; }
                  body { -webkit-print-color-adjust: exact; }
                }
              `
            }} />
          </div>

          {/* Screen Header */}
          <div className="print:hidden bg-white border-b p-4 flex justify-between items-center">
            <Button 
              onClick={() => setShowPreview(false)}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Edit
            </Button>
            <Button onClick={exportToPDF} className="bg-gradient-to-br from-pink-500 to-rose-500">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* Cover Letter Content */}
          <div className="p-8 print:p-0 max-w-[8.5in] mx-auto">
            {/* Header */}
            <div className="mb-8 print:mb-6">
              <div className="text-right mb-6">
                <h1 className="text-2xl font-bold text-gray-900 print:text-xl">
                  {coverLetterData.personalInfo.firstName} {coverLetterData.personalInfo.lastName}
                </h1>
                <div className="text-gray-600 print:text-sm space-y-1">
                  {coverLetterData.personalInfo.address && <p>{coverLetterData.personalInfo.address}</p>}
                  {coverLetterData.personalInfo.phone && <p>{coverLetterData.personalInfo.phone}</p>}
                  {coverLetterData.personalInfo.email && <p>{coverLetterData.personalInfo.email}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 print:text-sm">{currentDate}</p>
              </div>

              {coverLetterData.jobInfo.companyName && (
                <div className="mb-6">
                  {coverLetterData.jobInfo.hiringManagerName && (
                    <p className="text-gray-900 font-medium print:text-sm">
                      {coverLetterData.jobInfo.hiringManagerName}
                    </p>
                  )}
                  <p className="text-gray-900 font-medium print:text-sm">
                    {coverLetterData.jobInfo.companyName}
                  </p>
                </div>
              )}
            </div>

            {/* Letter Body */}
            <div className="space-y-6 print:space-y-4 text-gray-800 leading-relaxed print:text-sm">
              {coverLetterData.content.introduction && (
                <div className="whitespace-pre-line">
                  {replacePlaceholders(coverLetterData.content.introduction)}
                </div>
              )}

              {coverLetterData.content.bodyParagraph1 && (
                <div className="whitespace-pre-line">
                  {replacePlaceholders(coverLetterData.content.bodyParagraph1)}
                </div>
              )}

              {coverLetterData.content.bodyParagraph2 && (
                <div className="whitespace-pre-line">
                  {replacePlaceholders(coverLetterData.content.bodyParagraph2)}
                </div>
              )}

              {coverLetterData.content.conclusion && (
                <div className="whitespace-pre-line">
                  {replacePlaceholders(coverLetterData.content.conclusion)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                CareerCraft Cover Letter
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setShowPreview(true)}
              variant="outline"
              className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400/10 bg-black/20 backdrop-blur-sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={exportToPDF}
              className="bg-gradient-to-br from-pink-500 to-rose-500 hover:shadow-glow-strong transition-all duration-300 text-white border-0"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <Card className="bg-black/30 backdrop-blur-xl border border-pink-500/30 shadow-glow sticky top-8">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Build Cover Letter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className={`w-full justify-start transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-glow"
                          : "hover:bg-pink-400/10 text-gray-300 hover:text-pink-400"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Card className="bg-black/30 backdrop-blur-xl border border-purple-500/30 shadow-glow">
              <CardContent className="p-8">
                {/* Personal & Job Info Tab */}
                {activeTab === "info" && (
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
                        Personal Information
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={coverLetterData.personalInfo.firstName}
                            onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={coverLetterData.personalInfo.lastName}
                            onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                            placeholder="Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={coverLetterData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo("email", e.target.value)}
                            placeholder="john.doe@email.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={coverLetterData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={coverLetterData.personalInfo.address}
                            onChange={(e) => updatePersonalInfo("address", e.target.value)}
                            placeholder="123 Main St, New York, NY 10001"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Job Information */}
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
                        Job Information
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input
                            id="companyName"
                            value={coverLetterData.jobInfo.companyName}
                            onChange={(e) => updateJobInfo("companyName", e.target.value)}
                            placeholder="Awesome Company Inc."
                          />
                        </div>
                        <div>
                          <Label htmlFor="hiringManagerName">Hiring Manager Name</Label>
                          <Input
                            id="hiringManagerName"
                            value={coverLetterData.jobInfo.hiringManagerName}
                            onChange={(e) => updateJobInfo("hiringManagerName", e.target.value)}
                            placeholder="Jane Smith"
                          />
                        </div>
                        <div>
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            value={coverLetterData.jobInfo.jobTitle}
                            onChange={(e) => updateJobInfo("jobTitle", e.target.value)}
                            placeholder="Senior Software Developer"
                          />
                        </div>
                        <div>
                          <Label htmlFor="jobSource">Where did you find this job?</Label>
                          <Input
                            id="jobSource"
                            value={coverLetterData.jobInfo.jobSource}
                            onChange={(e) => updateJobInfo("jobSource", e.target.value)}
                            placeholder="LinkedIn, Indeed, Company Website"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Template Selection Tab */}
                {activeTab === "template" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
                      Choose Your Template
                    </h2>
                    <div className="grid gap-6">
                      {Object.entries(templates).map(([key, template]) => (
                        <Card 
                          key={key}
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedTemplate === key 
                              ? "border-2 border-pink-500 shadow-glow" 
                              : "border-2 border-gray-200 hover:border-pink-300"
                          }`}
                          onClick={() => applyTemplate(key as keyof typeof templates)}
                        >
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                                <p className="text-gray-600">
                                  {key === "professional" && "Classic, formal tone perfect for corporate roles"}
                                  {key === "creative" && "Modern, engaging style for creative industries"}
                                  {key === "executive" && "Sophisticated tone for leadership positions"}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                className="bg-gradient-to-br from-pink-500 to-rose-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  applyTemplate(key as keyof typeof templates);
                                }}
                              >
                                <Wand2 className="w-4 h-4 mr-2" />
                                Use Template
                              </Button>
                            </div>
                            <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                              <p className="font-medium mb-2">Sample Introduction:</p>
                              <p className="italic">
                                {replacePlaceholders(template.introduction).substring(0, 150)}...
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Writing Tab */}
                {activeTab === "content" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
                      Write Your Cover Letter
                    </h2>
                    
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="introduction">Introduction</Label>
                          <Textarea
                            id="introduction"
                            value={coverLetterData.content.introduction}
                            onChange={(e) => updateContent("introduction", e.target.value)}
                            placeholder="Start with a strong opening that captures attention..."
                            rows={4}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="bodyParagraph1">Body Paragraph 1</Label>
                          <Textarea
                            id="bodyParagraph1"
                            value={coverLetterData.content.bodyParagraph1}
                            onChange={(e) => updateContent("bodyParagraph1", e.target.value)}
                            placeholder="Highlight your relevant experience and skills..."
                            rows={4}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="bodyParagraph2">Body Paragraph 2</Label>
                          <Textarea
                            id="bodyParagraph2"
                            value={coverLetterData.content.bodyParagraph2}
                            onChange={(e) => updateContent("bodyParagraph2", e.target.value)}
                            placeholder="Explain why you're interested in the company..."
                            rows={4}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="conclusion">Conclusion</Label>
                          <Textarea
                            id="conclusion"
                            value={coverLetterData.content.conclusion}
                            onChange={(e) => updateContent("conclusion", e.target.value)}
                            placeholder="End with a strong call to action..."
                            rows={4}
                          />
                        </div>
                      </div>

                      {/* Live Preview */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
                        <Card className="bg-gray-50 border-2 border-gray-200">
                          <CardContent className="p-6 text-sm space-y-4 max-h-96 overflow-y-auto">
                            <div className="text-right text-xs text-gray-600">
                              <p>{coverLetterData.personalInfo.firstName} {coverLetterData.personalInfo.lastName}</p>
                              {coverLetterData.personalInfo.address && <p>{coverLetterData.personalInfo.address}</p>}
                              {coverLetterData.personalInfo.phone && <p>{coverLetterData.personalInfo.phone}</p>}
                              {coverLetterData.personalInfo.email && <p>{coverLetterData.personalInfo.email}</p>}
                            </div>
                            
                            <div className="text-xs text-gray-600">
                              <p>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            {coverLetterData.jobInfo.companyName && (
                              <div className="text-xs">
                                {coverLetterData.jobInfo.hiringManagerName && <p>{coverLetterData.jobInfo.hiringManagerName}</p>}
                                <p>{coverLetterData.jobInfo.companyName}</p>
                              </div>
                            )}

                            <div className="space-y-3 text-xs leading-relaxed">
                              {coverLetterData.content.introduction && (
                                <div className="whitespace-pre-line">
                                  {replacePlaceholders(coverLetterData.content.introduction)}
                                </div>
                              )}
                              {coverLetterData.content.bodyParagraph1 && (
                                <div className="whitespace-pre-line">
                                  {replacePlaceholders(coverLetterData.content.bodyParagraph1)}
                                </div>
                              )}
                              {coverLetterData.content.bodyParagraph2 && (
                                <div className="whitespace-pre-line">
                                  {replacePlaceholders(coverLetterData.content.bodyParagraph2)}
                                </div>
                              )}
                              {coverLetterData.content.conclusion && (
                                <div className="whitespace-pre-line">
                                  {replacePlaceholders(coverLetterData.content.conclusion)}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
