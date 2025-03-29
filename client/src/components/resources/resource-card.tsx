import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
      <div className="h-48 overflow-hidden relative">
        {/* Using a div with background image instead of an img tag to avoid binary files */}
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: `url(${resource.imageUrl})` }}
          aria-label={resource.title}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <span className="text-white p-4 font-medium">{resource.category}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 font-inter text-neutral-800">{resource.title}</h3>
        <p className="text-neutral-600 mb-4 line-clamp-3">{resource.description}</p>
        <Button 
          variant="link" 
          className="text-primary-600 hover:text-primary-700 p-0 h-auto font-medium"
          asChild
        >
          <Link href={`/resources/${resource.id}`}>
            <a className="flex items-center">
              <span>Learn more</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Link>
        </Button>
      </div>
    </Card>
  );
}
