import { useState, useEffect } from "react";

const useHideElement = (elementRef: React.RefObject<HTMLDivElement>) => {
  const [showElement, setShowElement] = useState<boolean>(false);
  
  const handlePicker = () => {
    setShowElement((prev) => !prev);
  };

  const handleClickOutside = (event: Event) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setShowElement(false);
      document.removeEventListener('click', handleClickOutside);
    }
  };

  useEffect(() => {
    if (showElement) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showElement]);

  return {showElement, setShowElement}
}

export default useHideElement