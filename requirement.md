Backend inventory management 2 roles

1. admin

- melihat product (R)
- manage user/login (CRUD)
- melihat history stock (R)

2. operator

- manage product (CRUD)
- manage history stock (CR)

tbl_product

- id
- name
- price
- description
- picture
- stock (tidak bisa diupdate secara langsung)

tbl_history_stock

- id
- date
- product_id
- type (0=stock in, 1=stock out, 2=stock update)
- qty
- note

tbl_product 1 indomie 2500 null indomie.png 7 tbl_history_stock 1 28agustus 1 0 10 "barang masuk dari gudang" 2 28agustus 1 1 3 "barang terjual"

0. get data req.body {product_id, qty: 10, remark, type} manggil model product
1. get data product berdasarkan product_id = {name, price, stock: 100, description, ....}
2. get field stock dari data product, 100
3. total = (type: stock out) field stock dari data product - qty total = 90
4. update stock di tbl_product, UPDATE product set stock=total where id=product_id
5. insert data ke tbl_stock_history => {product_id, qty: 10, remark, type}
