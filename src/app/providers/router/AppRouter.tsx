import { PageLoader } from 'components/PageLoader';
import { Menu } from 'pages/Menu';
import { NotFoundPage } from 'pages/NotFoundPage';
import { Room } from 'pages/Room';
import { Suspense } from 'react';
import { RouteProps } from 'react-router';
import { Routes, Route } from 'react-router-dom';

export enum AppRoutes {
    Menu = 'menu',
    Room = 'room',
    NotFound = 'notFound',
}

export const RoutePath = {
    [AppRoutes.Menu]: '/',
    [AppRoutes.Room]: '/room',
    [AppRoutes.NotFound]: '*',
};

const RouteConfig: Record<string, RouteProps> = {
    [AppRoutes.Menu]: {
        path: RoutePath[AppRoutes.Menu],
        element: <Menu />,
    },
    [AppRoutes.Room]: {
        path: RoutePath[AppRoutes.Room],
        element: <Room />,
    },
    [AppRoutes.NotFound]: {
        path: RoutePath[AppRoutes.NotFound],
        element: <NotFoundPage />,
    },
};

export const AppRouter = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(RouteConfig).map((route) => (
                    <Route key={route.path} element={route.element} path={route.path} />
                ))}
            </Routes>
        </Suspense>
    );
};
