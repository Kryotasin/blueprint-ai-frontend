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
                className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-100 ${isSelected ? 'bg-blue-100 text-blue-800' : ''
                    }`}
                style={{ paddingLeft: `${level * 20 + 8}px` }}
                onClick={handleClick}
            >
                {node.children && node.children.length > 0 && (
                    <span className="mr-2 text-xs">
                        {isExpanded ? '▼' : '▶'}
                    </span>
                )}
                <span className="text-xs text-gray-500 mr-2 uppercase">
                    {node.type}
                </span>
                <span className="text-sm">{node.name}</span>
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
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Figma File Structure</h2>

            {/* File input for now */}
            <div className="mb-4">
                <input
                    value={url}
                    onChange={(e: any) => {
                        setURL(e.target.value)
                    }}
                    type="url"
                    placeholder="Enter Figma file URL..."
                />
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700" onClick={loadFileFileByUrl}>
                    Load File
                </button>
            </div>

            {/* Tree view */}
            {
                fileTree && Object.keys(fileTree).length > 0 ?
                    (
                        <TreeNode
                            node={fileTree}
                            level={0}
                            onSelect={handleNodeSelect}
                        />
                    )
                    :
                    ''
            }

            {/* Selection display */}
            <div className="mt-4 text-sm text-gray-600">
                <div>Selected File: {selectedFile || 'None'}</div>
                <div>Selected Page: {selectedPage || 'None'}</div>
                <div>Selected Component: {selectedComponent || 'None'}</div>
            </div>
        </div>
    );
}