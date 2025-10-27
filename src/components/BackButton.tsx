import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button"

const BackButton = ({ onClick, className = "", children = "Back" }: { onClick?: () => void; className?: string; children?: React.ReactNode; }) => {
  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="w-full h-auto flex justify-start">
      <Button
        onClick={handleBack}
        className={`cursor-pointer ${className}`}
      >
        <ChevronLeft />
        {children}
      </Button>
    </div>

  );
};

export default BackButton;