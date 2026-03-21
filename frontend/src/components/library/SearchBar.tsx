'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full ps-12 pe-4 py-4 bg-white border-2 border-sand-200 rounded-xl text-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all placeholder:text-sand-400"
      />
    </div>
  );
}
