import React from 'react';
import './ResumePreview.css';

const ResumePreview = ({ resumeData, theme, template }) => {
  // Helper function to check if a section has content
  const hasSectionContent = (section) => {
    if (!section || !Array.isArray(section)) return false;
    return section.some(item => {
      // Check if any field in the item has content
      return Object.values(item).some(value => 
        value !== null && value !== undefined && value !== ''
      );
    });
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  // Helper function to format date ranges
  const formatDateString = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    
    const start = startDate ? formatDate(startDate) : 'Present';
    const end = endDate ? formatDate(endDate) : 'Present';
    
    return `${start} - ${end}`;
  };

  // Minimal Template
  const renderMinimalTemplate = () => (
    <div className={`resume-preview resume-template-minimal ${theme}`}>
      <div className="resume-actions">
        <button className="resume-action-btn" title="Print Resume">🖨️</button>
      </div>
      
      <div className="resume-preview-header">
        <div className="resume-preview-title">
          <span>Resume Preview</span>
        </div>
      </div>
      
      <div className="resume-header">
        <h1 className="resume-name">{resumeData.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {resumeData.email && <p>📧 {resumeData.email}</p>}
          {resumeData.phone && <p>📱 {resumeData.phone}</p>}
          {resumeData.address && <p>📍 {resumeData.address}</p>}
        </div>
      </div>

      {/* Experience Section */}
      {hasSectionContent(resumeData.experience) && (
        <div className="resume-section">
          <h2 className="section-title">Experience</h2>
          {resumeData.experience
            .filter(exp => exp.position || exp.company)
            .map((exp, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{exp.position || 'Position'}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="item-date">
                      {formatDateString(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && <p className="item-subtitle">{exp.company}</p>}
                {exp.description && <p className="item-description">{exp.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Education Section */}
      {hasSectionContent(resumeData.education) && (
        <div className="resume-section">
          <h2 className="section-title">Education</h2>
          {resumeData.education
            .filter(edu => edu.degree || edu.institution)
            .map((edu, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{edu.degree || 'Degree'}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <span className="item-date">
                      {formatDateString(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.institution && <p className="item-subtitle">{edu.institution}</p>}
                {edu.description && <p className="item-description">{edu.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Skills Section */}
      {hasSectionContent(resumeData.skills) && (
        <div className="resume-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-container">
            {resumeData.skills
              .filter(skill => skill.name)
              .map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {hasSectionContent(resumeData.projects) && (
        <div className="resume-section">
          <h2 className="section-title">Projects</h2>
          {resumeData.projects
            .filter(proj => proj.title)
            .map((project, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="item-link">
                      🔗
                    </a>
                  )}
                </div>
                {project.description && <p className="item-description">{project.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Certifications Section */}
      {hasSectionContent(resumeData.certifications) && (
        <div className="resume-section">
          <h2 className="section-title">Certifications</h2>
          {resumeData.certifications
            .filter(cert => cert.name || cert.issuer)
            .map((cert, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{cert.name || 'Certification'}</h3>
                  {cert.date && <span className="item-date">{formatDate(cert.date)}</span>}
                </div>
                {cert.issuer && <p className="item-subtitle">{cert.issuer}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Languages Section */}
      {hasSectionContent(resumeData.languages) && (
        <div className="resume-section">
          <h2 className="section-title">Languages</h2>
          <div className="languages-container">
            {resumeData.languages
              .filter(lang => lang.name)
              .map((lang, index) => (
                <div key={index} className="language-item">
                  <span className="language-flag">{getLanguageFlag(lang.name)}</span>
                  <span className="language-name">{lang.name}</span>
                  {lang.proficiency && (
                    <span className={`language-proficiency ${getProficiencyClass(lang.proficiency)}`}>
                      ({lang.proficiency})
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
      
      <div className="preview-toolbar">
        <button className="resume-action-btn" title="Zoom In">🔍+</button>
        <button className="resume-action-btn" title="Zoom Out">🔍-</button>
      </div>
    </div>
  );

  // Professional Template
  const renderProfessionalTemplate = () => (
    <div className={`resume-preview resume-template-professional ${theme}`}>
      <div className="resume-actions">
        <button className="resume-action-btn" title="Print Resume">🖨️</button>
      </div>
      
      <div className="resume-preview-header">
        <div className="resume-preview-title">
          <span>Resume Preview</span>
        </div>
      </div>
      
      <div className="resume-header">
        <h1 className="resume-name">{resumeData.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {resumeData.email && <p>📧 {resumeData.email}</p>}
          {resumeData.phone && <p>📱 {resumeData.phone}</p>}
          {resumeData.address && <p>📍 {resumeData.address}</p>}
        </div>
      </div>

      {/* Summary Section */}
      <div className="resume-section">
        <h2 className="section-title">Professional Summary</h2>
        <p className="item-description">
          {resumeData.fullName ? 
            `${resumeData.fullName} is a ` : 
            'A '} 
          dedicated professional with expertise in 
          {hasSectionContent(resumeData.skills) ? 
            ` ${resumeData.skills.slice(0, 3).map(skill => skill.name).filter(Boolean).join(', ')}. ` : 
            ' various fields. '}
          {hasSectionContent(resumeData.experience) ? 
            `Brings ${resumeData.experience.length} ${resumeData.experience.length > 1 ? 'years' : 'year'} of experience in delivering results and driving success.` : 
            'Committed to excellence and continuous growth in professional endeavors.'}
        </p>
      </div>

      {/* Experience Section */}
      {hasSectionContent(resumeData.experience) && (
        <div className="resume-section">
          <h2 className="section-title">Work Experience</h2>
          {resumeData.experience
            .filter(exp => exp.position || exp.company)
            .map((exp, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{exp.position || 'Position'}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="item-date">
                      {formatDateString(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && <p className="item-subtitle">{exp.company}</p>}
                {exp.description && <p className="item-description">{exp.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Education Section */}
      {hasSectionContent(resumeData.education) && (
        <div className="resume-section">
          <h2 className="section-title">Education</h2>
          {resumeData.education
            .filter(edu => edu.degree || edu.institution)
            .map((edu, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{edu.degree || 'Degree'}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <span className="item-date">
                      {formatDateString(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.institution && <p className="item-subtitle">{edu.institution}</p>}
                {edu.description && <p className="item-description">{edu.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Skills Section */}
      {hasSectionContent(resumeData.skills) && (
        <div className="resume-section">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
            {resumeData.skills
              .filter(skill => skill.name)
              .map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {hasSectionContent(resumeData.projects) && (
        <div className="resume-section">
          <h2 className="section-title">Projects</h2>
          {resumeData.projects
            .filter(proj => proj.title)
            .map((project, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="item-link">
                      🔗 View Project
                    </a>
                  )}
                </div>
                {project.description && <p className="item-description">{project.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Certifications Section */}
      {hasSectionContent(resumeData.certifications) && (
        <div className="resume-section">
          <h2 className="section-title">Certifications</h2>
          {resumeData.certifications
            .filter(cert => cert.name || cert.issuer)
            .map((cert, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{cert.name || 'Certification'}</h3>
                  {cert.date && <span className="item-date">{formatDate(cert.date)}</span>}
                </div>
                {cert.issuer && <p className="item-subtitle">{cert.issuer}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Languages Section */}
      {hasSectionContent(resumeData.languages) && (
        <div className="resume-section">
          <h2 className="section-title">Languages</h2>
          <div className="languages-container">
            {resumeData.languages
              .filter(lang => lang.name)
              .map((lang, index) => (
                <div key={index} className="language-item">
                  <span className="language-flag">{getLanguageFlag(lang.name)}</span>
                  <span className="language-name">{lang.name}</span>
                  {lang.proficiency && (
                    <span className={`language-proficiency ${getProficiencyClass(lang.proficiency)}`}>
                      ({lang.proficiency})
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
      
      <div className="preview-toolbar">
        <button className="resume-action-btn" title="Zoom In">🔍+</button>
        <button className="resume-action-btn" title="Zoom Out">🔍-</button>
      </div>
    </div>
  );

  // Modern Template
  const renderModernTemplate = () => (
    <div className={`resume-preview resume-template-modern ${theme}`}>
      <div className="resume-actions">
        <button className="resume-action-btn" title="Print Resume">🖨️</button>
      </div>
      
      <div className="resume-preview-header">
        <div className="resume-preview-title">
          <span>Resume Preview</span>
        </div>
      </div>
      
      <div className="resume-header">
        <div className="header-content">
          <h1 className="resume-name">{resumeData.fullName || 'Your Name'}</h1>
          <div className="contact-info">
            {resumeData.email && <p>📧 {resumeData.email}</p>}
            {resumeData.phone && <p>📱 {resumeData.phone}</p>}
            {resumeData.address && <p>📍 {resumeData.address}</p>}
          </div>
        </div>
      </div>

      <div className="resume-content">
        <div className="main-content">
          {/* Summary Section */}
          <div className="resume-section">
            <h2 className="section-title">Career Overview</h2>
            <p className="item-description">
              {resumeData.fullName ? 
                `${resumeData.fullName} is a ` : 
                'A '} 
              dynamic professional with expertise in 
              {hasSectionContent(resumeData.skills) ? 
                ` ${resumeData.skills.slice(0, 3).map(skill => skill.name).filter(Boolean).join(', ')}. ` : 
                ' various disciplines. '}
              {hasSectionContent(resumeData.experience) ? 
                `With ${resumeData.experience.length} ${resumeData.experience.length > 1 ? 'years' : 'year'} of hands-on experience, delivers innovative solutions and drives measurable results.` : 
                'Focused on delivering exceptional value and achieving organizational objectives.'}
            </p>
          </div>

          {/* Experience Section */}
          {hasSectionContent(resumeData.experience) && (
            <div className="resume-section">
              <h2 className="section-title">Professional Journey</h2>
              {resumeData.experience
                .filter(exp => exp.position || exp.company)
                .map((exp, index) => (
                  <div key={index} className="section-item">
                    <div className="item-header">
                      <h3 className="item-title">{exp.position || 'Position'}</h3>
                      {(exp.startDate || exp.endDate) && (
                        <span className="item-date">
                          {formatDateString(exp.startDate, exp.endDate)}
                        </span>
                      )}
                    </div>
                    {exp.company && <p className="item-subtitle">{exp.company}</p>}
                    {exp.description && <p className="item-description">{exp.description}</p>}
                  </div>
                ))}
            </div>
          )}

          {/* Education Section */}
          {hasSectionContent(resumeData.education) && (
            <div className="resume-section">
              <h2 className="section-title">Academic Background</h2>
              {resumeData.education
                .filter(edu => edu.degree || edu.institution)
                .map((edu, index) => (
                  <div key={index} className="section-item">
                    <div className="item-header">
                      <h3 className="item-title">{edu.degree || 'Degree'}</h3>
                      {(edu.startDate || edu.endDate) && (
                        <span className="item-date">
                          {formatDateString(edu.startDate, edu.endDate)}
                        </span>
                      )}
                    </div>
                    {edu.institution && <p className="item-subtitle">{edu.institution}</p>}
                    {edu.description && <p className="item-description">{edu.description}</p>}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="sidebar">
          {/* Skills Section */}
          {hasSectionContent(resumeData.skills) && (
            <div className="resume-section">
              <h2 className="section-title">Core Competencies</h2>
              <div className="skills-container">
                {resumeData.skills
                  .filter(skill => skill.name)
                  .map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {hasSectionContent(resumeData.projects) && (
            <div className="resume-section">
              <h2 className="section-title">Key Projects</h2>
              {resumeData.projects
                .filter(proj => proj.title)
                .map((project, index) => (
                  <div key={index} className="section-item">
                    <h3 className="item-title">{project.title}</h3>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="item-link">
                        🔗 View
                      </a>
                    )}
                    {project.description && <p className="item-description">{project.description}</p>}
                  </div>
                ))}
            </div>
          )}

          {/* Certifications Section */}
          {hasSectionContent(resumeData.certifications) && (
            <div className="resume-section">
              <h2 className="section-title">Certifications</h2>
              {resumeData.certifications
                .filter(cert => cert.name || cert.issuer)
                .map((cert, index) => (
                  <div key={index} className="section-item">
                    <h3 className="item-title">{cert.name || 'Certification'}</h3>
                    {cert.issuer && <p className="item-subtitle">{cert.issuer}</p>}
                    {cert.date && <span className="item-date">{formatDate(cert.date)}</span>}
                  </div>
                ))}
            </div>
          )}

          {/* Languages Section */}
          {hasSectionContent(resumeData.languages) && (
            <div className="resume-section">
              <h2 className="section-title">Languages</h2>
              <div className="languages-container">
                {resumeData.languages
                  .filter(lang => lang.name)
                  .map((lang, index) => (
                    <div key={index} className="language-item">
                      <span className="language-flag">{getLanguageFlag(lang.name)}</span>
                      <span className="language-name">{lang.name}</span>
                      {lang.proficiency && (
                        <span className={`language-proficiency ${getProficiencyClass(lang.proficiency)}`}>
                          ({lang.proficiency})
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="preview-toolbar">
        <button className="resume-action-btn" title="Zoom In">🔍+</button>
        <button className="resume-action-btn" title="Zoom Out">🔍-</button>
      </div>
    </div>
  );

  // Creative Template
  const renderCreativeTemplate = () => (
    <div className={`resume-preview resume-template-creative ${theme}`}>
      <div className="resume-actions">
        <button className="resume-action-btn" title="Print Resume">🖨️</button>
      </div>
      
      <div className="resume-preview-header">
        <div className="resume-preview-title">
          <span>Resume Preview</span>
        </div>
      </div>
      
      <div className="resume-header">
        <div className="profile-section">
          <h1 className="resume-name">{resumeData.fullName || 'Your Name'}</h1>
          <div className="contact-info">
            {resumeData.email && <p>📧 {resumeData.email}</p>}
            {resumeData.phone && <p>📱 {resumeData.phone}</p>}
            {resumeData.address && <p>📍 {resumeData.address}</p>}
          </div>
        </div>
      </div>

      <div className="resume-content">
        <div className="main-content">
          {/* Summary Section */}
          <div className="resume-section">
            <h2 className="section-title">Professional Profile</h2>
            <p className="item-description">
              {resumeData.fullName ? 
                `${resumeData.fullName} is a ` : 
                'A '} 
              versatile professional with demonstrated expertise in 
              {hasSectionContent(resumeData.skills) ? 
                ` ${resumeData.skills.slice(0, 3).map(skill => skill.name).filter(Boolean).join(', ')}. ` : 
                ' various domains. '}
              {hasSectionContent(resumeData.experience) ? 
                `Brings ${resumeData.experience.length} ${resumeData.experience.length > 1 ? 'years' : 'year'} of progressive experience with a proven track record of innovation and excellence.` : 
                'Dedicated to achieving exceptional results and driving organizational success.'}
            </p>
          </div>

          {/* Experience Section */}
          {hasSectionContent(resumeData.experience) && (
            <div className="resume-section">
              <h2 className="section-title">Career Highlights</h2>
              {resumeData.experience
                .filter(exp => exp.position || exp.company)
                .map((exp, index) => (
                  <div key={index} className="section-item">
                    <div className="item-header">
                      <h3 className="item-title">{exp.position || 'Position'}</h3>
                      {(exp.startDate || exp.endDate) && (
                        <span className="item-date">
                          {formatDateString(exp.startDate, exp.endDate)}
                        </span>
                      )}
                    </div>
                    {exp.company && <p className="item-subtitle">{exp.company}</p>}
                    {exp.description && <p className="item-description">{exp.description}</p>}
                  </div>
                ))}
            </div>
          )}

          {/* Education Section */}
          {hasSectionContent(resumeData.education) && (
            <div className="resume-section">
              <h2 className="section-title">Educational Achievements</h2>
              {resumeData.education
                .filter(edu => edu.degree || edu.institution)
                .map((edu, index) => (
                  <div key={index} className="section-item">
                    <div className="item-header">
                      <h3 className="item-title">{edu.degree || 'Degree'}</h3>
                      {(edu.startDate || edu.endDate) && (
                        <span className="item-date">
                          {formatDateString(edu.startDate, edu.endDate)}
                        </span>
                      )}
                    </div>
                    {edu.institution && <p className="item-subtitle">{edu.institution}</p>}
                    {edu.description && <p className="item-description">{edu.description}</p>}
                  </div>
                ))}
            </div>
          )}

          {/* Projects Section */}
          {hasSectionContent(resumeData.projects) && (
            <div className="resume-section">
              <h2 className="section-title">Notable Projects</h2>
              {resumeData.projects
                .filter(proj => proj.title)
                .map((project, index) => (
                  <div key={index} className="section-item">
                    <div className="item-header">
                      <h3 className="item-title">{project.title}</h3>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="item-link">
                          🔗 View Project
                        </a>
                      )}
                    </div>
                    {project.description && <p className="item-description">{project.description}</p>}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="sidebar">
          {/* Skills Section */}
          {hasSectionContent(resumeData.skills) && (
            <div className="resume-section">
              <h2 className="section-title">Expertise</h2>
              <div className="skills-container">
                {resumeData.skills
                  .filter(skill => skill.name)
                  .map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {hasSectionContent(resumeData.certifications) && (
            <div className="resume-section">
              <h2 className="section-title">Credentials</h2>
              {resumeData.certifications
                .filter(cert => cert.name || cert.issuer)
                .map((cert, index) => (
                  <div key={index} className="section-item">
                    <h3 className="item-title">{cert.name || 'Certification'}</h3>
                    {cert.issuer && <p className="item-subtitle">{cert.issuer}</p>}
                    {cert.date && <span className="item-date">{formatDate(cert.date)}</span>}
                  </div>
                ))}
            </div>
          )}

          {/* Languages Section */}
          {hasSectionContent(resumeData.languages) && (
            <div className="resume-section">
              <h2 className="section-title">Linguistic Abilities</h2>
              <div className="languages-container">
                {resumeData.languages
                  .filter(lang => lang.name)
                  .map((lang, index) => (
                    <div key={index} className="language-item">
                      <span className="language-flag">{getLanguageFlag(lang.name)}</span>
                      <span className="language-name">{lang.name}</span>
                      {lang.proficiency && (
                        <span className={`language-proficiency ${getProficiencyClass(lang.proficiency)}`}>
                          ({lang.proficiency})
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="preview-toolbar">
        <button className="resume-action-btn" title="Zoom In">🔍+</button>
        <button className="resume-action-btn" title="Zoom Out">🔍-</button>
      </div>
    </div>
  );

  // Executive Template
  const renderExecutiveTemplate = () => (
    <div className={`resume-preview resume-template-executive ${theme}`}>
      <div className="resume-actions">
        <button className="resume-action-btn" title="Print Resume">🖨️</button>
      </div>
      
      <div className="resume-preview-header">
        <div className="resume-preview-title">
          <span>Resume Preview</span>
        </div>
      </div>
      
      <div className="resume-header">
        <div>
          <h1 className="resume-name">{resumeData.fullName || 'Your Name'}</h1>
        </div>
        <div className="contact-info">
          {resumeData.email && <p>📧 {resumeData.email}</p>}
          {resumeData.phone && <p>📱 {resumeData.phone}</p>}
          {resumeData.address && <p>📍 {resumeData.address}</p>}
        </div>
      </div>

      {/* Executive Summary - specific to Executive template */}
      <div className="resume-section">
        <h2 className="section-title">Executive Summary</h2>
        <p className="item-description">
          {resumeData.fullName ? 
            `${resumeData.fullName} is a ` : 
            'A '} 
          seasoned professional with demonstrated expertise in 
          {hasSectionContent(resumeData.skills) ? 
            ` ${resumeData.skills.slice(0, 3).map(skill => skill.name).filter(Boolean).join(', ')}. ` : 
            ' various fields. '}
          {hasSectionContent(resumeData.experience) ? 
            `Offers ${resumeData.experience.length} ${resumeData.experience.length > 1 ? 'years' : 'year'} of progressive experience with a track record of achieving measurable results and driving organizational growth.` : 
            'Looking to leverage extensive experience and skills to deliver exceptional results in a challenging role.'}
        </p>
      </div>

      {/* Experience Section */}
      {hasSectionContent(resumeData.experience) && (
        <div className="resume-section">
          <h2 className="section-title">Professional Experience</h2>
          {resumeData.experience
            .filter(exp => exp.position || exp.company)
            .map((exp, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{exp.position || 'Position'}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="item-date">
                      {formatDateString(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && <p className="item-subtitle">{exp.company}</p>}
                {exp.description && <p className="item-description">{exp.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Education Section */}
      {hasSectionContent(resumeData.education) && (
        <div className="resume-section">
          <h2 className="section-title">Education</h2>
          {resumeData.education
            .filter(edu => edu.degree || edu.institution)
            .map((edu, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{edu.degree || 'Degree'}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <span className="item-date">
                      {formatDateString(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.institution && <p className="item-subtitle">{edu.institution}</p>}
                {edu.description && <p className="item-description">{edu.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Skills Section */}
      {hasSectionContent(resumeData.skills) && (
        <div className="resume-section">
          <h2 className="section-title">Core Competencies</h2>
          <div className="skills-container">
            {resumeData.skills
              .filter(skill => skill.name)
              .map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {hasSectionContent(resumeData.projects) && (
        <div className="resume-section">
          <h2 className="section-title">Key Projects</h2>
          {resumeData.projects
            .filter(proj => proj.title)
            .map((project, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="item-link">
                      🔗 View Project
                    </a>
                  )}
                </div>
                {project.description && <p className="item-description">{project.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Certifications Section */}
      {hasSectionContent(resumeData.certifications) && (
        <div className="resume-section">
          <h2 className="section-title">Certifications & Credentials</h2>
          {resumeData.certifications
            .filter(cert => cert.name || cert.issuer)
            .map((cert, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{cert.name || 'Certification'}</h3>
                  {cert.date && <span className="item-date">{formatDate(cert.date)}</span>}
                </div>
                {cert.issuer && <p className="item-subtitle">{cert.issuer}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Languages Section */}
      {hasSectionContent(resumeData.languages) && (
        <div className="resume-section">
          <h2 className="section-title">Languages</h2>
          <div className="languages-container">
            {resumeData.languages
              .filter(lang => lang.name)
              .map((lang, index) => (
                <div key={index} className="language-item">
                  <span className="language-flag">{getLanguageFlag(lang.name)}</span>
                  <span className="language-name">{lang.name}</span>
                  {lang.proficiency && (
                    <span className={`language-proficiency ${getProficiencyClass(lang.proficiency)}`}>
                      ({lang.proficiency})
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
      
      <div className="preview-toolbar">
        <button className="resume-action-btn" title="Zoom In">🔍+</button>
        <button className="resume-action-btn" title="Zoom Out">🔍-</button>
      </div>
    </div>
  );
  
  // Compact Template
  const renderCompactTemplate = () => (
    <div className={`resume-preview resume-template-compact ${theme}`}>
      <div className="resume-actions">
        <button className="resume-action-btn" title="Print Resume">🖨️</button>
      </div>
      
      <div className="resume-preview-header">
        <div className="resume-preview-title">
          <span>Resume Preview</span>
        </div>
      </div>
      
      <div className="resume-header">
        <h1 className="resume-name">{resumeData.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {resumeData.email && <p>📧 {resumeData.email}</p>}
          {resumeData.phone && <p>📱 {resumeData.phone}</p>}
          {resumeData.address && <p>📍 {resumeData.address}</p>}
        </div>
      </div>

      {/* Skills Section - top priority in compact template */}
      {hasSectionContent(resumeData.skills) && (
        <div className="resume-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-container">
            {resumeData.skills
              .filter(skill => skill.name)
              .map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {hasSectionContent(resumeData.experience) && (
        <div className="resume-section">
          <h2 className="section-title">Experience</h2>
          {resumeData.experience
            .filter(exp => exp.position || exp.company)
            .map((exp, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{exp.position || 'Position'}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="item-date">
                      {formatDateString(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && <p className="item-subtitle">{exp.company}</p>}
                {exp.description && <p className="item-description">{exp.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Education Section */}
      {hasSectionContent(resumeData.education) && (
        <div className="resume-section">
          <h2 className="section-title">Education</h2>
          {resumeData.education
            .filter(edu => edu.degree || edu.institution)
            .map((edu, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{edu.degree || 'Degree'}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <span className="item-date">
                      {formatDateString(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.institution && <p className="item-subtitle">{edu.institution}</p>}
                {edu.description && <p className="item-description">{edu.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Projects Section */}
      {hasSectionContent(resumeData.projects) && (
        <div className="resume-section">
          <h2 className="section-title">Projects</h2>
          {resumeData.projects
            .filter(proj => proj.title)
            .map((project, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="item-link">
                      🔗
                    </a>
                  )}
                </div>
                {project.description && <p className="item-description">{project.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Combined Certifications & Languages for space efficiency */}
      {(hasSectionContent(resumeData.certifications) || hasSectionContent(resumeData.languages)) && (
        <div className="resume-section">
          <h2 className="section-title">Certifications & Languages</h2>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
            {hasSectionContent(resumeData.certifications) && (
              <div style={{flex: '1', minWidth: '45%'}}>
                {resumeData.certifications
                  .filter(cert => cert.name || cert.issuer)
                  .map((cert, index) => (
                    <div key={index} style={{marginBottom: '8px'}}>
                      <strong>{cert.name || 'Certification'}</strong>
                      {cert.issuer && <span> ({cert.issuer})</span>}
                    </div>
                  ))}
              </div>
            )}
            
            {hasSectionContent(resumeData.languages) && (
              <div style={{flex: '1', minWidth: '45%'}}>
                <div className="languages-container">
                  {resumeData.languages
                    .filter(lang => lang.name)
                    .map((lang, index) => (
                      <div key={index} className="language-item">
                        <span className="language-flag">{getLanguageFlag(lang.name)}</span>
                        <span className="language-name">{lang.name}</span>
                        {lang.proficiency && (
                          <span className={`language-proficiency ${getProficiencyClass(lang.proficiency)}`}>
                            ({lang.proficiency})
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="preview-toolbar">
        <button className="resume-action-btn" title="Zoom In">🔍+</button>
        <button className="resume-action-btn" title="Zoom Out">🔍-</button>
      </div>
    </div>
  );
  
  // Corporate Template
  const renderCorporateTemplate = () => (
    <div className={`resume-preview resume-template-corporate ${theme}`}>
      <div className="resume-actions">
        <button className="resume-action-btn" title="Print Resume">🖨️</button>
      </div>
      
      <div className="resume-preview-header">
        <div className="resume-preview-title">
          <span>Resume Preview</span>
        </div>
      </div>
      
      <div className="resume-header">
        <h1 className="resume-name">{resumeData.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {resumeData.email && <p>📧 {resumeData.email}</p>}
          {resumeData.phone && <p>📱 {resumeData.phone}</p>}
          {resumeData.address && <p>📍 {resumeData.address}</p>}
        </div>
      </div>

      {/* Professional Profile */}
      <div className="resume-section">
        <h2 className="section-title">Professional Profile</h2>
        <p className="item-description">
          {resumeData.fullName ? 
            `${resumeData.fullName} is a ` : 
            'A '} 
          results-driven professional with expertise in 
          {hasSectionContent(resumeData.skills) ? 
            ` ${resumeData.skills.slice(0, 3).map(skill => skill.name).filter(Boolean).join(', ')}. ` : 
            ' various business sectors. '}
          {hasSectionContent(resumeData.experience) ? 
            `Has demonstrated success through ${resumeData.experience.length} ${resumeData.experience.length > 1 ? 'years' : 'year'} of experience in delivering business value and achieving organizational objectives.` : 
            'Committed to excellence and driving organizational success through strategic thinking and effective execution.'}
        </p>
      </div>

      {/* Experience Section */}
      {hasSectionContent(resumeData.experience) && (
        <div className="resume-section">
          <h2 className="section-title">Professional Experience</h2>
          {resumeData.experience
            .filter(exp => exp.position || exp.company)
            .map((exp, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{exp.position || 'Position'}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="item-date">
                      {formatDateString(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && <p className="item-subtitle">{exp.company}</p>}
                {exp.description && <p className="item-description">{exp.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Education Section */}
      {hasSectionContent(resumeData.education) && (
        <div className="resume-section">
          <h2 className="section-title">Education & Qualifications</h2>
          {resumeData.education
            .filter(edu => edu.degree || edu.institution)
            .map((edu, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{edu.degree || 'Degree'}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <span className="item-date">
                      {formatDateString(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.institution && <p className="item-subtitle">{edu.institution}</p>}
                {edu.description && <p className="item-description">{edu.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Skills Section */}
      {hasSectionContent(resumeData.skills) && (
        <div className="resume-section">
          <h2 className="section-title">Areas of Expertise</h2>
          <div className="skills-container">
            {resumeData.skills
              .filter(skill => skill.name)
              .map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {hasSectionContent(resumeData.projects) && (
        <div className="resume-section">
          <h2 className="section-title">Significant Projects</h2>
          {resumeData.projects
            .filter(proj => proj.title)
            .map((project, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="item-link">
                      🔗 View Project
                    </a>
                  )}
                </div>
                {project.description && <p className="item-description">{project.description}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Certifications Section */}
      {hasSectionContent(resumeData.certifications) && (
        <div className="resume-section">
          <h2 className="section-title">Professional Certifications</h2>
          {resumeData.certifications
            .filter(cert => cert.name || cert.issuer)
            .map((cert, index) => (
              <div key={index} className="section-item">
                <div className="item-header">
                  <h3 className="item-title">{cert.name || 'Certification'}</h3>
                  {cert.date && <span className="item-date">{formatDate(cert.date)}</span>}
                </div>
                {cert.issuer && <p className="item-subtitle">{cert.issuer}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Languages Section */}
      {hasSectionContent(resumeData.languages) && (
        <div className="resume-section">
          <h2 className="section-title">Language Proficiency</h2>
          <div className="languages-container">
            {resumeData.languages
              .filter(lang => lang.name)
              .map((lang, index) => (
                <div key={index} className="language-item">
                  <span className="language-flag">{getLanguageFlag(lang.name)}</span>
                  <span className="language-name">{lang.name}</span>
                  {lang.proficiency && (
                    <span className={`language-proficiency ${getProficiencyClass(lang.proficiency)}`}>
                      ({lang.proficiency})
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
      
      <div className="preview-toolbar">
        <button className="resume-action-btn" title="Zoom In">🔍+</button>
        <button className="resume-action-btn" title="Zoom Out">🔍-</button>
      </div>
    </div>
  );
  
  // Select the appropriate template to render
  const renderTemplate = () => {
    switch(template) {
      case 'minimal':
        return renderMinimalTemplate();
      case 'professional':
        return renderProfessionalTemplate();
      case 'modern':
        return renderModernTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'executive':
        return renderExecutiveTemplate();
      case 'compact':
        return renderCompactTemplate();
      case 'corporate':
        return renderCorporateTemplate();
      default:
        return renderProfessionalTemplate();
    }
  };
  
  // Language proficiency mapping for better visual representation
  const getProficiencyClass = (proficiency) => {
    switch (proficiency.toLowerCase()) {
      case 'beginner':
        return 'beginner';
      case 'intermediate':
        return 'intermediate';
      case 'advanced':
        return 'advanced';
      case 'fluent':
        return 'fluent';
      case 'native':
        return 'native';
      default:
        return '';
    }
  };

  // Language flag mapping (using emoji for now, can be extended with actual flag icons)
  const getLanguageFlag = (language) => {
    const flags = {
      'english': '🇺🇸',
      'spanish': '🇪🇸',
      'french': '🇫🇷',
      'german': '🇩🇪',
      'chinese': '🇨🇳',
      'japanese': '🇯🇵',
      'korean': '🇰🇷',
      'portuguese': '🇵🇹',
      'italian': '🇮🇹',
      'russian': '🇷🇺',
      'arabic': '🇸🇦',
      'hindi': '🇮🇳'
    };
    
    const langKey = language.toLowerCase();
    return flags[langKey] || '🌐';
  };

  return (
    <div className="resume-preview-container">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
