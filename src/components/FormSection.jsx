import React, { useState } from 'react';
import './FormSection.css';

const FormSection = ({ 
  resumeData, 
  handleInputChange, 
  handleArrayChange, 
  addNewItem, 
  removeItem,
  theme
}) => {
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('personal');

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d{10,15}$/;
    return re.test(phone.replace(/\D/g, ''));
  };

  // Handle input changes with validation
  const handleValidatedInputChange = (e) => {
    const { name, value } = e.target;
    
    // Perform validation
    if (name === 'email' && value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else if (name === 'email') {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    
    if (name === 'phone' && value && !validatePhone(value)) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number (10-15 digits)' }));
    } else if (name === 'phone') {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
    
    handleInputChange(e);
  };

  // Handle array input changes with validation
  const handleValidatedArrayChange = (section, index, field, value) => {
    handleArrayChange(section, index, field, value);
  };
  
  // Define tabs
  const tabs = [
    { id: 'personal', label: 'Personal', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'certifications', label: 'Certifications', icon: '📜' },
    { id: 'languages', label: 'Languages', icon: '🌐' },
  ];
  
  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalSection();
      case 'education':
        return renderEducationSection();
      case 'experience':
        return renderExperienceSection();
      case 'projects':
        return renderProjectsSection();
      case 'skills':
        return renderSkillsSection();
      case 'certifications':
        return renderCertificationsSection();
      case 'languages':
        return renderLanguagesSection();
      default:
        return renderPersonalSection();
    }
  };
  
  // Render personal information section
  const renderPersonalSection = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Personal Information</h3>
      </div>
      <p className="section-description">
        Provide your basic contact information. These details will appear in the header of your resume.
      </p>
      
      <div className="form-row">
        <div className="form-group">
          <label className="required-field">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={resumeData.fullName}
            onChange={handleInputChange}
            placeholder="e.g. John Doe"
            required
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label className="required-field">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={resumeData.email}
            onChange={handleValidatedInputChange}
            placeholder="e.g. john.doe@example.com"
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label className="required-field">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={resumeData.phone}
            onChange={handleValidatedInputChange}
            placeholder="e.g. (123) 456-7890"
            required
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={resumeData.address}
            onChange={handleInputChange}
            placeholder="e.g. New York, NY"
          />
          <div className="form-tip">
            For privacy, consider including just city and state/country
          </div>
          {!resumeData.address && (
            <div className="form-tip warning">
              Address is optional but recommended for a complete resume
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  // Render education section
  const renderEducationSection = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Education</h3>
        <button type="button" onClick={() => addNewItem('education')} className="add-btn">
          + Add Education
        </button>
      </div>
      <p className="section-description">
        List your academic qualifications in reverse chronological order (most recent first).
      </p>
      
      {resumeData.education.length === 0 ? (
        <div className="empty-section">
          <div className="empty-section-icon">🎓</div>
          <div className="empty-section-text">No education entries yet. Add your educational background.</div>
        </div>
      ) : (
        resumeData.education.map((edu, index) => (
          <div key={edu.id} className="form-item">
            <div className="form-item-header">
              <div className="form-item-title">
                {edu.degree || edu.institution ? 
                  `${edu.degree || 'Degree'} | ${edu.institution || 'Institution'}` : 
                  'Education Entry'}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="required-field">Degree/Certificate</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleValidatedArrayChange('education', index, 'degree', e.target.value)}
                  placeholder="e.g. Bachelor of Science in Computer Science"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="required-field">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleValidatedArrayChange('education', index, 'institution', e.target.value)}
                  placeholder="e.g. Stanford University"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleValidatedArrayChange('education', index, 'startDate', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => handleValidatedArrayChange('education', index, 'endDate', e.target.value)}
                />
                <div className="form-tip">
                  Leave empty if currently studying here
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={edu.description}
                onChange={(e) => handleValidatedArrayChange('education', index, 'description', e.target.value)}
                rows="3"
                placeholder="e.g. Relevant coursework, achievements, GPA, etc."
              />
            </div>
            
            {resumeData.education.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeItem('education', edu.id)}
                className="remove-btn"
              >
                Remove Entry
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
  
  // Render experience section
  const renderExperienceSection = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Work Experience</h3>
        <button type="button" onClick={() => addNewItem('experience')} className="add-btn">
          + Add Experience
        </button>
      </div>
      <p className="section-description">
        List your work experience in reverse chronological order (most recent first).
      </p>
      
      {resumeData.experience.length === 0 ? (
        <div className="empty-section">
          <div className="empty-section-icon">💼</div>
          <div className="empty-section-text">No experience entries yet. Add your work history.</div>
        </div>
      ) : (
        resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="form-item">
            <div className="form-item-header">
              <div className="form-item-title">
                {exp.position || exp.company ? 
                  `${exp.position || 'Position'} | ${exp.company || 'Company'}` : 
                  'Experience Entry'}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="required-field">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleValidatedArrayChange('experience', index, 'position', e.target.value)}
                  placeholder="e.g. Software Engineer"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="required-field">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleValidatedArrayChange('experience', index, 'company', e.target.value)}
                  placeholder="e.g. Google"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleValidatedArrayChange('experience', index, 'startDate', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => handleValidatedArrayChange('experience', index, 'endDate', e.target.value)}
                />
                <div className="form-tip">
                  Leave empty if this is your current job
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => handleValidatedArrayChange('experience', index, 'description', e.target.value)}
                rows="4"
                placeholder="e.g. Developed and maintained web applications using React.js and Node.js. Collaborated with cross-functional teams to implement new features and improve existing functionality."
              />
              <div className="form-tip">
                Use bullet points for better readability. Focus on achievements and skills.
              </div>
            </div>
            
            {resumeData.experience.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeItem('experience', exp.id)}
                className="remove-btn"
              >
                Remove Entry
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
  
  // Render projects section
  const renderProjectsSection = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Projects</h3>
        <button type="button" onClick={() => addNewItem('projects')} className="add-btn">
          + Add Project
        </button>
      </div>
      <p className="section-description">
        Showcase your notable projects. Include personal, academic, or professional projects.
      </p>
      
      {resumeData.projects.length === 0 ? (
        <div className="empty-section">
          <div className="empty-section-icon">🚀</div>
          <div className="empty-section-text">No projects yet. Add projects you've worked on.</div>
        </div>
      ) : (
        resumeData.projects.map((project, index) => (
          <div key={project.id} className="form-item">
            <div className="form-item-header">
              <div className="form-item-title">
                {project.title || 'Project Entry'}
              </div>
            </div>
            
            <div className="form-group">
              <label className="required-field">Project Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleValidatedArrayChange('projects', index, 'title', e.target.value)}
                placeholder="e.g. E-commerce Website"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Project Link</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => handleValidatedArrayChange('projects', index, 'link', e.target.value)}
                placeholder="e.g. https://github.com/username/project"
              />
              <div className="form-tip">
                GitHub, portfolio, or live demo link
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={project.description}
                onChange={(e) => handleValidatedArrayChange('projects', index, 'description', e.target.value)}
                rows="4"
                placeholder="e.g. Developed a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented features such as product search, filtering, shopping cart, and secure payment processing."
              />
            </div>
            
            {resumeData.projects.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeItem('projects', project.id)}
                className="remove-btn"
              >
                Remove Project
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
  
  // Render skills section
  const renderSkillsSection = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Skills</h3>
        <button type="button" onClick={() => addNewItem('skills')} className="add-btn">
          + Add Skill
        </button>
      </div>
      <p className="section-description">
        List your technical, professional, and soft skills. Be specific and honest about your proficiency.
      </p>
      
      {resumeData.skills.length === 0 ? (
        <div className="empty-section">
          <div className="empty-section-icon">🛠️</div>
          <div className="empty-section-text">No skills added yet. Add your key skills.</div>
        </div>
      ) : (
        <div className="skills-container">
          {resumeData.skills.map((skill, index) => (
            <div key={skill.id} className="skill-item">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleValidatedArrayChange('skills', index, 'name', e.target.value)}
                placeholder="e.g. JavaScript, Project Management, Adobe Photoshop"
              />
              {resumeData.skills.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeItem('skills', skill.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  // Render certifications section
  const renderCertificationsSection = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Certifications</h3>
        <button type="button" onClick={() => addNewItem('certifications')} className="add-btn">
          + Add Certification
        </button>
      </div>
      <p className="section-description">
        List professional certifications, licenses, or credentials you've earned.
      </p>
      
      {resumeData.certifications.length === 0 ? (
        <div className="empty-section">
          <div className="empty-section-icon">📜</div>
          <div className="empty-section-text">No certifications added yet. Add your professional certifications.</div>
        </div>
      ) : (
        resumeData.certifications.map((cert, index) => (
          <div key={cert.id} className="form-item">
            <div className="form-item-header">
              <div className="form-item-title">
                {cert.name || 'Certification Entry'}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="required-field">Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleValidatedArrayChange('certifications', index, 'name', e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="required-field">Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleValidatedArrayChange('certifications', index, 'issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Date Earned</label>
              <input
                type="month"
                value={cert.date}
                onChange={(e) => handleValidatedArrayChange('certifications', index, 'date', e.target.value)}
              />
            </div>
            
            {resumeData.certifications.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeItem('certifications', cert.id)}
                className="remove-btn"
              >
                Remove Certification
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
  
  // Render languages section
  const renderLanguagesSection = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Languages</h3>
        <button type="button" onClick={() => addNewItem('languages')} className="add-btn">
          + Add Language
        </button>
      </div>
      <p className="section-description">
        List languages you speak and your proficiency level for each.
      </p>
      
      {resumeData.languages.length === 0 ? (
        <div className="empty-section">
          <div className="empty-section-icon">🌐</div>
          <div className="empty-section-text">No languages added yet. Add languages you speak.</div>
        </div>
      ) : (
        resumeData.languages.map((lang, index) => (
          <div key={lang.id} className="form-item">
            <div className="form-row">
              <div className="form-group">
                <label className="required-field">Language</label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => handleValidatedArrayChange('languages', index, 'name', e.target.value)}
                  placeholder="e.g. English, Spanish, French"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Proficiency</label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => handleValidatedArrayChange('languages', index, 'proficiency', e.target.value)}
                >
                  <option value="">Select Proficiency</option>
                  <option value="Beginner">Beginner - Basic understanding</option>
                  <option value="Intermediate">Intermediate - Conversational ability</option>
                  <option value="Advanced">Advanced - Near-native proficiency</option>
                  <option value="Fluent">Fluent - Excellent command</option>
                  <option value="Native">Native - First language</option>
                </select>
                <div className="form-tip">
                  Select your proficiency level in this language
                </div>
              </div>
            </div>
            
            {resumeData.languages.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeItem('languages', lang.id)}
                className="remove-btn"
              >
                Remove Language
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className={`form-container app ${theme}`}>
      <div className="form-header">
        <h2>Resume Information</h2>
      </div>
      
      <div className="form-tabs">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`form-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            tabIndex={0}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </div>
        ))}
      </div>
      
      <div className="form-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default FormSection;