
interface EmailTemplateProps {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export  function EmailTemplate({
  fullName,
  email,
  subject,
  message,
}: EmailTemplateProps){return  (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h1 style={{ color: '#1f2937', marginBottom: '20px', fontSize: '24px' }}>
        New Contact Message - VerifyPlace
      </h1>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
        <h2 style={{ color: '#374151', fontSize: '18px', marginBottom: '15px' }}>
          Contact Details
        </h2>
        
        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#1f2937' }}>Name:</strong>
          <span style={{ marginLeft: '10px', color: '#4b5563' }}>{fullName}</span>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#1f2937' }}>Email:</strong>
          <span style={{ marginLeft: '10px', color: '#4b5563' }}>{email}</span>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <strong style={{ color: '#1f2937' }}>Subject:</strong>
          <span style={{ marginLeft: '10px', color: '#4b5563' }}>{subject}</span>
        </div>
        
        <div>
          <strong style={{ color: '#1f2937', display: 'block', marginBottom: '10px' }}>
            Message:
          </strong>
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '15px', 
            borderRadius: '4px', 
            border: '1px solid #e5e7eb',
            color: '#374151',
            lineHeight: '1.6'
          }}>
            {message}
          </div>
        </div>
      </div>
      
      <div style={{ 
        fontSize: '12px', 
        color: '#6b7280', 
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb',
        paddingTop: '15px'
      }}>
        This message was sent from the VerifyPlace contact form.
      </div>
    </div>
  </div>
)};