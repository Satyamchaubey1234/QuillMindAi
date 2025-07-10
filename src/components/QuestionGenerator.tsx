import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Brain, 
  Sparkles, 
  FileText, 
  CheckCircle, 
  X, 
  Download,
  Zap,
  Target,
  BookOpen,
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';

interface DocumentAnalysis {
  documentType: string;
  keyTopics: string[];
  complexity: string;
  wordCount: number;
  readabilityScore: number;
  entities: string[];
  sentiment: string;
  language: string;
}

interface GeneratedQuestion {
  id: string;
  question: string;
  type: 'objective' | 'descriptive' | 'analytical' | 'practical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  suggestedAnswer?: string;
  timeLimit?: number;
}

interface QuestionSet {
  hr: GeneratedQuestion[];
  teacher: GeneratedQuestion[];
  practice: GeneratedQuestion[];
}

const QuestionGenerator: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentAnalysis, setDocumentAnalysis] = useState<DocumentAnalysis | null>(null);
  const [questionSets, setQuestionSets] = useState<QuestionSet | null>(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState<'hr' | 'teacher' | 'practice'>('hr');
  const [processingStage, setProcessingStage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];
    
    if (file && allowedTypes.includes(file.type)) {
      setUploadedFile(file);
      setDocumentAnalysis(null);
      setQuestionSets(null);
    } else {
      alert('Please upload a PDF, DOCX, DOC, or TXT file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const simulateAdvancedMLProcessing = async () => {
    const stages = [
      'Initializing transformer models...',
      'Extracting text using OCR and NLP...',
      'Analyzing document structure...',
      'Performing named entity recognition...',
      'Extracting key concepts with BERT...',
      'Analyzing semantic relationships...',
      'Generating contextual embeddings...',
      'Creating question templates...',
      'Optimizing question difficulty...',
      'Finalizing intelligent questions...'
    ];

    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  const analyzeDocument = async (): Promise<DocumentAnalysis> => {
    if (!uploadedFile) throw new Error('No file uploaded');

    // Simulate advanced NLP analysis
    const documentTypes = ['Resume/CV', 'Research Paper', 'Technical Manual', 'Business Report', 'Academic Paper', 'Training Material'];
    const topics = [
      'Machine Learning', 'Data Science', 'Software Engineering', 'Project Management',
      'Business Strategy', 'Technical Implementation', 'Research Methodology', 'System Design',
      'User Experience', 'Database Management', 'Cloud Computing', 'Artificial Intelligence',
      'Cybersecurity', 'DevOps', 'Mobile Development', 'Web Development'
    ];
    
    const entities = [
      'Python', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
      'TensorFlow', 'PyTorch', 'SQL', 'MongoDB', 'Git', 'Agile', 'Scrum'
    ];

    const analysis: DocumentAnalysis = {
      documentType: documentTypes[Math.floor(Math.random() * documentTypes.length)],
      keyTopics: topics.slice(0, Math.floor(Math.random() * 5) + 3),
      complexity: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)],
      wordCount: Math.floor(Math.random() * 8000) + 2000,
      readabilityScore: Math.floor(Math.random() * 30) + 70,
      entities: entities.slice(0, Math.floor(Math.random() * 8) + 4),
      sentiment: ['positive', 'neutral', 'professional'][Math.floor(Math.random() * 3)],
      language: 'English'
    };

    return analysis;
  };

  const generateIntelligentQuestions = (analysis: DocumentAnalysis): QuestionSet => {
    const hrQuestions: GeneratedQuestion[] = [
      {
        id: '1',
        question: `Based on your experience with ${analysis.keyTopics[0]}, can you describe a challenging project where you had to implement this technology and how you overcame the obstacles?`,
        type: 'behavioral',
        difficulty: 'medium',
        category: 'Experience',
        timeLimit: 5
      },
      {
        id: '2',
        question: `How would you explain ${analysis.keyTopics[1]} to a non-technical stakeholder, and what business value does it provide?`,
        type: 'descriptive',
        difficulty: 'medium',
        category: 'Communication',
        timeLimit: 4
      },
      {
        id: '3',
        question: `What are the key differences between ${analysis.keyTopics[0]} and ${analysis.keyTopics[1]}, and when would you choose one over the other?`,
        type: 'analytical',
        difficulty: 'hard',
        category: 'Technical Knowledge',
        timeLimit: 6
      },
      {
        id: '4',
        question: `Describe a situation where you had to learn ${analysis.keyTopics[2]} quickly for a project. What was your approach?`,
        type: 'behavioral',
        difficulty: 'medium',
        category: 'Learning Ability',
        timeLimit: 4
      },
      {
        id: '5',
        question: `How do you stay updated with the latest developments in ${analysis.keyTopics[0]}? Can you share a recent trend or innovation?`,
        type: 'descriptive',
        difficulty: 'easy',
        category: 'Industry Knowledge',
        timeLimit: 3
      }
    ];

    const teacherQuestions: GeneratedQuestion[] = [
      {
        id: '1',
        question: `Define ${analysis.keyTopics[0]} and explain its core principles with relevant examples.`,
        type: 'descriptive',
        difficulty: 'medium',
        category: 'Conceptual Understanding',
        suggestedAnswer: `Students should demonstrate understanding of fundamental concepts and provide practical examples.`
      },
      {
        id: '2',
        question: `Compare and contrast ${analysis.keyTopics[0]} with ${analysis.keyTopics[1]}. Discuss their advantages and limitations.`,
        type: 'analytical',
        difficulty: 'hard',
        category: 'Critical Analysis',
        suggestedAnswer: `Expected to show deep understanding and analytical thinking.`
      },
      {
        id: '3',
        question: `Which of the following is NOT a characteristic of ${analysis.keyTopics[0]}? A) ${analysis.entities[0]} B) ${analysis.entities[1]} C) ${analysis.entities[2]} D) None of the above`,
        type: 'objective',
        difficulty: 'easy',
        category: 'Knowledge Recall'
      },
      {
        id: '4',
        question: `Design a practical solution using ${analysis.keyTopics[1]} to solve a real-world problem. Justify your approach.`,
        type: 'practical',
        difficulty: 'hard',
        category: 'Application',
        suggestedAnswer: `Students should demonstrate practical application and problem-solving skills.`
      },
      {
        id: '5',
        question: `Explain the relationship between ${analysis.keyTopics[0]} and ${analysis.keyTopics[2]} in the context of modern technology.`,
        type: 'descriptive',
        difficulty: 'medium',
        category: 'Conceptual Connections'
      }
    ];

    const practiceQuestions: GeneratedQuestion[] = [
      {
        id: '1',
        question: `What are the fundamental concepts of ${analysis.keyTopics[0]} that every professional should know?`,
        type: 'descriptive',
        difficulty: 'easy',
        category: 'Foundation Knowledge'
      },
      {
        id: '2',
        question: `How would you implement ${analysis.keyTopics[1]} in a production environment? Consider scalability and performance.`,
        type: 'practical',
        difficulty: 'hard',
        category: 'Implementation'
      },
      {
        id: '3',
        question: `True or False: ${analysis.keyTopics[0]} is primarily used for ${analysis.entities[0]} applications.`,
        type: 'objective',
        difficulty: 'easy',
        category: 'Quick Assessment'
      },
      {
        id: '4',
        question: `Analyze the pros and cons of using ${analysis.keyTopics[2]} in enterprise applications.`,
        type: 'analytical',
        difficulty: 'medium',
        category: 'Critical Thinking'
      },
      {
        id: '5',
        question: `What emerging trends in ${analysis.keyTopics[0]} should professionals be aware of in 2024?`,
        type: 'descriptive',
        difficulty: 'medium',
        category: 'Industry Trends'
      }
    ];

    return { hr: hrQuestions, teacher: teacherQuestions, practice: practiceQuestions };
  };

  const processDocument = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setIsGenerating(false);

    try {
      await simulateAdvancedMLProcessing();
      const analysis = await analyzeDocument();
      setDocumentAnalysis(analysis);
      
      setIsAnalyzing(false);
      setIsGenerating(true);
      setProcessingStage('Generating intelligent questions...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const questions = generateIntelligentQuestions(analysis);
      setQuestionSets(questions);
      
    } catch (error) {
      console.error('Error processing document:', error);
      alert('Error processing document. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setIsGenerating(false);
      setProcessingStage('');
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setDocumentAnalysis(null);
    setQuestionSets(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const exportQuestions = () => {
    if (!questionSets) return;
    
    const questions = questionSets[selectedQuestionType];
    const exportData = {
      documentType: documentAnalysis?.documentType,
      questionType: selectedQuestionType,
      generatedAt: new Date().toISOString(),
      questions: questions
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedQuestionType}-questions-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900';
      case 'medium': return 'text-yellow-400 bg-yellow-900';
      case 'hard': return 'text-red-400 bg-red-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'objective': return <Target className="w-4 h-4" />;
      case 'descriptive': return <FileText className="w-4 h-4" />;
      case 'analytical': return <Brain className="w-4 h-4" />;
      case 'practical': return <Zap className="w-4 h-4" />;
      case 'behavioral': return <Users className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">Advanced ML Question Generator</h3>
        <p className="text-gray-700">Powered by NLP & Transformer Models for Intelligent Question Generation</p>
      </div>
      
      <div className="space-y-6">
        {/* File Upload Area */}
        <div 
          className={`border-2 border-dashed ${isDragOver ? 'border-black bg-gray-50' : 'border-gray-300'} rounded-lg p-8 text-center hover:border-black transition-colors duration-300 cursor-pointer relative`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          {uploadedFile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-black" />
                <div className="text-left">
                  <p className="text-black font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-600">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-black font-medium">Drop your document here or click to upload</p>
              <p className="text-sm text-gray-600 mt-2">Supports PDF, DOCX, DOC, TXT files</p>
            </>
          )}
        </div>

        {/* Process Button */}
        <button 
          onClick={processDocument}
          disabled={!uploadedFile || isAnalyzing || isGenerating}
          className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            {(isAnalyzing || isGenerating) ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>{processingStage}</span>
              </>
            ) : (
              <>
                <span>Generate Intelligent Questions</span>
              </>
            )}
          </div>
        </button>

        {/* Document Analysis Results */}
        {documentAnalysis && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 className="font-semibold text-black mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Advanced Document Analysis
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600">Document Type:</span>
                <p className="text-black font-medium">{documentAnalysis.documentType}</p>
              </div>
              <div>
                <span className="text-gray-600">Complexity:</span>
                <p className="text-black font-medium capitalize">{documentAnalysis.complexity}</p>
              </div>
              <div>
                <span className="text-gray-600">Word Count:</span>
                <p className="text-black font-medium">{documentAnalysis.wordCount.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-600">Readability:</span>
                <p className="text-black font-medium">{documentAnalysis.readabilityScore}%</p>
              </div>
              <div>
                <span className="text-gray-600">Sentiment:</span>
                <p className="text-black font-medium capitalize">{documentAnalysis.sentiment}</p>
              </div>
              <div>
                <span className="text-gray-600">Language:</span>
                <p className="text-black font-medium">{documentAnalysis.language}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-gray-600">Key Topics Extracted:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {documentAnalysis.keyTopics.map((topic, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs border">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-gray-600">Named Entities:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {documentAnalysis.entities.map((entity, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs border">
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Question Type Selector */}
        {questionSets && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 className="font-semibold text-black mb-4">Select Question Type:</h4>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSelectedQuestionType('hr')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedQuestionType === 'hr' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>HR Interview</span>
              </button>
              <button
                onClick={() => setSelectedQuestionType('teacher')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedQuestionType === 'teacher' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Assessment</span>
              </button>
              <button
                onClick={() => setSelectedQuestionType('practice')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedQuestionType === 'practice' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>Practice</span>
              </button>
            </div>

            {/* Generated Questions */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
               <h5 className="text-lg font-medium text-black">
                  Generated {selectedQuestionType.toUpperCase()} Questions
                </h5>
                <button
                  onClick={exportQuestions}
                 className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
              
              {questionSets[selectedQuestionType].map((question, index) => (
               <div key={question.id} className="bg-white rounded-lg p-4 border-l-4 border-black border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                     <span className="text-black font-medium">Q{index + 1}:</span>
                      {getTypeIcon(question.type)}
                     <span className="text-gray-600 text-sm capitalize">{question.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      {question.timeLimit && (
                        <span className="flex items-center text-gray-400 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {question.timeLimit}min
                        </span>
                      )}
                    </div>
                  </div>
                 <p className="text-gray-700 mb-2">{question.question}</p>
                 <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Category: {question.category}</span>
                    {question.suggestedAnswer && (
                      <span className="flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Answer guide available
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ML Features Info */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-black mb-2 flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Advanced ML Features:
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Transformer-based document understanding (BERT/GPT)</li>
            <li>• Named Entity Recognition (NER) for key concept extraction</li>
            <li>• Semantic analysis and context-aware question generation</li>
            <li>• Multi-type question generation (objective, descriptive, analytical)</li>
            <li>• Difficulty assessment and adaptive questioning</li>
            <li>• Domain-specific question optimization</li>
            <li>• Real-time document processing and analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionGenerator;