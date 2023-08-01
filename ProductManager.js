import fs from 'fs';

class ProductManager {
	constructor(path) {
		this.products = [];
		this.path = path;
	}

	addProduct(product) {
		this.readFile();
		const { title, description, price, thumbnail, code, stock } = product;

		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.log(
				'Complete los campos obligatorios'
			);
			return;
		}

		this.products.find(element => element.code == product.code)
			? console.log('Código ya ingresado')
			: this.products.push(product);

		let writeProducts = JSON.stringify(this.products);
		fs.writeFileSync(this.path, writeProducts);
	}

	getProducts() {
		this.readFile();
		return this.products;
	}

	getProductById(id) {
		this.readFile();
		return this.products.find(product => product.id == id) ?? console.log('Not Found');
	}

	updateProducts(id, update) {
		this.readFile();
		let product = this.products.find(prod => prod.id == id);
		let keys = Object.keys(update);
		keys.map(key => key !== 'id' && (product[key] = update[key]));
		let writeProducts = JSON.stringify(this.products);
		fs.writeFileSync(this.path, writeProducts);
	}

	deleteProduct(id) {
		this.readFile();
		this.products = this.products.filter(prod => prod.id !== id);
		let writeProducts = JSON.stringify(this.products);
		fs.writeFileSync(this.path, writeProducts);
	}

	readFile() {
		let resultado = fs.readFileSync(this.path, 'utf-8');
		this.products = JSON.parse(resultado);
	}
}

class Product {
	constructor({ title, description, price, thumbnail, code, stock }) {
		this.title = title;
		this.description = description;
		this.price = price;
		this.thumbnail = thumbnail;
		this.code = code;
		this.stock = stock;
		this.id = Product.incrementarID();
	}

	static incrementarID() {
		this.idIncrement ? this.idIncrement++ : (this.idIncrement = 1);
		return this.idIncrement;
	}
}

// Crear el manager
const productManager = new ProductManager('./products.txt');

// Añadir productos
productManager.addProduct(
	new Product({
		title: 'Este es un producto prueba',
		description: 'Un producto',
		price: 200,
		thumbnail: 'Sin imagen',
		code: "abc123",
		stock: 25,
	})
);
productManager.addProduct(
	new Product({
		title: 'Este es un producto prueba',
		description: 'Un producto',
		price: 200,
		thumbnail: 'Sin imagen',
		code: "abc200",
		stock: 25,
	})
);

productManager.addProduct(
	new Product({
		title: 'Este es un producto prueba',
		description: 'Un producto',
		price: 200,
		thumbnail: 'Sin imagen',
		code: "abc300",
		stock: 25,
	})
);

// Añadir producto con mismo codigo
productManager.addProduct(
	new Product({
		title: 'Este es un producto prueba',
		description: 'Un producto',
		price: 200,
		thumbnail: 'Sin imagen',
		code: "abc123",
		stock: 25,
	})
);

// Productos
let products = productManager.getProducts();
console.log('Todos los productos: ', products);
// By ID
console.log('Producto id 2: ', productManager.getProductById(2));
// Eliminar producto
productManager.deleteProduct(3);
// Actualizar producto
productManager.updateProducts(2, { title: 'Hola Lucía', stock: 1 });
// mostrar productos
products = productManager.getProducts();
console.log('Lista de productos: ', products);