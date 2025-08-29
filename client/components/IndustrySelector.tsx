import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown, Factory } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  { code: "A01", name: "Agriculture, Forestry and Fishing", category: "Primary" },
  { code: "A011", name: "Crop and Animal Production", category: "Primary" },
  { code: "A012", name: "Forestry and Logging", category: "Primary" },
  { code: "A013", name: "Fishing and Aquaculture", category: "Primary" },
  { code: "B", name: "Mining and Quarrying", category: "Primary" },
  { code: "B05", name: "Mining of Coal and Lignite", category: "Primary" },
  { code: "B06", name: "Extraction of Crude Petroleum and Natural Gas", category: "Primary" },
  { code: "B07", name: "Mining of Metal Ores", category: "Primary" },
  { code: "B08", name: "Other Mining and Quarrying", category: "Primary" },
  { code: "C10", name: "Food Products Manufacturing", category: "Manufacturing" },
  { code: "C11", name: "Beverage Manufacturing", category: "Manufacturing" },
  { code: "C12", name: "Tobacco Products Manufacturing", category: "Manufacturing" },
  { code: "C13", name: "Textile Manufacturing", category: "Manufacturing" },
  { code: "C14", name: "Wearing Apparel Manufacturing", category: "Manufacturing" },
  { code: "C15", name: "Leather and Related Products", category: "Manufacturing" },
  { code: "C16", name: "Wood and Wood Products", category: "Manufacturing" },
  { code: "C17", name: "Paper and Paper Products", category: "Manufacturing" },
  { code: "C18", name: "Printing and Reproduction", category: "Manufacturing" },
  { code: "C19", name: "Coke and Refined Petroleum Products", category: "Manufacturing" },
  { code: "C20", name: "Chemical and Chemical Products", category: "Manufacturing" },
  { code: "C21", name: "Pharmaceutical Products", category: "Manufacturing" },
  { code: "C22", name: "Rubber and Plastic Products", category: "Manufacturing" },
  { code: "C23", name: "Non-metallic Mineral Products", category: "Manufacturing" },
  { code: "C24", name: "Basic Metals", category: "Manufacturing" },
  { code: "C25", name: "Fabricated Metal Products", category: "Manufacturing" },
  { code: "C26", name: "Computer, Electronic and Optical Products", category: "Manufacturing" },
  { code: "C27", name: "Electrical Equipment", category: "Manufacturing" },
  { code: "C28", name: "Machinery and Equipment", category: "Manufacturing" },
  { code: "C29", name: "Motor Vehicles and Trailers", category: "Manufacturing" },
  { code: "C30", name: "Other Transport Equipment", category: "Manufacturing" },
  { code: "C31", name: "Furniture Manufacturing", category: "Manufacturing" },
  { code: "C32", name: "Other Manufacturing", category: "Manufacturing" },
  { code: "C33", name: "Repair and Installation of Machinery", category: "Manufacturing" },
  { code: "D35", name: "Electricity, Gas, Steam and Air Conditioning", category: "Utilities" },
  { code: "E36", name: "Water Collection, Treatment and Supply", category: "Utilities" },
  { code: "E37", name: "Sewerage", category: "Utilities" },
  { code: "E38", name: "Waste Collection, Treatment and Disposal", category: "Utilities" },
  { code: "E39", name: "Remediation and Waste Management", category: "Utilities" },
  { code: "F41", name: "Construction of Buildings", category: "Construction" },
  { code: "F42", name: "Civil Engineering", category: "Construction" },
  { code: "F43", name: "Specialized Construction Activities", category: "Construction" },
  { code: "G45", name: "Motor Vehicle and Motorcycle Trade", category: "Trade" },
  { code: "G46", name: "Wholesale Trade", category: "Trade" },
  { code: "G47", name: "Retail Trade", category: "Trade" },
  { code: "H49", name: "Land Transport and Pipelines", category: "Transportation" },
  { code: "H50", name: "Water Transport", category: "Transportation" },
  { code: "H51", name: "Air Transport", category: "Transportation" },
  { code: "H52", name: "Warehousing and Support Activities", category: "Transportation" },
  { code: "H53", name: "Postal and Courier Activities", category: "Transportation" },
  { code: "I55", name: "Accommodation", category: "Hospitality" },
  { code: "I56", name: "Food and Beverage Service Activities", category: "Hospitality" },
  { code: "J58", name: "Publishing Activities", category: "Information" },
  { code: "J59", name: "Motion Picture, Video and Television", category: "Information" },
  { code: "J60", name: "Programming and Broadcasting", category: "Information" },
  { code: "J61", name: "Telecommunications", category: "Information" },
  { code: "J62", name: "Computer Programming and Consultancy", category: "Information" },
  { code: "J63", name: "Information Service Activities", category: "Information" },
  { code: "K64", name: "Financial Service Activities", category: "Finance" },
  { code: "K65", name: "Insurance and Pension Funding", category: "Finance" },
  { code: "K66", name: "Financial and Insurance Support", category: "Finance" },
  { code: "L68", name: "Real Estate Activities", category: "Real Estate" },
  { code: "M69", name: "Legal and Accounting Activities", category: "Professional" },
  { code: "M70", name: "Head Offices and Management Consultancy", category: "Professional" },
  { code: "M71", name: "Architectural and Engineering Activities", category: "Professional" },
  { code: "M72", name: "Scientific Research and Development", category: "Professional" },
  { code: "M73", name: "Advertising and Market Research", category: "Professional" },
  { code: "M74", name: "Other Professional and Technical Activities", category: "Professional" },
  { code: "M75", name: "Veterinary Activities", category: "Professional" },
  { code: "N77", name: "Rental and Leasing Activities", category: "Business Services" },
  { code: "N78", name: "Employment Activities", category: "Business Services" },
  { code: "N79", name: "Travel Agency and Tour Operator", category: "Business Services" },
  { code: "N80", name: "Security and Investigation Activities", category: "Business Services" },
  { code: "N81", name: "Services to Buildings and Landscape", category: "Business Services" },
  { code: "N82", name: "Office Administrative and Support", category: "Business Services" },
  { code: "O84", name: "Public Administration and Defence", category: "Public" },
  { code: "P85", name: "Education", category: "Education" },
  { code: "Q86", name: "Human Health Activities", category: "Healthcare" },
  { code: "Q87", name: "Residential Care Activities", category: "Healthcare" },
  { code: "Q88", name: "Social Work Activities", category: "Healthcare" },
  { code: "R90", name: "Creative, Arts and Entertainment", category: "Entertainment" },
  { code: "R91", name: "Libraries, Museums and Cultural", category: "Entertainment" },
  { code: "R92", name: "Gambling and Betting Activities", category: "Entertainment" },
  { code: "R93", name: "Sports and Recreation Activities", category: "Entertainment" },
  { code: "S94", name: "Membership Organizations", category: "Other Services" },
  { code: "S95", name: "Repair of Computers and Personal Goods", category: "Other Services" },
  { code: "S96", name: "Other Personal Service Activities", category: "Other Services" },
  { code: "T97", name: "Household as Employers", category: "Other Services" },
  { code: "T98", name: "Undifferentiated Goods and Services", category: "Other Services" },
  { code: "U99", name: "Extraterritorial Organizations", category: "Other Services" },
  
  // Additional Technology and Modern Industries
  { code: "TECH01", name: "Software Development", category: "Technology" },
  { code: "TECH02", name: "Artificial Intelligence and Machine Learning", category: "Technology" },
  { code: "TECH03", name: "Cybersecurity", category: "Technology" },
  { code: "TECH04", name: "Cloud Computing Services", category: "Technology" },
  { code: "TECH05", name: "Data Analytics and Big Data", category: "Technology" },
  { code: "TECH06", name: "Mobile App Development", category: "Technology" },
  { code: "TECH07", name: "E-commerce and Digital Platforms", category: "Technology" },
  { code: "TECH08", name: "Blockchain and Cryptocurrency", category: "Technology" },
  { code: "TECH09", name: "Internet of Things (IoT)", category: "Technology" },
  { code: "TECH10", name: "Gaming and Interactive Media", category: "Technology" },
  
  // Green and Renewable Energy
  { code: "GREEN01", name: "Solar Energy", category: "Renewable Energy" },
  { code: "GREEN02", name: "Wind Energy", category: "Renewable Energy" },
  { code: "GREEN03", name: "Hydroelectric Power", category: "Renewable Energy" },
  { code: "GREEN04", name: "Geothermal Energy", category: "Renewable Energy" },
  { code: "GREEN05", name: "Biomass and Biofuel", category: "Renewable Energy" },
  { code: "GREEN06", name: "Energy Storage Solutions", category: "Renewable Energy" },
  { code: "GREEN07", name: "Electric Vehicle Manufacturing", category: "Renewable Energy" },
  { code: "GREEN08", name: "Sustainable Agriculture", category: "Renewable Energy" },
  { code: "GREEN09", name: "Carbon Capture and Storage", category: "Renewable Energy" },
  { code: "GREEN10", name: "Environmental Consulting", category: "Renewable Energy" },
  
  // Biotechnology and Life Sciences
  { code: "BIO01", name: "Biotechnology Research", category: "Life Sciences" },
  { code: "BIO02", name: "Medical Devices", category: "Life Sciences" },
  { code: "BIO03", name: "Gene Therapy", category: "Life Sciences" },
  { code: "BIO04", name: "Precision Medicine", category: "Life Sciences" },
  { code: "BIO05", name: "Agricultural Biotechnology", category: "Life Sciences" },
  { code: "BIO06", name: "Regenerative Medicine", category: "Life Sciences" },
  { code: "BIO07", name: "Bioinformatics", category: "Life Sciences" },
  { code: "BIO08", name: "Clinical Research", category: "Life Sciences" },
  { code: "BIO09", name: "Nutraceuticals", category: "Life Sciences" },
  { code: "BIO10", name: "Biomanufacturing", category: "Life Sciences" }
];

