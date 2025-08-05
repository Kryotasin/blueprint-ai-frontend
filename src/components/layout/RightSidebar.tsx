'use client';

interface RightSidebarProps {
  width: number;
}

export function RightSidebar({ width }: RightSidebarProps) {
  return (
    <div 
      className="border-l border-border bg-background flex flex-col"
      style={{ width: `${width}px` }}
    >
      {/* Sidebar Header */}
      <div className="h-12 border-b border-border px-4 flex items-center">
        <h3 className="font-medium text-sm">Properties</h3>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Placeholder content */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Component Details</h4>
            <div className="space-y-2">
              <div className="p-2 bg-muted rounded text-xs">
                Property 1: Value
              </div>
              <div className="p-2 bg-muted rounded text-xs">
                Property 2: Value
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Settings</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Option 1</span>
                <input type="checkbox" className="w-3 h-3" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Option 2</span>
                <input type="checkbox" className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Properties panel placeholder */}
        <div className="mt-4 p-3 border border-dashed border-border rounded-lg">
          <p className="text-xs text-muted-foreground">
            Component properties and inspector will go here
          </p>
        </div>
      </div>
    </div>
  );
}