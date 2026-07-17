import { FileText } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
        {icon || <FileText className="w-7 h-7 text-gray-400" />}
      </div>
      <h3 className="text-lg font-medium text-gray-600">{title}</h3>
      <p className="mt-1 text-sm text-gray-400 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
