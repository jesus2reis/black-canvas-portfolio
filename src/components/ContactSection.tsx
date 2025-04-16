
import React from 'react';

interface ContactSectionProps {
  title?: string;
  email?: string;
  linkedin?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Contact",
  email = "hola@jesusdosreis.com",
  linkedin = "LinkedIn"
}) => {
  return (
    <div className="py-12 px-6 border-b border-white/10">
      <h2 className="text-xl mb-6">{title}</h2>
      <div className="space-y-4">
        <div>
          <a 
            href={`mailto:${email}`}
            className="text-lg hover:underline"
          >
            {email}
          </a>
        </div>
        <div>
          <a 
            href="https://linkedin.com/in/username" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg hover:underline"
          >
            {linkedin}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