const categories = [
  "Primary", "Manufacturing", "Utilities", "Construction", "Trade", "Transportation", 
  "Hospitality", "Information", "Finance", "Real Estate", "Professional", 
  "Business Services", "Public", "Education", "Healthcare", "Entertainment", 
  "Other Services", "Technology", "Renewable Energy", "Life Sciences"
];

interface IndustrySelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export default function IndustrySelector({ value, onValueChange, placeholder = "Select your industry" }: IndustrySelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIndustries = useMemo(() => {
    if (!searchTerm) return industries;
    return industries.filter(industry =>
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const groupedIndustries = useMemo(() => {
    const grouped: Record<string, typeof industries> = {};
    categories.forEach(category => {
      grouped[category] = filteredIndustries.filter(industry => industry.category === category);
    });
    return grouped;
  }, [filteredIndustries]);

  const selectedIndustry = industries.find(industry => industry.code === value);

  return (
    <div className="space-y-2">
      <Label htmlFor="industry" className="flex items-center space-x-2">
        <Factory className="h-4 w-4" />
        <span>Industry Sector</span>
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10"
          >
            {selectedIndustry ? selectedIndustry.name : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search industries..." 
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandEmpty>No industry found.</CommandEmpty>
            <div className="max-h-80 overflow-auto">
              {categories.map((category) => {
                const categoryIndustries = groupedIndustries[category];
                if (categoryIndustries.length === 0) return null;
                
                return (
                  <CommandGroup key={category} heading={category}>
                    {categoryIndustries.map((industry) => (
                      <CommandItem
                        key={industry.code}
                        value={industry.code}
                        onSelect={(currentValue) => {
                          onValueChange(currentValue === value ? "" : currentValue);
                          setOpen(false);
                          setSearchTerm("");
                        }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{industry.name}</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === industry.code ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
