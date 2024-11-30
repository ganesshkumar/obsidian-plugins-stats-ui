import { Tooltip } from "flowbite-react";
import { CheckCircle, Edit, Folder, Frown, RefreshCw, Clock, Code, PieChart, PenTool, Shield, Sliders, HelpCircle, Users, Book, Box } from "react-feather";

const Categories = [
  "Task Management", 
  "File Management", 
  "Note Enhancements", 
  "Data Visualization", 
  "3rd Party Integrations", 
  "Productivity Tools", 
  "Coding & Technical Tools", 
  "Creative & Writing Tools", 
  "Privacy & Security", 
  "Customization & UI", 
  "Collaboration & Sharing", 
  "Learning & Knowledge Management", 
  "Miscellaneous", 
  "Uncategorized", 
]

const CategoryAssets = {
  "Task Management": {
    icon: <Tooltip content='Task Management Plugin'>
      <CheckCircle className="text-green-400" size={48} />
    </Tooltip>
  }, 
  "File Management": {
    icon: <Tooltip content='File Management Plugin'>
      <Folder className="text-blue-500" size={48} />
    </Tooltip>
  }, 
  "Note Enhancements": {
    icon: <Tooltip content='Note Enhancements Plugin'>
      <Edit className="text-yellow-400" size={48} />
    </Tooltip>
  }, 
  "Data Visualization": {
    icon: <Tooltip content='Data Visualization Plugin'>
      <PieChart className="text-orange-500" size={48} />
    </Tooltip>
  }, 
  "3rd Party Integrations": {
    icon: <Tooltip content='3rd Party Integrations Plugin'>
      <RefreshCw className="text-cyan-400" size={48} />
    </Tooltip>
  }, 
  "Productivity Tools": {
    icon: <Tooltip content='Productivity Tools Plugin'>
      <Clock className="text-lime-400" size={48} />
    </Tooltip>
  }, 
  "Coding & Technical Tools": {
    icon: <Tooltip content='Coding & Technical Tools Plugin'>
      <Code className="text-teal-500" size={48} />
    </Tooltip>
  }, 
  "Creative & Writing Tools": {
    icon: <Tooltip content='Creative & Writing Tools Plugin'>
      <PenTool className="text-pink-400" size={48} />
    </Tooltip>
  }, 
  "Privacy & Security": {
    icon: <Tooltip content='Privacy & Security Plugin'>
      <Shield className="text-gray-500" size={48} />
    </Tooltip>
  }, 
  "Customization & UI": {
    icon: <Tooltip content='Customization & UI Plugin'>
      <Sliders className="text-indigo-400" size={48} />
    </Tooltip>
  }, 
  "Collaboration & Sharing": {
    icon: <Tooltip content='Collaboration & Sharing Plugin'>
      <Users className="text-amber-400" size={48} />
    </Tooltip>
  }, 
  "Learning & Knowledge Management": {
    icon: <Tooltip content='Learning & Knowledge Management Plugin'>
      <Book className="text-emerald-400" size={48} />
    </Tooltip>
  }, 
  "Miscellaneous": {
    icon: <Tooltip content='Miscellaneous Plugin'>
      <Box className="text-rose-400" size={48} />
    </Tooltip>
  }, 
  "Uncategorized": {
    icon: <Tooltip content='Uncategorized Plugin'>
      <HelpCircle className="text-neutral-400" size={48} />
    </Tooltip>
  },
  "default": {
    icon: <Tooltip content='Uncategorized Plugin'>
      <Frown className="text-red-400" size={48} />
    </Tooltip>
  }
}



export const CategoryIcon = ({ category }: { category: string }) => {
  return CategoryAssets[category]?.icon || CategoryAssets.default.icon;
};