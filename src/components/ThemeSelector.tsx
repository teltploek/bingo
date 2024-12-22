"use client";

import { themes } from "@/lib/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ThemeSelectorProps = {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
};

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <Select value={currentTheme} onValueChange={onThemeChange}>
      <SelectTrigger 
        className={`w-[180px] ${
          currentTheme === 'christmas' 
            ? 'border-[#f4f0ec] text-[#f4f0ec] bg-[#034a21]' 
            : ''
        }`}
      >
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem 
            key={theme.id} 
            value={theme.id}
          >
            {theme.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}