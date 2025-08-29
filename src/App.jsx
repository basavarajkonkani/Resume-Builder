import { useState, useEffect } from 'react';
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import SignIn from './components/SignIn';
import './App.css';
import './animations.css';

function App() {
  // State to hold resume data
  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    education: [{ id: Date.now(), degree: '', institution: '', startDate: '', endDate: '', description: '' }],
    experience: [{ id: Date.now(), position: '', company: '', startDate: '', endDate: '', description: '' }],
    projects: [{ id: Date.now(), title: '', description: '', link: '' }],
    skills: [{ id: Date.now(), name: '' }],
    certifications: [{ id: Date.now(), name: '', issuer: '', date: '' }],
    languages: [{ id: Date.now(), name: '', proficiency: '' }]
  });

  // State for theme
  const [theme, setTheme] = useState('light');
  
  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  
  // State for notification
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  // State for loading
  const [loading, setLoading] = useState(false);
  
  // State for sign-in modal
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  
  // State for user data
  const [user, setUser] = useState(null);


  // Available templates
  const templates = [
    { 
      id: 'professional', 
      name: 'Professional',
      description: 'Clean, standard layout with traditional sections',
      color: '#1E3A8A'
    },
    { 
      id: 'modern', 
      name: 'Modern',
      description: 'Contemporary design with unique section arrangement',
      color: '#3B82F6'
    },
    { 
      id: 'creative', 
      name: 'Creative',
      description: 'Two-column layout with sidebar for visual impact',
      color: '#8B5CF6'
    },
    { 
      id: 'minimal', 
      name: 'Minimal',
      description: 'Simple, elegant design focused on content',
      color: '#10B981'
    },
    { 
      id: 'executive', 
      name: 'Executive',
      description: 'Sophisticated layout for senior professionals',
      color: '#0F172A'
    },
    { 
      id: 'compact', 
      name: 'Compact',
      description: 'Space-efficient design for content-rich resumes',
      color: '#134E4A'
    },
    { 
      id: 'corporate', 
      name: 'Corporate',
      description: 'Formal business-oriented layout for corporate roles',
      color: '#4B5563'
    }
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
    
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
    
    // Check for user preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [resumeData]);
  
  // Save selected template to localStorage
  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle nested array changes (education, experience, etc.)
  const handleArrayChange = (section, index, field, value) => {
    setResumeData(prevData => {
      const updatedSection = [...prevData[section]];
      updatedSection[index] = { ...updatedSection[index], [field]: value };
      return { ...prevData, [section]: updatedSection };
    });
  };

  // Add new item to a section
  const addNewItem = (section) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: [
        ...prevData[section],
        { id: Date.now(), ...getDefaultItem(section) }
      ]
    }));
    
    // Show notification
    showNotification(`Added new ${section.slice(0, -1)}`, 'success');
  };

  // Remove item from a section
  const removeItem = (section, id) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter(item => item.id !== id)
    }));
    
    // Show notification
    showNotification(`Removed ${section.slice(0, -1)}`, 'success');
  };

  // Get default item structure based on section
  const getDefaultItem = (section) => {
    switch (section) {
      case 'education':
        return { degree: '', institution: '', startDate: '', endDate: '', description: '' };
      case 'experience':
        return { position: '', company: '', startDate: '', endDate: '', description: '' };
      case 'projects':
        return { title: '', description: '', link: '' };
      case 'skills':
        return { name: '' };
      case 'certifications':
        return { name: '', issuer: '', date: '' };
      case 'languages':
        return { name: '', proficiency: '' };
      default:
        return {};
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Export to PDF
  const exportToPDF = () => {
    setLoading(true);
    
    import('html2pdf.js').then(html2pdf => {
      const element = document.querySelector('.resume-preview');
      
      // Create a clone of the element to modify for PDF export
      const cloneElement = element.cloneNode(true);
      
      // Add comprehensive print-specific styles to ensure dark text and proper contrast
      const printStyles = document.createElement('style');
      printStyles.textContent = `
        /* Reset all elements to have maximum contrast */
        * {
          color: #000000 !important;
          background-color: #ffffff !important;
          font-family: Arial, Helvetica, sans-serif !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          box-shadow: none !important;
          text-shadow: none !important;
        }
        
        /* Ensure all text elements are pure black */
        .resume-name, .section-title, .item-title, .item-subtitle, 
        .item-description, .contact-info p, .skill-tag, .language-name,
        .language-proficiency, .item-date {
          color: #000000 !important;
          background-color: #ffffff !important;
          font-weight: 700 !important;
        }
        
        /* Darken section titles and borders */
        .section-title {
          font-weight: 800 !important;
          border-bottom: 3px solid #000000 !important;
        }
        
        .section-title::before {
          background: #000000 !important;
        }
        
        /* Darken list indicators */
        .section-item::before {
          background: #000000 !important;
        }
        
        /* Ensure skill tags and language items have proper contrast */
        .skill-tag, .language-item {
          background-color: #e0e0e0 !important;
          border: 1px solid #000000 !important;
          color: #000000 !important;
        }
        
        /* Darken proficiency indicators */
        .language-proficiency.beginner { color: #000000 !important; }
        .language-proficiency.intermediate { color: #000000 !important; }
        .language-proficiency.advanced { color: #000000 !important; }
        .language-proficiency.fluent { color: #000000 !important; }
        .language-proficiency.native { color: #000000 !important; }
        
        /* Remove any transparency */
        * {
          opacity: 1 !important;
        }
      `;
      cloneElement.appendChild(printStyles);
      
      const opt = {
        margin: [10, 5, 10, 5],
        filename: `${resumeData.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 3, // Increased scale for better quality
          useCORS: true,
          logging: false,
          letterRendering: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          removeContainer: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: false,
          precision: 16
        },
        fontFaces: [
          { family: 'Arial', weight: 400 },
          { family: 'Arial', weight: 700 },
          { family: 'Arial', weight: 800 }
        ]
      };
      
      html2pdf.default().set(opt).from(cloneElement).save().then(() => {
        setLoading(false);
        showNotification('Resume exported successfully!', 'success');
      }).catch(err => {
        setLoading(false);
        showNotification('Failed to export resume', 'error');
        console.error(err);
      });
    }).catch(error => {
      setLoading(false);
      showNotification('Failed to load export module', 'error');
      console.error(error);
    });
  };
  
  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
  };
  
  // Clear all resume data
  const clearResumeData = () => {
    if (window.confirm('Are you sure you want to clear all resume data? This action cannot be undone.')) {
      setResumeData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        education: [{ id: Date.now(), degree: '', institution: '', startDate: '', endDate: '', description: '' }],
        experience: [{ id: Date.now(), position: '', company: '', startDate: '', endDate: '', description: '' }],
        projects: [{ id: Date.now(), title: '', description: '', link: '' }],
        skills: [{ id: Date.now(), name: '' }],
        certifications: [{ id: Date.now(), name: '', issuer: '', date: '' }],
        languages: [{ id: Date.now(), name: '', proficiency: '' }]
      });
      
      showNotification('Resume data cleared', 'success');
    }
  };
  
  // Handle sign in
  const handleSignIn = (userData) => {
    setUser(userData);
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    showNotification(`Welcome, ${userData.name}!`, 'success');
  };
  
  // Handle sign out
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    showNotification('You have been signed out', 'info');
  };
  
  // Check for existing user session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  
  // Fill with sample data
  const fillSampleData = () => {
    if (window.confirm('This will replace your current data with sample data. Continue?')) {
      const sampleData = {
        fullName: user ? user.name : 'John Doe',
        email: user ? user.email : 'john.doe@example.com',
        phone: '(123) 456-7890',
        address: 'New York, NY',
        education: [
          { 
            id: 1, 
            degree: 'Master of Computer Science', 
            institution: 'Stanford University', 
            startDate: '2018-09', 
            endDate: '2020-06', 
            description: 'Specialized in Artificial Intelligence and Machine Learning' 
          },
          { 
            id: 2, 
            degree: 'Bachelor of Engineering', 
            institution: 'MIT', 
            startDate: '2014-09', 
            endDate: '2018-06', 
            description: 'Major in Computer Science with minor in Mathematics' 
          }
        ],
        experience: [
          { 
            id: 1, 
            position: 'Senior Software Engineer', 
            company: 'Google', 
            startDate: '2020-07', 
            endDate: '', 
            description: 'Developing scalable cloud solutions and implementing machine learning algorithms for data processing.' 
          },
          { 
            id: 2, 
            position: 'Software Developer', 
            company: 'Microsoft', 
            startDate: '2018-06', 
            endDate: '2020-06', 
            description: 'Worked on Azure cloud services and developed microservices architecture.' 
          }
        ],
        projects: [
          { 
            id: 1, 
            title: 'AI-Powered Resume Analyzer', 
            description: 'Developed an AI tool that analyzes resumes and provides improvement suggestions using NLP.', 
            link: 'https://github.com/johndoe/resume-analyzer' 
          },
          { 
            id: 2, 
            title: 'E-commerce Platform', 
            description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB.', 
            link: 'https://github.com/johndoe/ecommerce' 
          }
        ],
        skills: [
          { id: 1, name: 'JavaScript' },
          { id: 2, name: 'React.js' },
          { id: 3, name: 'Node.js' },
          { id: 4, name: 'Python' },
          { id: 5, name: 'Machine Learning' },
          { id: 6, name: 'AWS' },
          { id: 7, name: 'Docker' }
        ],
        certifications: [
          { 
            id: 1, 
            name: 'AWS Certified Solutions Architect', 
            issuer: 'Amazon Web Services', 
            date: '2022-03' 
          },
          { 
            id: 2, 
            name: 'Google Cloud Professional Data Engineer', 
            issuer: 'Google Cloud', 
            date: '2021-05' 
          }
        ],
        languages: [
          { id: 1, name: 'English', proficiency: 'Native' },
          { id: 2, name: 'Spanish', proficiency: 'Advanced' },
          { id: 3, name: 'French', proficiency: 'Intermediate' }
        ]
      };
      
      setResumeData(sampleData);
      showNotification('Sample data loaded', 'success');
    }
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <div className="logo-container">
          <div className="logo-text">Resume <span>Builder</span></div>
        </div>
        <div className="header-controls">
          <div className="nav-links">
            <a href="#" className="nav-link">Resume</a>
            <a href="#" className="nav-link">Cover Letter</a>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          {user ? (
            <div className="user-menu">
              <button className="user-button">
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span className="user-name">{user.name}</span>
              </button>
              <div className="user-dropdown">
                <div className="user-info">
                  <p className="user-email">{user.email}</p>
                </div>
                <button className="sign-out-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="sign-in-btn"
              onClick={() => setIsSignInOpen(true)}
            >
              Sign in
            </button>
          )}
          <button 
            className="get-started-btn" 
            onClick={() => document.querySelector('.app-container').scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </button>
        </div>
      </header>
      
      {/* Service Announcement Banner like Indeed's */}
      <div className="service-announcement">
        <div className="announcement-icon">ℹ️</div>
        <p className="announcement-text">
          Download your resumes now. This resume builder tool will no longer be available after September 15, 2025.
        </p>
        <button className="close-announcement" onClick={(e) => e.target.parentNode.style.display = 'none'}>×</button>
      </div>
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Get dream jobs with our<br /><span className="highlight">AI Powered</span> resume builder</h1>
          <p className="hero-description">Build a professional and outstanding resume with our free builder and templates.</p>
          <div className="hero-buttons">
            <button className="hero-btn primary" onClick={() => document.querySelector('.app-container').scrollIntoView({ behavior: 'smooth' })}>
              Create my resume
            </button>
            <button className="hero-btn secondary" onClick={() => showNotification('Upload functionality coming soon!', 'info')}>
              Upload resume
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="resume-image-container">
            <ResumePreview 
              resumeData={resumeData} 
              theme={theme} 
              template={selectedTemplate}
            />
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <button className="action-btn primary" onClick={fillSampleData}>
          <span className="btn-icon">📋</span> Fill with Sample Data
        </button>
        <button className="action-btn" onClick={clearResumeData}>
          <span className="btn-icon">🗑️</span> Clear All Data
        </button>
      </div>
      
      <div className="template-selection-container">
        <h2>Choose a Template Style</h2>
        <div className="templates-grid">
          {templates.map(template => (
            <div 
              key={template.id} 
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="template-preview" style={{background: template.color}}>
                {template.name}
              </div>
              <div className="template-info">
                <h3>{template.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="app-container">
        <div className="form-section">
          <FormSection 
            resumeData={resumeData}
            handleInputChange={handleInputChange}
            handleArrayChange={handleArrayChange}
            addNewItem={addNewItem}
            removeItem={removeItem}
            theme={theme}
          />
        </div>
        
        <div className="preview-section">
          <h2>Resume Preview</h2>
          <div className="preview-actions">
            <button className="action-btn primary" onClick={exportToPDF} disabled={loading}>
              {loading ? <span className="spinner"></span> : <span className="btn-icon">📥</span>} 
              {loading ? 'Exporting...' : 'Download PDF'}
            </button>
          </div>
          <ResumePreview 
            resumeData={resumeData} 
            theme={theme} 
            template={selectedTemplate}
          />
        </div>
      </div>
      
      {notification.show && (
        <div className={`toast ${notification.type}`}>
          {notification.type === 'success' ? '✅' : notification.type === 'info' ? 'ℹ️' : '❌'} {notification.message}
        </div>
      )}
      
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
      
      {/* Sign In Modal */}
      <SignIn 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
        onSignIn={handleSignIn} 
      />
    </div>
  );
}

export default App;