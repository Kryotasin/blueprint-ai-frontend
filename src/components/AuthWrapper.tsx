'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { loginSuccess, loginFailure } from '@/store/authSlice';
import { authService } from '@/services/auth';
import FigmaTreeView from '@/components/FigmaTreeView';

export default function AuthWrapper() {
    const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await authService.checkAuth();
                dispatch(loginSuccess(userData.user));
            } catch (err) {
                dispatch(loginFailure('Not authenticated'));
                router.push('/login');
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [dispatch, router]);

    if (isChecking || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <div>Redirecting to login...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">Figma to Code</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                            <button
                                onClick={() => authService.logout()}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <FigmaTreeView />
                </div>
            </main>
        </div>
    );
}