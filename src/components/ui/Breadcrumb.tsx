import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center p-4" dir="rtl">
      <ol className="flex items-center space-x-2 space-x-reverse">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronLeft className="w-4 h-4 mx-2 text-gray-400" />
            )}
            <li>
              {item.href ? (
                <Link
                  to={item.href}
                  className="text-sm text-gray-600 hover:text-orange-500 font-tajawal-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm text-gray-900 font-tajawal-medium">
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
} 