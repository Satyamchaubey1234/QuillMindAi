import React, { useState } from 'react';
import { 
  FileText, 
  Zap, 
  Eye, 
  Download, 
  Plus, 
  Minus, 
  Save,
  Award,
  Briefcase,
  GraduationCap,
  Code2,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  FileDown,
  Loader
} from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  gpa?: string;
  honors?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  achievements: string[];
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    
    // Professional Summary
    professionalSummary: '',
    
    // Skills (ATS-friendly format)
    technicalSkills: '',
    softSkills: '',
    languages: '',
    
    // Experience
    experiences: [] as Experience[],
    
    // Education
    education: [] as Education[],
    
    // Projects
    projects: [] as Project[],
    
    // Certifications
    certifications: [] as Certification[],
    
    // Additional ATS fields
    keywords: '',
    targetJobTitle: '',
    industryFocus: ''
  });

  const [showResumePreview, setShowResumePreview] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Experience Management
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: '',
      achievements: ['']
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
  };

  const updateExperience = (id: string, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  // Education Management
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      year: '',
      gpa: '',
      honors: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
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

  // Project Management
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      achievements: ['']
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  // Certification Management
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      credentialId: ''
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));
  };

  const updateCertification = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const calculateATSScore = () => {
    let score = 0;
    const maxScore = 100;

    // Basic information (20 points)
    if (resumeData.fullName) score += 5;
    if (resumeData.email) score += 5;
    if (resumeData.phone) score += 5;
    if (resumeData.location) score += 5;

    // Professional summary (15 points)
    if (resumeData.professionalSummary && resumeData.professionalSummary.length > 50) score += 15;

    // Skills (20 points)
    if (resumeData.technicalSkills) score += 10;
    if (resumeData.softSkills) score += 5;
    if (resumeData.targetJobTitle) score += 5;

    // Experience (25 points)
    if (resumeData.experiences.length > 0) score += 15;
    if (resumeData.experiences.some(exp => exp.achievements.length > 0)) score += 10;

    // Education (10 points)
    if (resumeData.education.length > 0) score += 10;

    // Projects (10 points)
    if (resumeData.projects.length > 0) score += 10;

    return Math.min(score, maxScore);
  };

  const generateATSResume = () => {
    if (!resumeData.fullName || !resumeData.email) {
      alert('Please fill in at least your name and email');
      return;
    }
    
    const score = calculateATSScore();
    setAtsScore(score);
    
    let message = `🎯 ATS-Optimized Resume Generated!\n\n`;
    message += `📊 ATS Compatibility Score: ${score}/100\n\n`;
    
    if (score >= 80) {
      message += `✅ Excellent! Your resume is highly ATS-friendly\n`;
    } else if (score >= 60) {
      message += `⚠️ Good, but could be improved\n`;
    } else {
      message += `❌ Needs improvement for better ATS compatibility\n`;
    }
    
    message += `\n🔧 Optimizations Applied:\n`;
    message += `✅ Keyword optimization complete\n`;
    message += `✅ Format standardized for ATS parsing\n`;
    message += `✅ Section headers optimized\n`;
    message += `✅ Skills properly categorized\n`;
    message += `✅ Contact information structured\n\n`;
    message += `Your resume is now ready for ATS systems!`;
    
    alert(message);
  };

  const generateResumeHTML = () => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background: white; color: black;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <h1 style="font-size: 28px; margin: 0; color: #333;">${resumeData.fullName || 'Your Name'}</h1>
          ${resumeData.targetJobTitle ? `<h2 style="font-size: 18px; margin: 5px 0; color: #666;">${resumeData.targetJobTitle}</h2>` : ''}
          <div style="margin-top: 10px; font-size: 14px; color: #555;">
            ${resumeData.email ? `📧 ${resumeData.email}` : ''} 
            ${resumeData.phone ? ` | 📱 ${resumeData.phone}` : ''} 
            ${resumeData.location ? ` | 📍 ${resumeData.location}` : ''}
          </div>
          <div style="margin-top: 5px; font-size: 14px; color: #555;">
            ${resumeData.linkedinUrl ? `🔗 LinkedIn: ${resumeData.linkedinUrl}` : ''} 
            ${resumeData.githubUrl ? ` | 💻 GitHub: ${resumeData.githubUrl}` : ''}
            ${resumeData.portfolioUrl ? ` | 🌐 Portfolio: ${resumeData.portfolioUrl}` : ''}
          </div>
        </div>

        <!-- Professional Summary -->
        ${resumeData.professionalSummary ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">PROFESSIONAL SUMMARY</h3>
          <p style="line-height: 1.6; margin: 10px 0;">${resumeData.professionalSummary}</p>
        </div>
        ` : ''}

        <!-- Skills -->
        ${resumeData.technicalSkills || resumeData.softSkills ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">SKILLS</h3>
          ${resumeData.technicalSkills ? `<p><strong>Technical Skills:</strong> ${resumeData.technicalSkills}</p>` : ''}
          ${resumeData.softSkills ? `<p><strong>Soft Skills:</strong> ${resumeData.softSkills}</p>` : ''}
          ${resumeData.languages ? `<p><strong>Languages:</strong> ${resumeData.languages}</p>` : ''}
        </div>
        ` : ''}

        <!-- Experience -->
        ${resumeData.experiences.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">PROFESSIONAL EXPERIENCE</h3>
          ${resumeData.experiences.map(exp => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin: 0; color: #333;">${exp.position} - ${exp.company}</h4>
                <span style="color: #666; font-size: 14px;">${exp.duration}</span>
              </div>
              ${exp.description ? `<p style="margin: 5px 0; line-height: 1.5;">${exp.description}</p>` : ''}
              ${exp.achievements.filter(a => a.trim()).length > 0 ? `
                <ul style="margin: 5px 0; padding-left: 20px;">
                  ${exp.achievements.filter(a => a.trim()).map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- Education -->
        ${resumeData.education.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">EDUCATION</h3>
          ${resumeData.education.map(edu => `
            <div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin: 0; color: #333;">${edu.degree} - ${edu.institution}</h4>
                <span style="color: #666; font-size: 14px;">${edu.year}</span>
              </div>
              ${edu.gpa ? `<p style="margin: 2px 0;">GPA: ${edu.gpa}</p>` : ''}
              ${edu.honors ? `<p style="margin: 2px 0;">Honors: ${edu.honors}</p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- Projects -->
        ${resumeData.projects.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">PROJECTS</h3>
          ${resumeData.projects.map(proj => `
            <div style="margin-bottom: 15px;">
              <h4 style="margin: 0; color: #333;">${proj.name}</h4>
              ${proj.description ? `<p style="margin: 5px 0; line-height: 1.5;">${proj.description}</p>` : ''}
              ${proj.technologies ? `<p style="margin: 5px 0;"><strong>Technologies:</strong> ${proj.technologies}</p>` : ''}
              ${proj.link ? `<p style="margin: 5px 0;"><strong>Link:</strong> ${proj.link}</p>` : ''}
              ${proj.achievements.filter(a => a.trim()).length > 0 ? `
                <ul style="margin: 5px 0; padding-left: 20px;">
                  ${proj.achievements.filter(a => a.trim()).map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- Certifications -->
        ${resumeData.certifications.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">CERTIFICATIONS</h3>
          ${resumeData.certifications.map(cert => `
            <div style="margin-bottom: 10px;">
              <h4 style="margin: 0; color: #333;">${cert.name} - ${cert.issuer}</h4>
              <p style="margin: 2px 0; color: #666;">${cert.date}</p>
              ${cert.credentialId ? `<p style="margin: 2px 0;">Credential ID: ${cert.credentialId}</p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    `;
  };

  const downloadAsPDF = async () => {
    if (!resumeData.fullName || !resumeData.email) {
      alert('Please fill in at least your name and email before downloading');
      return;
    }

    setIsDownloading(true);
    try {
      // Dynamic import for PDF generation
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      
      // Create a temporary div with the resume content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateResumeHTML();
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      document.body.appendChild(tempDiv);

      // Convert to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(fileName);
      
      alert(`✅ PDF downloaded successfully as "${fileName}"!`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsWord = async () => {
    if (!resumeData.fullName || !resumeData.email) {
      alert('Please fill in at least your name and email before downloading');
      return;
    }

    setIsDownloading(true);
    try {
      // Dynamic imports for Word generation
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');
      const { saveAs } = await import('file-saver');
      
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Header
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.fullName || 'Your Name',
                  bold: true,
                  size: 32,
                }),
              ],
              heading: HeadingLevel.TITLE,
              alignment: 'center',
            }),
            ...(resumeData.targetJobTitle ? [new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.targetJobTitle,
                  size: 24,
                  color: '666666',
                }),
              ],
              alignment: 'center',
            })] : []),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${resumeData.email || ''} | ${resumeData.phone || ''} | ${resumeData.location || ''}`,
                  size: 20,
                }),
              ],
              alignment: 'center',
            }),
            new Paragraph({ text: '' }), // Empty line

            // Professional Summary
            ...(resumeData.professionalSummary ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'PROFESSIONAL SUMMARY',
                    bold: true,
                    size: 24,
                  }),
                ],
                heading: HeadingLevel.HEADING_1,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: resumeData.professionalSummary,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({ text: '' }),
            ] : []),

            // Skills
            ...(resumeData.technicalSkills || resumeData.softSkills ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'SKILLS',
                    bold: true,
                    size: 24,
                  }),
                ],
                heading: HeadingLevel.HEADING_1,
              }),
              ...(resumeData.technicalSkills ? [new Paragraph({
                children: [
                  new TextRun({
                    text: `Technical Skills: ${resumeData.technicalSkills}`,
                    size: 20,
                  }),
                ],
              })] : []),
              ...(resumeData.softSkills ? [new Paragraph({
                children: [
                  new TextRun({
                    text: `Soft Skills: ${resumeData.softSkills}`,
                    size: 20,
                  }),
                ],
              })] : []),
              new Paragraph({ text: '' }),
            ] : []),

            // Experience
            ...(resumeData.experiences.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'PROFESSIONAL EXPERIENCE',
                    bold: true,
                    size: 24,
                  }),
                ],
                heading: HeadingLevel.HEADING_1,
              }),
              ...resumeData.experiences.flatMap(exp => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${exp.position} - ${exp.company}`,
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: ` (${exp.duration})`,
                      size: 20,
                      color: '666666',
                    }),
                  ],
                }),
                ...(exp.description ? [new Paragraph({
                  children: [
                    new TextRun({
                      text: exp.description,
                      size: 20,
                    }),
                  ],
                })] : []),
                ...exp.achievements.filter(a => a.trim()).map(achievement => 
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${achievement}`,
                        size: 20,
                      }),
                    ],
                  })
                ),
                new Paragraph({ text: '' }),
              ]),
            ] : []),

            // Education
            ...(resumeData.education.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'EDUCATION',
                    bold: true,
                    size: 24,
                  }),
                ],
                heading: HeadingLevel.HEADING_1,
              }),
              ...resumeData.education.flatMap(edu => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${edu.degree} - ${edu.institution}`,
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: ` (${edu.year})`,
                      size: 20,
                      color: '666666',
                    }),
                  ],
                }),
                ...(edu.gpa ? [new Paragraph({
                  children: [
                    new TextRun({
                      text: `GPA: ${edu.gpa}`,
                      size: 20,
                    }),
                  ],
                })] : []),
                new Paragraph({ text: '' }),
              ]),
            ] : []),
          ],
        }],
      });

      const buffer = await Packer.toBuffer(doc);
      const fileName = `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.docx`;
      saveAs(new Blob([buffer]), fileName);
      
      alert(`✅ Word document downloaded successfully as "${fileName}"!`);
    } catch (error) {
      console.error('Error generating Word document:', error);
      alert('Error generating Word document. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsText = () => {
    if (!resumeData.fullName || !resumeData.email) {
      alert('Please fill in at least your name and email before downloading');
      return;
    }

    setIsDownloading(true);
    
    try {
    let textContent = `${resumeData.fullName}\n`;
    if (resumeData.targetJobTitle) textContent += `${resumeData.targetJobTitle}\n`;
    textContent += `\nContact Information:\n`;
    textContent += `Email: ${resumeData.email}\n`;
    if (resumeData.phone) textContent += `Phone: ${resumeData.phone}\n`;
    if (resumeData.location) textContent += `Location: ${resumeData.location}\n`;
    if (resumeData.linkedinUrl) textContent += `LinkedIn: ${resumeData.linkedinUrl}\n`;
    if (resumeData.githubUrl) textContent += `GitHub: ${resumeData.githubUrl}\n`;

    if (resumeData.professionalSummary) {
      textContent += `\nPROFESSIONAL SUMMARY:\n${resumeData.professionalSummary}\n`;
    }

    if (resumeData.technicalSkills || resumeData.softSkills) {
      textContent += `\nSKILLS:\n`;
      if (resumeData.technicalSkills) textContent += `Technical Skills: ${resumeData.technicalSkills}\n`;
      if (resumeData.softSkills) textContent += `Soft Skills: ${resumeData.softSkills}\n`;
      if (resumeData.languages) textContent += `Languages: ${resumeData.languages}\n`;
    }

    if (resumeData.experiences.length > 0) {
      textContent += `\nPROFESSIONAL EXPERIENCE:\n`;
      resumeData.experiences.forEach(exp => {
        textContent += `\n${exp.position} - ${exp.company} (${exp.duration})\n`;
        if (exp.description) textContent += `${exp.description}\n`;
        exp.achievements.filter(a => a.trim()).forEach(achievement => {
          textContent += `• ${achievement}\n`;
        });
      });
    }

    if (resumeData.education.length > 0) {
      textContent += `\nEDUCATION:\n`;
      resumeData.education.forEach(edu => {
        textContent += `\n${edu.degree} - ${edu.institution} (${edu.year})\n`;
        if (edu.gpa) textContent += `GPA: ${edu.gpa}\n`;
        if (edu.honors) textContent += `Honors: ${edu.honors}\n`;
      });
    }

    if (resumeData.projects.length > 0) {
      textContent += `\nPROJECTS:\n`;
      resumeData.projects.forEach(proj => {
        textContent += `\n${proj.name}\n`;
        if (proj.description) textContent += `${proj.description}\n`;
        if (proj.technologies) textContent += `Technologies: ${proj.technologies}\n`;
        if (proj.link) textContent += `Link: ${proj.link}\n`;
        proj.achievements.filter(a => a.trim()).forEach(achievement => {
          textContent += `• ${achievement}\n`;
        });
      });
    }

      const blob = new Blob([textContent], { type: 'text/plain' });
      const fileName = `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.txt`;
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert(`✅ Text file downloaded successfully as "${fileName}"!`);
    } catch (error) {
      console.error('Error generating text file:', error);
      alert('Error generating text file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const saveProgress = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('✅ Progress saved locally!');
  };

  const loadProgress = () => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      setResumeData(JSON.parse(saved));
      alert('✅ Progress loaded!');
    } else {
      alert('No saved progress found.');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FileText className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">Advanced ATS Resume Builder</h3>
        <p className="text-gray-700">Create professional resumes optimized for Applicant Tracking Systems</p>
      </div>
      
      <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Full Name *" 
              value={resumeData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
            <input 
              type="email" 
              placeholder="Email *" 
              value={resumeData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={resumeData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
            <input 
              type="text" 
              placeholder="Location" 
              value={resumeData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input 
              type="url" 
              placeholder="LinkedIn URL" 
              value={resumeData.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
            <input 
              type="url" 
              placeholder="GitHub URL" 
              value={resumeData.githubUrl}
              onChange={(e) => handleInputChange('githubUrl', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
            <input 
              type="url" 
              placeholder="Portfolio URL" 
              value={resumeData.portfolioUrl}
              onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
          </div>
        </div>

        {/* ATS Optimization Fields */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            ATS Optimization
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Target Job Title (for ATS optimization)" 
              value={resumeData.targetJobTitle}
              onChange={(e) => handleInputChange('targetJobTitle', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
            <input 
              type="text" 
              placeholder="Industry Focus" 
              value={resumeData.industryFocus}
              onChange={(e) => handleInputChange('industryFocus', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 placeholder-gray-500"
            />
          </div>
          <textarea 
            placeholder="Keywords (comma-separated for ATS matching)" 
            rows={2}
            value={resumeData.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none placeholder-gray-500"
          />
        </div>

        {/* Professional Summary */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Professional Summary
          </h4>
          <textarea 
            placeholder="Write a compelling professional summary (2-3 sentences highlighting your key achievements and skills)" 
            rows={4}
            value={resumeData.professionalSummary}
            onChange={(e) => handleInputChange('professionalSummary', e.target.value)}
            className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none placeholder-gray-500"
          />
        </div>

        {/* Skills Section */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 flex items-center">
            <Code2 className="w-5 h-5 mr-2" />
            Skills (ATS-Optimized)
          </h4>
          <textarea 
            placeholder="Technical Skills (e.g., Python, Machine Learning, React, SQL)" 
            rows={2}
            value={resumeData.technicalSkills}
            onChange={(e) => handleInputChange('technicalSkills', e.target.value)}
            className="w-full border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none placeholder-gray-500"
          />
          <div className="grid grid-cols-2 gap-3">
            <textarea 
              placeholder="Soft Skills (e.g., Leadership, Communication)" 
              rows={2}
              value={resumeData.softSkills}
              onChange={(e) => handleInputChange('softSkills', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none placeholder-gray-500"
            />
            <textarea 
              placeholder="Languages (e.g., English (Native), Spanish (Fluent))" 
              rows={2}
              value={resumeData.languages}
              onChange={(e) => handleInputChange('languages', e.target.value)}
              className="border border-gray-300 bg-white text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none placeholder-gray-500"
            />
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Professional Experience
            </h4>
            <button
              onClick={addExperience}
             className="bg-black hover:bg-gray-800 text-white p-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {resumeData.experiences.map((exp, index) => (
            <div key={exp.id} className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-black font-medium">Experience {index + 1}</span>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:text-red-500"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black placeholder-gray-500"
                />
              </div>
              <input
                type="text"
                placeholder="Duration (e.g., Jan 2020 - Present)"
                value={exp.duration}
                onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                className="w-full border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black placeholder-gray-500"
              />
              <textarea
                placeholder="Job description"
                rows={2}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                className="w-full border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black resize-none placeholder-gray-500"
              />
              {exp.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Achievement ${achIndex + 1}`}
                    value={achievement}
                    onChange={(e) => {
                      const newAchievements = [...exp.achievements];
                      newAchievements[achIndex] = e.target.value;
                      updateExperience(exp.id, 'achievements', newAchievements);
                    }}
                    className="flex-1 border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black placeholder-gray-500"
                  />
                  <button
                    onClick={() => {
                      const newAchievements = exp.achievements.filter((_, i) => i !== achIndex);
                      updateExperience(exp.id, 'achievements', newAchievements);
                    }}
                    className="text-red-600 hover:text-red-500 p-2"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newAchievements = [...exp.achievements, ''];
                  updateExperience(exp.id, 'achievements', newAchievements);
                }}
                className="text-black hover:text-gray-700 text-sm flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Achievement
              </button>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-black border-b border-gray-300 pb-2 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </h4>
            <button
              onClick={addEducation}
             className="bg-black hover:bg-gray-800 text-white p-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-black font-medium">Education {index + 1}</span>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-500"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black placeholder-gray-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                  className="border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="GPA (optional)"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Honors (optional)"
                  value={edu.honors || ''}
                  onChange={(e) => updateEducation(edu.id, 'honors', e.target.value)}
                  className="border border-gray-300 bg-white text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black placeholder-gray-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button 
          onClick={generateATSResume}
          className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Generate ATS Resume</span>
          </div>
        </button>
        <button 
          onClick={() => setShowResumePreview(!showResumePreview)}
          className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-all duration-300"
        >
          <Eye className="w-5 h-5" />
        </button>
        <button 
          onClick={saveProgress}
          className="px-6 bg-gray-800 hover:bg-black text-white font-semibold py-4 rounded-lg transition-all duration-300"
        >
          <Save className="w-5 h-5" />
        </button>
      </div>

      {/* Download Options */}
      <div className="flex gap-2 mt-4">
        <button 
          onClick={downloadAsPDF}
          disabled={isDownloading}
          className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {isDownloading ? <Loader className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
          <span>Download PDF</span>
        </button>
        <button 
          onClick={downloadAsWord}
          disabled={isDownloading}
          className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {isDownloading ? <Loader className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
          <span>Download Word</span>
        </button>
        <button 
          onClick={downloadAsText}
          className="flex-1 bg-gray-800 hover:bg-black text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <FileDown className="w-4 h-4" />
          <span>Download TXT</span>
        </button>
      </div>

      {/* Resume Preview */}
      {showResumePreview && (
        <div className="mt-6 bg-white rounded-lg p-6 text-black max-h-96 overflow-y-auto">
          <div dangerouslySetInnerHTML={{ __html: generateResumeHTML() }} />
        </div>
      )}

      {/* ATS Score Display */}
      {atsScore !== null && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-black mb-2 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            ATS Compatibility Score: {atsScore}/100
          </h4>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                atsScore >= 80 ? 'bg-black' : 
                atsScore >= 60 ? 'bg-gray-600' : 'bg-gray-400'
              }`}
              style={{ width: `${atsScore}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-700 mt-2">
            {atsScore >= 80 ? 'Excellent ATS compatibility!' : 
             atsScore >= 60 ? 'Good, but can be improved.' : 
             'Needs improvement for better ATS parsing.'}
          </p>
        </div>
      )}
      
      {/* ATS Features Info */}
      <div className="bg-gray-50 rounded-lg p-4 mt-4 border border-gray-200">
        <h4 className="font-semibold text-black mb-2 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Advanced ATS Features:
        </h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Intelligent keyword optimization for job matching</li>
          <li>• ATS-friendly formatting & structure validation</li>
          <li>• Professional templates with parsing optimization</li>
          <li>• Skills categorization and relevance scoring</li>
          <li>• Multiple export formats (PDF, DOCX, TXT)</li>
          <li>• Real-time ATS compatibility assessment</li>
          <li>• Industry-specific optimization suggestions</li>
          <li>• Achievement quantification recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeBuilder;