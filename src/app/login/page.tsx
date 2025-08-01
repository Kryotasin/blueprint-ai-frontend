'use client';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure } from '@/store/authSlice';
import { authService } from '@/services/auth';

export default function LoginPage() {
    const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    // Check if already authenticated on page load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                dispatch(loginStart());
                const userData = await authService.checkAuth();
                dispatch(loginSuccess(userData.user));
            } catch (err) {
                dispatch(loginFailure('Not authenticated'));
            }
        };

        checkAuth();
    }, [dispatch]);

    const handleFigmaLogin = () => {
        authService.loginWithFigma();
    };

    if (isAuthenticated) {
        // Redirect to main app
        window.location.href = '/';
        return <div>Redirecting...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Figma to Code
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Convert your Figma designs to React components
                    </p>
                </div>

                <div>
                    <button
                        onClick={handleFigmaLogin}
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Checking...' : 'Login with Figma'}
                    </button>

                    {error && (
                        <p className="mt-2 text-center text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}