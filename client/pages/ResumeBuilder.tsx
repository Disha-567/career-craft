import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Plus, 
  Trash2, 
  Eye,
  Save,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
  Wand2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Sparkles
} from "lucide-react";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

interface Skill {
  id: string;
  name: string;
  level: string;
  category: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}

interface ResumeScore {
  overall: number;
  completeness: number;
  atsOptimization: number;
  contentQuality: number;
  suggestions: string[];
}

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: ""
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  // Load data from localStorage on mount and check for selected template
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    const selectedTemplate = localStorage.getItem("selectedTemplate");

    // If a template was selected, clear it and load template data
    if (selectedTemplate) {
      localStorage.removeItem("selectedTemplate");
      loadTemplateData(selectedTemplate);
    } else if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        // Ensure all required properties exist with defaults
        setResumeData({
          personalInfo: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            location: "",
            website: "",
            summary: "",
            ...parsedData.personalInfo
          },
          experience: parsedData.experience || [],
          education: parsedData.education || [],
          skills: parsedData.skills || [],
          projects: parsedData.projects || []
        });
      } catch (error) {
        console.error("Error loading resume data:", error);
        // Keep default state if parsing fails
      }
    }
  }, []);

  const loadTemplateData = (templateId: string) => {
    // Load template-specific data based on template ID
    const templateData = getTemplateData(templateId);
    setResumeData(templateData);
  };

  const getTemplateData = (templateId: string): ResumeData => {
    const templates: Record<string, ResumeData> = {
      "modern-professional": {
        personalInfo: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          location: "New York, NY",
          website: "www.johndoe.com",
          summary: "Results-driven professional with 5+ years of experience in project management and team leadership. Proven track record of delivering complex projects on time and within budget while maintaining high quality standards."
        },
        experience: [
          {
            id: "1",
            company: "Tech Solutions Inc.",
            position: "Senior Project Manager",
            startDate: "Jan 2021",
            endDate: "",
            current: true,
            description: "Lead cross-functional teams to deliver software solutions for enterprise clients.",
            achievements: [
              "Successfully managed 15+ projects with 98% on-time delivery rate",
              "Increased team productivity by 30% through implementation of agile methodologies",
              "Reduced project costs by 20% through strategic vendor negotiations"
            ]
          }
        ],
        education: [
          {
            id: "1",
            school: "University of Technology",
            degree: "Bachelor of Science",
            field: "Computer Science",
            startDate: "2015",
            endDate: "2019",
            gpa: "3.8"
          }
        ],
        skills: [
          { id: "1", name: "Project Management", level: "Expert", category: "Technical" },
          { id: "2", name: "Agile/Scrum", level: "Advanced", category: "Technical" },
          { id: "3", name: "Leadership", level: "Advanced", category: "Soft Skills" },
          { id: "4", name: "Communication", level: "Expert", category: "Soft Skills" }
        ],
        projects: []
      },
      "creative-designer": {
        personalInfo: {
          firstName: "Sarah",
          lastName: "Wilson",
          email: "sarah.wilson@email.com",
          phone: "+1 (555) 987-6543",
          location: "Los Angeles, CA",
          website: "www.sarahwilson.design",
          summary: "Creative designer with 4+ years of experience in visual design, branding, and user experience. Passionate about creating innovative designs that solve real-world problems and enhance user engagement."
        },
        experience: [
          {
            id: "1",
            company: "Creative Agency Pro",
            position: "Senior UI/UX Designer",
            startDate: "Mar 2022",
            endDate: "",
            current: true,
            description: "Design user interfaces and experiences for web and mobile applications.",
            achievements: [
              "Redesigned mobile app interface resulting in 40% increase in user engagement",
              "Created brand identity for 20+ clients across various industries",
              "Led design thinking workshops for cross-functional teams"
            ]
          }
        ],
        education: [
          {
            id: "1",
            school: "Art Institute of Design",
            degree: "Bachelor of Fine Arts",
            field: "Graphic Design",
            startDate: "2017",
            endDate: "2021",
            gpa: "3.9"
          }
        ],
        skills: [
          { id: "1", name: "Adobe Creative Suite", level: "Expert", category: "Technical" },
          { id: "2", name: "Figma", level: "Advanced", category: "Tools" },
          { id: "3", name: "UI/UX Design", level: "Expert", category: "Technical" },
          { id: "4", name: "Branding", level: "Advanced", category: "Technical" }
        ],
        projects: [
          {
            id: "1",
            name: "E-commerce Mobile App",
            description: "Designed complete mobile shopping experience with focus on conversion optimization",
            technologies: ["Figma", "Principle", "Adobe XD"],
            link: "https://dribbble.com/shots/example"
          }
        ]
      }
      // Add more templates as needed
    };

    return templates[templateId] || {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        summary: ""
      },
      experience: [],
      education: [],
      skills: [],
      projects: []
    };
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // AI Content Generation Functions
  const generateSummary = () => {
    const personalInfo = resumeData.personalInfo || {};
    const experience = resumeData.experience || [];
    const skills = resumeData.skills || [];

    const { firstName, lastName } = personalInfo;
    const totalExp = experience.length;
    const skillNames = skills.map(s => s?.name || "").filter(Boolean).slice(0, 5).join(", ");
    const position = experience[0]?.position || "professional";

    const summaries = [
      `Dynamic and results-driven ${position} with ${totalExp}+ years of experience in ${skillNames || "various technologies"}. Proven track record of delivering innovative solutions and driving business growth through strategic thinking and technical expertise.`,
      `Experienced ${position} with a passion for ${skillNames || "technology and innovation"}. Demonstrated ability to lead cross-functional teams, optimize processes, and deliver exceptional results in fast-paced environments.`,
      `Innovative ${position} specializing in ${skillNames || "cutting-edge technologies"}. Known for problem-solving abilities, attention to detail, and commitment to continuous learning and professional development.`
    ];

    return summaries[Math.floor(Math.random() * summaries.length)];
  };

  const generateJobDescription = (position: string, company: string) => {
    const achievements = [
      `Led a team of 5-8 developers to deliver high-quality software solutions ahead of schedule`,
      `Improved system performance by 40% through optimization and code refactoring`,
      `Collaborated with cross-functional teams to implement new features and resolve critical bugs`,
      `Mentored junior developers and conducted code reviews to maintain coding standards`,
      `Participated in agile development processes and contributed to sprint planning and retrospectives`,
      `Designed and implemented scalable solutions that reduced operational costs by 25%`,
      `Enhanced user experience through responsive design and accessibility improvements`,
      `Automated testing processes, reducing manual testing time by 60%`
    ];
    
    return achievements.slice(0, 3 + Math.floor(Math.random() * 3));
  };

  const generateSkillSuggestions = () => {
    const skillCategories = {
      "Technical": ["JavaScript", "Python", "React", "Node.js", "MongoDB", "PostgreSQL", "AWS", "Docker"],
      "Soft Skills": ["Leadership", "Communication", "Problem Solving", "Team Collaboration", "Time Management"],
      "Tools": ["Git", "Jira", "Slack", "Figma", "Adobe Creative Suite", "Microsoft Office"],
      "Frameworks": ["React", "Angular", "Vue.js", "Express.js", "Django", "Flask", "Spring Boot"]
    };
    
    return skillCategories;
  };

  const autoGenerateContent = async () => {
    setIsGenerating(true);

    const experience = resumeData.experience || [];
    const skills = resumeData.skills || [];
    const personalInfo = resumeData.personalInfo || {};

    // Generate summary if empty
    if (!personalInfo.summary && experience.length > 0) {
      setResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          summary: generateSummary()
        }
      }));
    }

    // Generate achievements for experiences
    const updatedExperience = experience.map(exp => {
      if (!exp.achievements || exp.achievements.length === 0) {
        return {
          ...exp,
          achievements: generateJobDescription(exp.position || "", exp.company || "")
        };
      }
      return exp;
    });

    setResumeData(prev => ({
      ...prev,
      experience: updatedExperience
    }));

    // Add suggested skills if skills are empty
    if (skills.length === 0) {
      const suggestions = generateSkillSuggestions();
      const newSkills = Object.entries(suggestions).flatMap(([category, skillList]) =>
        skillList.slice(0, 2).map((skill, index) => ({
          id: `${category}-${index}`,
          name: skill,
          level: ["Intermediate", "Advanced", "Expert"][Math.floor(Math.random() * 3)],
          category
        }))
      );

      setResumeData(prev => ({
        ...prev,
        skills: newSkills
      }));
    }

    setTimeout(() => setIsGenerating(false), 2000);
  };

  const calculateResumeScore = (): ResumeScore => {
    let completeness = 0;
    let atsOptimization = 0;
    let contentQuality = 0;
    const suggestions: string[] = [];

    // Safe access to ensure arrays exist
    const experience = resumeData.experience || [];
    const education = resumeData.education || [];
    const skills = resumeData.skills || [];
    const personalInfo = resumeData.personalInfo || {};
    const summary = personalInfo.summary || "";

    // Completeness Score (40%)
    if (personalInfo.firstName && personalInfo.lastName) completeness += 10;
    if (personalInfo.email && personalInfo.phone) completeness += 10;
    if (summary && summary.length > 50) completeness += 10;
    else suggestions.push("Add a professional summary (50+ characters)");

    if (experience.length > 0) completeness += 10;
    else suggestions.push("Add work experience");

    if (education.length > 0) completeness += 5;
    else suggestions.push("Add education details");

    if (skills.length >= 5) completeness += 5;
    else suggestions.push("Add at least 5 skills");

    // ATS Optimization Score (30%)
    const keywords = skills.map(s => s?.name?.toLowerCase() || "").filter(Boolean);
    if (keywords.length >= 8) atsOptimization += 15;
    else suggestions.push("Add more relevant keywords/skills for ATS optimization");

    if (experience.some(exp => exp?.achievements && exp.achievements.length > 2)) atsOptimization += 15;
    else suggestions.push("Add specific achievements with metrics in work experience");

    // Content Quality Score (30%)
    const hasMetrics = experience.some(exp => {
      const description = exp?.description || "";
      return description.includes('%') || description.includes('$') || /\d+/.test(description);
    });
    if (hasMetrics) contentQuality += 15;
    else suggestions.push("Include quantifiable achievements (numbers, percentages, etc.)");

    if (summary && summary.length > 100) contentQuality += 15;
    else suggestions.push("Expand your professional summary to 100+ characters");

    const overall = Math.round((completeness + atsOptimization + contentQuality) * 2.5);

    return {
      overall,
      completeness,
      atsOptimization,
      contentQuality,
      suggestions: suggestions.slice(0, 3)
    };
  };

  const resumeScore = calculateResumeScore();

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: []
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean | string[]) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      achievements: []
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate",
      category: "Technical"
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: ""
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const exportToPDF = () => {
    setShowPreview(true);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Award },
    { id: "projects", label: "Projects", icon: Target }
  ];

  if (showPreview) {
    return (
      <div className="min-h-screen bg-white print:p-0">
        <div className="max-w-4xl mx-auto bg-white print:shadow-none print:max-w-none">
          {/* Print Header */}
          <div className="hidden print:block print:mb-0">
            <style dangerouslySetInnerHTML={{
              __html: `
                @media print {
                  @page { margin: 0.5in; }
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
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">Resume Score</div>
                <div className="text-2xl font-bold text-green-600">{resumeScore.overall}%</div>
              </div>
              <Button onClick={exportToPDF} className="bg-gradient-to-br from-cyan-500 to-blue-500">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Resume Content */}
          <div className="p-8 print:p-0">
            {/* Header */}
            <div className="text-center mb-8 print:mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 print:text-3xl">
                {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-gray-600 print:gap-2 print:text-sm">
                {resumeData.personalInfo.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {resumeData.personalInfo.email}
                  </div>
                )}
                {resumeData.personalInfo.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {resumeData.personalInfo.phone}
                  </div>
                )}
                {resumeData.personalInfo.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {resumeData.personalInfo.location}
                  </div>
                )}
                {resumeData.personalInfo.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {resumeData.personalInfo.website}
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            {resumeData.personalInfo.summary && (
              <div className="mb-8 print:mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 print:text-lg border-b-2 border-cyan-500 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed print:text-sm">
                  {resumeData.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {(resumeData.experience || []).length > 0 && (
              <div className="mb-8 print:mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 print:text-lg border-b-2 border-cyan-500 pb-1">
                  Professional Experience
                </h2>
                {(resumeData.experience || []).map((exp) => (
                  <div key={exp.id} className="mb-6 print:mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 print:text-base">
                          {exp.position}
                        </h3>
                        <p className="text-cyan-600 font-medium print:text-sm">
                          {exp.company}
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm print:text-xs">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 print:text-sm leading-relaxed mb-2">
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 print:text-sm space-y-1">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {(resumeData.projects || []).length > 0 && (
              <div className="mb-8 print:mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 print:text-lg border-b-2 border-cyan-500 pb-1">
                  Key Projects
                </h2>
                {(resumeData.projects || []).map((project) => (
                  <div key={project.id} className="mb-4 print:mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 print:text-base">
                          {project.name}
                        </h3>
                        <p className="text-gray-700 print:text-sm mb-2">
                          {project.description}
                        </p>
                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {(resumeData.education || []).length > 0 && (
              <div className="mb-8 print:mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 print:text-lg border-b-2 border-cyan-500 pb-1">
                  Education
                </h2>
                {(resumeData.education || []).map((edu) => (
                  <div key={edu.id} className="mb-4 print:mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 print:text-base">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>
                        <p className="text-cyan-600 font-medium print:text-sm">
                          {edu.school}
                        </p>
                        {edu.gpa && (
                          <p className="text-gray-600 text-sm print:text-xs">
                            GPA: {edu.gpa}
                          </p>
                        )}
                        {edu.achievements && edu.achievements.length > 0 && (
                          <ul className="list-disc list-inside text-gray-700 print:text-sm space-y-1 mt-2">
                            {edu.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm print:text-xs">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {(resumeData.skills || []).length > 0 && (
              <div className="mb-8 print:mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 print:text-lg border-b-2 border-cyan-500 pb-1">
                  Technical Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-3 print:gap-2">
                  {Object.entries(
                    (resumeData.skills || []).reduce((acc, skill) => {
                      const category = skill?.category || "Other";
                      if (!acc[category]) acc[category] = [];
                      acc[category].push(skill);
                      return acc;
                    }, {} as Record<string, Skill[]>)
                  ).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-gray-900 mb-2 print:text-sm">
                        {category}
                      </h4>
                      <div className="space-y-1">
                        {skills.map((skill) => (
                          <div key={skill.id} className="flex justify-between">
                            <span className="text-gray-700 print:text-sm">
                              {skill.name}
                            </span>
                            <span className="text-gray-500 text-sm print:text-xs">
                              {skill.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">CareerCraft Resume</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={autoGenerateContent}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isGenerating ? (
                <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Wand2 className="w-4 h-4 mr-2" />
              )}
              {isGenerating ? "Generating..." : "AI Enhance"}
            </Button>
            <Button
              onClick={() => setShowPreview(true)}
              variant="outline"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 bg-black/20 backdrop-blur-sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={exportToPDF}
              className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-glow-strong transition-all duration-300 text-white border-0"
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
            <Card className="bg-black/30 backdrop-blur-xl border border-cyan-500/30 shadow-glow sticky top-8">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Build Your Resume</CardTitle>
                {/* Resume Score */}
                <div className="mt-4 p-4 bg-black/20 backdrop-blur-sm border border-cyan-500/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">Resume Score</span>
                    <span className="text-2xl font-bold text-emerald-400">{resumeScore.overall}%</span>
                  </div>
                  <Progress value={resumeScore.overall} className="mb-3" />
                  <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span>Completeness</span>
                      <span>{resumeScore.completeness}/40</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ATS Optimization</span>
                      <span>{resumeScore.atsOptimization}/30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Content Quality</span>
                      <span>{resumeScore.contentQuality}/30</span>
                    </div>
                  </div>
                  {resumeScore.suggestions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <div className="text-xs font-medium text-orange-400 mb-1">Suggestions:</div>
                      {resumeScore.suggestions.slice(0, 2).map((suggestion, index) => (
                        <div key={index} className="text-xs text-gray-300 flex items-start gap-1">
                          <AlertCircle className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-glow"
                          : "hover:bg-cyan-400/10 text-gray-300 hover:text-cyan-400"
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
                {/* Personal Information Tab */}
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">Personal Information</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-white">First Name</Label>
                          <Input
                            id="firstName"
                            value={resumeData.personalInfo.firstName}
                            onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-white">Last Name</Label>
                          <Input
                            id="lastName"
                            value={resumeData.personalInfo.lastName}
                            onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                            placeholder="Doe"
                            className="bg-black/20 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo("email", e.target.value)}
                            placeholder="john.doe@email.com"
                            className="bg-black/20 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-white">Phone</Label>
                          <Input
                            id="phone"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="bg-black/20 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location" className="text-white">Location</Label>
                          <Input
                            id="location"
                            value={resumeData.personalInfo.location}
                            onChange={(e) => updatePersonalInfo("location", e.target.value)}
                            placeholder="New York, NY"
                            className="bg-black/20 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website" className="text-white">Website</Label>
                          <Input
                            id="website"
                            value={resumeData.personalInfo.website}
                            onChange={(e) => updatePersonalInfo("website", e.target.value)}
                            placeholder="www.johndoe.com"
                            className="bg-black/20 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="summary" className="text-white">Professional Summary</Label>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-400 text-purple-400 hover:bg-purple-400/10"
                            onClick={() => {
                              if ((resumeData.experience || []).length > 0) {
                                updatePersonalInfo("summary", generateSummary());
                              }
                            }}
                            disabled={(resumeData.experience || []).length === 0}
                          >
                            <Sparkles className="w-4 h-4 mr-1" />
                            Auto-Generate
                          </Button>
                        </div>
                        <Textarea
                          id="summary"
                          value={resumeData.personalInfo.summary}
                          onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                          placeholder="A brief summary of your professional background and key strengths..."
                          rows={4}
                          className="bg-black/20 border-gray-600 text-white placeholder:text-gray-400"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          {(resumeData.personalInfo?.summary || "").length}/200 characters
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience Tab */}
                {activeTab === "experience" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gradient">Work Experience</h2>
                      <Button onClick={addExperience} className="bg-gradient-brand">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                    {(resumeData.experience || []).map((exp, index) => (
                      <Card key={exp.id} className="border-2 border-brand-200">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold">Experience #{index + 1}</h3>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const achievements = generateJobDescription(exp.position, exp.company);
                                  updateExperience(exp.id, "achievements", achievements);
                                }}
                                disabled={!exp.position}
                              >
                                <Wand2 className="w-4 h-4 mr-1" />
                                Generate
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeExperience(exp.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`company-${exp.id}`}>Company</Label>
                              <Input
                                id={`company-${exp.id}`}
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                placeholder="Company Name"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`position-${exp.id}`}>Position</Label>
                              <Input
                                id={`position-${exp.id}`}
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                placeholder="Job Title"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                              <Input
                                id={`startDate-${exp.id}`}
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                placeholder="Jan 2020"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                              <Input
                                id={`endDate-${exp.id}`}
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                placeholder="Dec 2022"
                                disabled={exp.current}
                              />
                              <div className="flex items-center mt-2">
                                <input
                                  type="checkbox"
                                  id={`current-${exp.id}`}
                                  checked={exp.current}
                                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                  className="mr-2"
                                />
                                <Label htmlFor={`current-${exp.id}`} className="text-sm">
                                  I currently work here
                                </Label>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Label htmlFor={`description-${exp.id}`}>Job Description</Label>
                            <Textarea
                              id={`description-${exp.id}`}
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={2}
                            />
                          </div>
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="mt-4">
                              <Label>Key Achievements</Label>
                              <div className="mt-2 space-y-2">
                                {exp.achievements.map((achievement, achIndex) => (
                                  <div key={achIndex} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-sm text-gray-700">{achievement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Education Tab */}
                {activeTab === "education" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gradient">Education</h2>
                      <Button onClick={addEducation} className="bg-gradient-brand">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                    {(resumeData.education || []).map((edu, index) => (
                      <Card key={edu.id} className="border-2 border-brand-200">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold">Education #{index + 1}</h3>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`school-${edu.id}`}>School/University</Label>
                              <Input
                                id={`school-${edu.id}`}
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                placeholder="University Name"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                              <Input
                                id={`degree-${edu.id}`}
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                placeholder="Bachelor of Science"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                              <Input
                                id={`field-${edu.id}`}
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                                placeholder="Computer Science"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                              <Input
                                id={`gpa-${edu.id}`}
                                value={edu.gpa}
                                onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                                placeholder="3.8"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`eduStartDate-${edu.id}`}>Start Date</Label>
                              <Input
                                id={`eduStartDate-${edu.id}`}
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                                placeholder="2018"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`eduEndDate-${edu.id}`}>End Date</Label>
                              <Input
                                id={`eduEndDate-${edu.id}`}
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                                placeholder="2022"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gradient">Skills</h2>
                      <Button onClick={addSkill} className="bg-gradient-brand">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {(resumeData.skills || []).map((skill, index) => (
                        <Card key={skill.id} className="border-2 border-brand-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-sm font-medium">Skill #{index + 1}</span>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeSkill(skill.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <Label htmlFor={`skillName-${skill.id}`}>Skill Name</Label>
                                <Input
                                  id={`skillName-${skill.id}`}
                                  value={skill.name}
                                  onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                                  placeholder="JavaScript"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`skillCategory-${skill.id}`}>Category</Label>
                                <Select
                                  value={skill.category}
                                  onValueChange={(value) => updateSkill(skill.id, "category", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Technical">Technical</SelectItem>
                                    <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                                    <SelectItem value="Tools">Tools</SelectItem>
                                    <SelectItem value="Frameworks">Frameworks</SelectItem>
                                    <SelectItem value="Languages">Languages</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor={`skillLevel-${skill.id}`}>Level</Label>
                                <Select
                                  value={skill.level}
                                  onValueChange={(value) => updateSkill(skill.id, "level", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                    <SelectItem value="Expert">Expert</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === "projects" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gradient">Projects</h2>
                      <Button onClick={addProject} className="bg-gradient-brand">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                    {(resumeData.projects || []).map((project, index) => (
                      <Card key={project.id} className="border-2 border-brand-200">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold">Project #{index + 1}</h3>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeProject(project.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`projectName-${project.id}`}>Project Name</Label>
                              <Input
                                id={`projectName-${project.id}`}
                                value={project.name}
                                onChange={(e) => updateProject(project.id, "name", e.target.value)}
                                placeholder="E-commerce Platform"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`projectDescription-${project.id}`}>Description</Label>
                              <Textarea
                                id={`projectDescription-${project.id}`}
                                value={project.description}
                                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                                placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and inventory management..."
                                rows={3}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`projectTech-${project.id}`}>Technologies (comma-separated)</Label>
                              <Input
                                id={`projectTech-${project.id}`}
                                value={project.technologies.join(", ")}
                                onChange={(e) => updateProject(project.id, "technologies", e.target.value.split(", ").filter(Boolean))}
                                placeholder="React, Node.js, MongoDB, Stripe"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`projectLink-${project.id}`}>Project Link (Optional)</Label>
                              <Input
                                id={`projectLink-${project.id}`}
                                value={project.link || ""}
                                onChange={(e) => updateProject(project.id, "link", e.target.value)}
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
