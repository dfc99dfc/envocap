import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLink?: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  backLink = "/" 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-verdant-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/">
            <Logo size="md" />
          </Link>
          <Link to={backLink}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </nav>
      </header>

      {/* Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-lg border-0">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-verdant-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Construction className="h-8 w-8 text-verdant-700" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                {description}
              </p>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  This page is part of the ENVOCAP demo flow. Continue prompting to have this page built out with full functionality.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={backLink}>
                    <Button variant="outline">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Go Back
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button className="bg-verdant-700 hover:bg-verdant-800">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
