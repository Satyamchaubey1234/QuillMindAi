import React, { useState, useRef } from 'react';
import QuestionGenerator from './components/QuestionGenerator';
import ResumeBuilder from './components/ResumeBuilder';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Brain, 
  FileText, 
  Award,
  ChevronDown,
  Upload,
  Download,
  Sparkles,
  Zap,
  X,
  CheckCircle,
  Plus,
  Minus,
  Eye,
  Save
} from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  gpa?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
}

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50"></div>
        <div className="relative z-10 text-center text-black px-4 max-w-4xl mx-auto">
          <div className="mb-8 animate-fadeIn">
            <div className="text-6xl md:text-8xl font-bold mb-4 flex flex-wrap justify-center items-center gap-4 overflow-hidden">
              <span className="text-black animate-slideInLeft inline-block transform hover:scale-110 transition-transform duration-300">
                Hello!
              </span>
              <span className="text-6xl md:text-8xl animate-slideInRight inline-block">🤖</span>
            </div>
            <div className="text-3xl md:text-4xl font-semibold mb-4 flex flex-wrap justify-center items-center gap-3 overflow-hidden">
              <span className="text-gray-800 animate-slideInUp inline-block transform hover:scale-105 transition-all duration-300 animation-delay-500">
                Welcome
              </span>
              <span className="text-gray-600 animate-slideInUp inline-block transform hover:scale-105 transition-all duration-300 animation-delay-700">
                to
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slideInUp animation-delay-1000">
            <span className="text-black">
              QuillMind AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 animate-slideInUp animation-delay-1200">
            Intelligent Document Processing & ATS-Friendly Resume Building Platform
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-2xl mx-auto animate-slideInUp animation-delay-1400">
            Transform your documents with ML-powered question generation and create ATS-optimized professional resumes
          </p>
          
          {/* Feature Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-slideInUp animation-delay-1600">
            <button 
              onClick={() => document.getElementById('question-generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black hover:bg-gray-800 px-8 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <Brain className="w-6 h-6" />
              <span>Try ML Question Generator</span>
            </button>
            <button 
              onClick={() => document.getElementById('resume-builder')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gray-800 hover:bg-black px-8 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <FileText className="w-6 h-6" />
              <span>Build ATS Resume</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-600 mb-8 animate-slideInUp animation-delay-1800">
            Created by <span className="font-semibold text-black">Satyam Chaubey</span> - AI/ML Engineer
          </div>
          
          <div className="flex justify-center space-x-6 mb-12 animate-slideInUp animation-delay-2000">
            <a 
              href="https://github.com/Satyamchaubey1234" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
            >
              <Github className="w-6 h-6 text-black" />
            </a>
            <a 
              href="https://www.linkedin.com/in/satyam-chaubey-a3b647271/" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
            >
              <Linkedin className="w-6 h-6 text-black" />
            </a>
            <a 
              href="mailto:satyamchaubeysns@gmail.com"
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
            >
              <Mail className="w-6 h-6 text-black" />
            </a>
          </div>
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-gray-600" />
          </div>
        </div>
      </section>

      {/* Live Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              🚀 Advanced AI Features
            </h2>
            <p className="text-xl text-gray-700">
              Experience cutting-edge ML-powered document processing and ATS-optimized resume building
            </p>
            <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enhanced ML Question Generator */}
            <div id="question-generator">
              <QuestionGenerator />
            </div>

            {/* Enhanced ATS-Friendly Resume Builder */}
            <div id="resume-builder">
              <ResumeBuilder />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              About the Developer
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-2xl font-semibold text-black mb-4">
                  Satyam Chaubey
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-black" />
                    <span className="text-gray-700">B.Tech in Artificial Intelligence & Machine Learning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-black" />
                    <span className="text-gray-700">Creator of QuillMind AI Platform</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="mailto:satyamchaubeysns@gmail.com"
                  className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
                >
                  <Mail className="w-5 h-5 text-black" />
                  <span className="text-gray-700">satyamchaubeysns@gmail.com</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/satyam-chaubey-a3b647271/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
                >
                  <Linkedin className="w-5 h-5 text-black" />
                  <span className="text-gray-700">LinkedIn Profile</span>
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </a>
                <a 
                  href="https://github.com/Satyamchaubey1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
                >
                  <Github className="w-5 h-5 text-black" />
                  <span className="text-gray-700">GitHub Profile</span>
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </a>
              </div>
            </div>
            
            <div className="bg-black p-8 rounded-2xl text-white">
              <h4 className="text-xl font-semibold mb-4 text-white">About QuillMind AI</h4>
              <p className="text-gray-200 leading-relaxed">
                QuillMind AI represents the cutting-edge fusion of machine learning and 
                practical document processing. Built with advanced neural networks, NLP 
                technologies, and ATS optimization algorithms, this platform transforms 
                how we interact with documents and create professional content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Platform Features
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* ML Document Analysis Project */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-8 h-8 text-black" />
                  <h3 className="text-2xl font-semibold text-black">
                    ML Document Question Generator
                  </h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Advanced AI system powered by neural networks that analyzes uploaded documents 
                  using machine learning and generates contextually relevant questions automatically. 
                  Features deep learning models, NLP processing, and intelligent content understanding.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">Python</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">Neural Networks</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">Flask</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">NLP</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">TensorFlow</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => document.getElementById('question-generator')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    <span>Try ML Generator</span>
                  </button>
                  <a 
                    href="https://github.com/Satyamchaubey1234"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ATS Resume Builder Project */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="w-8 h-8 text-black" />
                  <h3 className="text-2xl font-semibold text-black">
                    ATS-Optimized Resume Builder
                  </h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Comprehensive resume builder with AI-driven content suggestions and 
                  ATS optimization. Features keyword optimization, professional template 
                  generation, real-time editing, and intelligent formatting for maximum 
                  applicant tracking system compatibility.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">Python</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">FastAPI</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">JavaScript</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">React</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">ATS Optimization</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => document.getElementById('resume-builder')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    <span>Build ATS Resume</span>
                  </button>
                  <a 
                    href="https://github.com/Satyamchaubey1234"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">AI/ML</h3>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">Python</span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm ml-2 border">Neural Networks</span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">NLP</span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm ml-2 border">TensorFlow</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Backend</h3>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">Flask</span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm ml-2 border">FastAPI</span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">Python</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Frontend</h3>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">React</span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm ml-2 border">TypeScript</span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border">JavaScript</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 text-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Experience QuillMind AI?
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Get started with ML-powered document processing and ATS-optimized resume building today
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="mailto:satyamchaubeysns@gmail.com"
              className="flex items-center space-x-3 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Developer</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/satyam-chaubey-a3b647271/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gray-800 hover:bg-black text-white px-8 py-4 rounded-lg transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/Satyamchaubey1234"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300 border border-gray-300"
            >
              <Github className="w-6 h-6 text-black" />
            </a>
            <a 
              href="https://www.linkedin.com/in/satyam-chaubey-a3b647271/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300 border border-gray-300"
            >
              <Linkedin className="w-6 h-6 text-black" />
            </a>
            <a 
              href="mailto:satyamchaubeysns@gmail.com"
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300 border border-gray-300"
            >
              <Mail className="w-6 h-6 text-black" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 QuillMind AI by Satyam Chaubey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;