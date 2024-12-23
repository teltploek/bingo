// src/components/Header.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  onInstructionsClick: () => void;
  currentTheme: string;
  isGameActive: boolean;
}

const Header = ({ onInstructionsClick, currentTheme, isGameActive }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInstructionsClick = () => {
    setIsOpen(false);
    onInstructionsClick();
  };

  const handlePrintClick = () => {
    setIsOpen(false);
    window.open('/print', '_blank');
  };

  const buttonClassName =
    currentTheme === 'christmas'
      ? 'border-[#f4f0ec] text-[#f4f0ec] bg-[#034a21] hover:bg-[#c41e3a] hover:text-[#f4f0ec]'
      : 'bg-white hover:bg-gray-100';

  return (
    <div
      className={`
      fixed top-6 right-6 z-[100]
      transition-all duration-500 ease-in-out
      ${isGameActive ? 'opacity-0 invisible' : 'opacity-100 visible'}
    `}
    >
      {/* Desktop buttons */}
      <div className="hidden md:flex gap-4">
        <Button
          onClick={onInstructionsClick}
          variant="outline"
          size="lg"
          className={buttonClassName}
        >
          Sådan fungerer spillet
        </Button>

        <Button
          onClick={() => window.open('/print', '_blank')}
          variant="outline"
          size="lg"
          className={buttonClassName}
        >
          Print plader
        </Button>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`${buttonClassName} ${isOpen ? 'hidden' : ''}`}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className={currentTheme === 'christmas' ? 'bg-[#034a21] border-[#f4f0ec]' : 'bg-white'}
            closeClassName={currentTheme === 'christmas' ? '!text-[#f4f0ec]' : ''}
          >
            <SheetHeader>
              <SheetTitle className={currentTheme === 'christmas' ? 'text-[#f4f0ec]' : ''}>
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              <Button
                onClick={handleInstructionsClick}
                variant="outline"
                size="lg"
                className={`w-full ${buttonClassName}`}
              >
                Sådan fungerer spillet
              </Button>

              <Button
                onClick={handlePrintClick}
                variant="outline"
                size="lg"
                className={`w-full ${buttonClassName}`}
              >
                Print plader
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
