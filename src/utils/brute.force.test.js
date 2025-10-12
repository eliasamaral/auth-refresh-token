import axios from "axios";

const token = ""; // JWT

const test = async () => {
	for (let i = 1; i <= 6; i++) {
		try {
			const res = await axios.get("http://localhost:3000/users", {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log(i, res.data);
		} catch (err) {
			console.log(i, err.response.status, err.response.data);
		}
	}
};

test();
