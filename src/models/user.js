const supabase = require("../config/supabase")

module.exports = {
	getCountUser: () =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_users")
				.select("*", { count: "exact" })
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	getAllUser: (offset, limit, sortColumn, search, sortType) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_users")
				.select("*")
				.range(offset, offset + limit - 1)
				.order(sortColumn, { ascending: sortType })
				.like("role", `%${search}%`)
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
