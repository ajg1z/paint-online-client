import { PageLoader } from "components/PageLoader";
import { $api, apiClassic } from "config/axios";
import { LocalStorageTokenKey } from "constans/localStorage";
import { useEffect, useState } from "react";
import UserStore from "User";
import { AppRouter } from "./providers/router";
import "./styles//index.scss";

export const App = () => {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await $api.get(`/auth/check-auth`);
				if (res.data) {
					UserStore.setUser(res.data.user);
					localStorage.setItem(LocalStorageTokenKey, res.data.accessToken);
				} else {
					throw new Error();
				}
			} catch (e) {
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);

	return (
		<div className="app">{isLoading ? <PageLoader /> : <AppRouter />}</div>
	);
};
