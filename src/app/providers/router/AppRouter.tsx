import { PageLoader } from "components/PageLoader";
import { Menu } from "pages/Menu";
import { NotFoundPage } from "pages/NotFoundPage";
import { Room, RoomProvider } from "pages/Room";
import { Suspense } from "react";
import { RouteProps } from "react-router";
import { Routes, Route } from "react-router-dom";

export enum AppRoutes {
	Menu = "menu",
	Room = "room",
	NotFound = "notFound",
}

export const RoutePath = {
	[AppRoutes.Menu]: "/",
	[AppRoutes.Room]: "/room/:id/",
	[AppRoutes.NotFound]: "*",
};
``;
const RouteConfig: Record<string, RouteProps> = {
	menu: {
		path: RoutePath[AppRoutes.Menu],
		element: <Menu />,
	},
	room: {
		path: RoutePath[AppRoutes.Room],
		element: (
			<RoomProvider>
				<Room />
			</RoomProvider>
		),
	},
	notFound: {
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
