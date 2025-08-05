'use client';

import { useAppSelector } from '@/store/hooks';
import { AppHeader } from './AppHeader';
import { AppToolbar } from './AppToolbar';
import { AppMain } from './AppMain';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isMobile } = useAppSelector((state) => state.layout);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <AppHeader />
      
      {/* Toolbar */}
      <AppToolbar />
      
      {/* Main Content Area */}
      <AppMain>
        {children}
      </AppMain>
    </div>
  );
}