'use client';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSelectedFile, setSelectedPage, setSelectedComponent, setError, setLoading, setFileTree } from '@/store/figmaSlice';
import { figmaService } from '@/services/figma';

interface TreeNodeProps {
    node: {
        id: string;
        name: string;
        type: string;
        children?: any[];
    };
    level: number;
    onSelect: (nodeId: string, nodeType: string) => void;
}

function TreeNode({ node, level, onSelect }: TreeNodeProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { selectedFile, selectedPage, selectedComponent } = useAppSelector((state) => state.figma);


    const isSelected =
        selectedFile === node.id ||
        selectedPage === node.id ||
        selectedComponent === node.id;

    const handleClick = () => {
        onSelect(node.id, node.type);
        if (node.children && node.children.length > 0) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div>
            <div
                className={`flex items-center py-2 px-3 cursor-pointer hover:bg-accent transition-colors ${
                    isSelected ? 'bg-accent text-accent-foreground' : ''
                }`}
                style={{ paddingLeft: `${level * 16 + 12}px` }}
                onClick={handleClick}
            >
                {node.children && node.children.length > 0 && (
                    <span className="mr-2 text-xs text-muted-foreground">
                        {isExpanded ? '▼' : '▶'}
                    </span>
                )}
                
                {/* Icon based on node type */}
                <span className="mr-2 text-xs">
                    {node.type === 'COMPONENT' && '🧩'}
                    {node.type === 'INSTANCE' && '📦'}
                    {node.type === 'FRAME' && '🖼️'}
                    {node.type === 'GROUP' && '📁'}
                    {node.type === 'CANVAS' && '🎨'}
                    {node.type === 'DOCUMENT' && '📄'}
                </span>
                
                <span className={`text-xs mr-2 uppercase font-medium ${
                    node.type === 'COMPONENT' || node.type === 'INSTANCE' 
                        ? 'text-blue-600' 
                        : 'text-muted-foreground'
                }`}>
                    {node.type}
                </span>
                <span className="text-sm truncate">{node.name}</span>
            </div>

            {isExpanded && node.children && (
                <div>
                    {node.children.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            level={level + 1}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FigmaTreeView() {
    const dispatch = useAppDispatch();
    const { fileTree, selectedFile, selectedPage, selectedComponent } = useAppSelector((state) => state.figma);

    const [url, setURL] = useState('');
    const [nodeObj, setNodeObj] = useState({});


    const handleNodeSelect = (nodeId: string, nodeType: string) => {
        switch (nodeType) {
            case 'DOCUMENT':
                dispatch(setSelectedFile(nodeId));
                break;
            case 'CANVAS':
                dispatch(setSelectedPage(nodeId));
                break;
            case 'COMPONENT':
            case 'INSTANCE':
                dispatch(setSelectedComponent(nodeId));
                break;
        }
    };

    const loadFileFileByUrl = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!url) return;

        dispatch(setLoading(true));
        dispatch(setError(''));

        figmaService.loadFile(url).then((res) => {
            console.log(res)
            dispatch(setFileTree(res.tree));
            setNodeObj(res);
        })
            .catch((err) => {
                dispatch(setError(err.message || 'Failed to load file'));
                console.error('Error loading file:', err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            })
    }

    return (
        <div className="h-full flex flex-col">
            {/* File input */}
            <div className="p-4 border-b border-border">
                <div className="space-y-3">
                    <input
                        value={url}
                        onChange={(e: any) => {
                            setURL(e.target.value)
                        }}
                        type="url"
                        placeholder="Enter Figma file URL..."
                        className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button 
                        className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors" 
                        onClick={loadFileFileByUrl}
                    >
                        Load File
                    </button>
                </div>
            </div>

            {/* Tree view */}
            <div className="flex-1 overflow-auto">
                {fileTree && Object.keys(fileTree).length > 0 ? (
                    <TreeNode
                        node={fileTree}
                        level={0}
                        onSelect={handleNodeSelect}
                    />
                ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No file loaded
                    </div>
                )}
            </div>

            {/* Selection display */}
            {(selectedFile || selectedPage || selectedComponent) && (
                <div className="p-4 border-t border-border text-xs text-muted-foreground space-y-1">
                    {selectedFile && <div>File: {selectedFile}</div>}
                    {selectedPage && <div>Page: {selectedPage}</div>}
                    {selectedComponent && <div>Component: {selectedComponent}</div>}
                </div>
            )}
        </div>
    );
}