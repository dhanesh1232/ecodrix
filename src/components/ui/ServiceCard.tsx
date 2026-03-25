"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  image: string;
  className?: string;
}

export const ServiceCard = ({ title, description, icon: Icon, tags, image, className }: ServiceCardProps) => {
  return (
    <div className={cn(
      "group relative h-[400px] rounded-3xl overflow-hidden glass-card transition-all duration-500 hover:-translate-y-2",
      className
    )}>
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/20 opacity-90 group-hover:opacity-100 transition-opacity" />
      
      {/* Glow Effect */}
      <div className="absolute -inset-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[80px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-end z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
          <Icon size={28} />
        </div>
        
        <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-text-muted text-sm leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/50 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Border Glow */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-linear-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </div>
  );
};
