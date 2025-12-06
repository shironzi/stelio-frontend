import api from "./axios";

/**
 * Login Request
 * --------------------
 * @param email
 * @param password
 * @returns {number} HTTP status code (e.g., 200 on success)
 *
 * - On Success, Stores the JWT token to local storage.
 * - On Error, Returns the status code and should handle by the caller.
 */

export async function login(email: string, password: string) {
	try {
		const res = await api.post("/auth/login", { email, password });

		const data = res.data;
		localStorage.setItem("token", data.token);

		console.log(data)

		return data;
	} catch (err: any) {
		if (
			err.response &&
			(err.response.status === 401 || err.response.status === 403)
		) {
			throw new Error(
				err.response.data.message || "Invalid email or password."
			);
		} else {
			throw new Error("Something went wrong. Please try again.");
		}
	}
}

export async function register(
	firstname: string,
	lastname: string,
	email: string,
	password: string,
	confirmPassword: string
) {
	try {
		const res = await api.post("/auth/register", {
			firstname,
			lastname,
			email,
			password,
			confirmPassword,
		});

		return res;
	} catch (err: any) {
		const objects = err.response.data.messages;
		const firstMessage = Object.values(objects)[0];
		throw new Error(
			typeof firstMessage === "string"
				? firstMessage
				: "Something went wrong.Please try again."
		);
	}
}

export const logout = async () => {
	try {
		const res = await api.post("/auth/logout");
		localStorage.removeItem("token");

		window.location.reload();

		return res;
	} catch (err: any) {
		throw new Error(err.response.data.messages);
	}
};

export const verifyToken = async () => {
	try {
		const { data } = await api.post("/auth/verify");

		return data;
	} catch (err: any) {
		localStorage.removeItem("token");
		throw new Error(err.response.data.message);
	}
};
