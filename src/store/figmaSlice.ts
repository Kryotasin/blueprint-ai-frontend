import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: FigmaState = {
    fileTree: null,
    selectedFile: null,
    selectedPage: null,
    selectedComponent: null,
    componentData: null,
    loading: false,
    error: null,
};

const figmaSlice = createSlice({
    name: 'figma',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setFileTree: (state, action: PayloadAction<TreeNode>) => {
            state.fileTree = action.payload;
        },
        setSelectedFile: (state, action: PayloadAction<string>) => {
            state.selectedFile = action.payload;
            // Clear downstream selections
            state.selectedPage = null;
            state.selectedComponent = null;
            state.componentData = null;
        },
        setSelectedPage: (state, action: PayloadAction<string>) => {
            state.selectedPage = action.payload;
            // Clear component selection
            state.selectedComponent = null;
            state.componentData = null;
        },
        setSelectedComponent: (state, action: PayloadAction<string>) => {
            state.selectedComponent = action.payload;
        },
        setComponentData: (state, action: PayloadAction<any>) => {
            state.componentData = action.payload;
        },
        clearSelections: (state) => {
            state.selectedFile = null;
            state.selectedPage = null;
            state.selectedComponent = null;
            state.componentData = null;
        },
    },
});

export const {
    setLoading,
    setError,
    clearError,
    setFileTree,
    setSelectedFile,
    setSelectedPage,
    setSelectedComponent,
    setComponentData,
    clearSelections,
} = figmaSlice.actions;

export default figmaSlice.reducer;