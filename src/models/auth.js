const supabase = require("../config/supabase")

module.exports = {
	register: (data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_users")
				.insert(data)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	getUserByUsername: (username) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_users")
				.select("*")
				.eq("username", username)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
}
