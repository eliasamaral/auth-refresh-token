import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidG9rZW4iLCJpYXQiOjE3NjAwNTcyNDQsImV4cCI6MTc2MDA1OTA0NCwic3ViIjoiYWZlZjJmN2QtYTBiNS00ODQ2LTkzOGQtZmM4ZjgyZGM5NzRmIn0.nwwifaD_z4JzQmqcapId6edSnVAaK7guJ-475vBrurY"; // seu JWT

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
