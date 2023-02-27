import { ToastProvider } from "components/Toast";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<ToastProvider time={2000} position="bottom-right">
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ToastProvider>
);
