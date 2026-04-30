import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isSimplifiedMode: boolean;
  setIsSimplifiedMode: (mode: boolean) => void;
  isHighAccessibility: boolean;
  setIsHighAccessibility: (mode: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isSimplifiedMode, setIsSimplifiedMode] = useState(false);
  const [isHighAccessibility, setIsHighAccessibility] = useState(false);

  return (
    <UIContext.Provider value={{ 
      isSimplifiedMode, 
      setIsSimplifiedMode,
      isHighAccessibility,
      setIsHighAccessibility
    }}>
      <div className={`
        ${isHighAccessibility ? 'accessibility-enhanced' : ''}
        ${isSimplifiedMode ? 'simplified-mode' : ''}
      `}>
        {children}
      </div>
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
