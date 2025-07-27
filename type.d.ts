// AUTH
interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}


// FIGMA 
interface TreeNode {
    id: string;
    name: string;
    type: string;
    children?: TreeNode[];
}

interface FigmaState {
    fileTree: TreeNode | null;
    selectedFile: string | null;
    selectedPage: string | null;
    selectedComponent: string | null;
    componentData: any | null;
    loading: boolean;
    error: string | null;
}