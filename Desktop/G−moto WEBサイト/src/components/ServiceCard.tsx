import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, link }) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
      <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center text-primary font-semibold hover:text-primary-hover transition-colors"
      >
        詳しくはこちら
        <ArrowRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  );
};

export default ServiceCard;