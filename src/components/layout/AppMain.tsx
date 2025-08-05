'use client';

import { useAppSelector } from '@/store/hooks';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { MainContent } from './MainContent';

interface AppMainProps {
  children: React.ReactNode;
}

export function AppMain({ children }: AppMainProps) {
  const { 
    leftSidebarCollapsed, 
    rightSidebarCollapsed, 
    leftSidebarWidth, 
    rightSidebarWidth,
    isMobile 
  } = useAppSelector((state) => state.layout);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Sidebar */}
      {!leftSidebarCollapsed && (
        <LeftSidebar width={leftSidebarWidth} />
      )}

      {/* Main Content */}
      <MainContent>
        {children}
      </MainContent>

      {/* Right Sidebar */}
      {!rightSidebarCollapsed && (
        <RightSidebar width={rightSidebarWidth} />
      )}
    </div>
  );
}