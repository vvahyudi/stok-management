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
				.select("id, username, picture, role, created_at")
				.range(offset, offset + limit - 1)
				.order(sortColumn, { ascending: sortType })
				.like("username", `%${search}%`)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	getUserById: (id) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_users")
				.select("*")
				.eq("id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	addUser: (data) =>
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
	updateUser: (id, data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_users")
				.update(data)
				.eq("id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	deleteUser: (id) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_users")
				.delete()
				.eq("id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
}
