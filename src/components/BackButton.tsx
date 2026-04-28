import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button"
import FadeUp from "@/components/FadeUp";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const BackButton = ({ onClick, className = "", children = "Back" }: BackButtonProps) => {
  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };

  return (
    <FadeUp>
      <div className="w-full h-auto flex justify-start">
        <Button
          onClick={handleBack}
          className={`cursor-pointer ${className}`}
        >
          <ChevronLeft />
          {children}
        </Button>
      </div>
    </FadeUp >
  );
};

export default BackButton;