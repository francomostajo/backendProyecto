const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.lastId = 0;
        this.loadProducts();
    }
//carga el json
    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.lastId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }
//guarda los producto en json
    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error al guardar productos:', error);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!(title && description && price && thumbnail && code && stock)) {
                console.error('Todos los campos son obligatorios.');
                return;
            }

            if (this.products.some(p => p.code === code)) {
                console.error('El código de producto ya existe.');
                return;
            }

            this.lastId++;
            const product = {
                id: this.lastId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            this.products.push(product);
            await this.saveProducts();
            console.log('Producto agregado:', product);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error('Producto no encontrado.');
        }
        return product;
    }

    async updateProduct(id, updatedFields) {
        try {
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                console.error('Producto no encontrado.');
                return;
            }

            this.products[index] = { ...this.products[index], ...updatedFields };
            await this.saveProducts();
            console.log('Producto actualizado:', this.products[index]);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    }

    async deleteProduct(id) {
        try {
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                console.error('Producto no encontrado.');
                return;
            }
    
            this.products.splice(index, 1);
    
            // Reorganizar los IDs para que sean secuenciales
            this.products.forEach((product, index) => {
                product.id = index + 1;
            });
    
            await this.saveProducts();
            console.log('Producto eliminado.');
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
}

// Pruebas
(async () => {
    const manager = new ProductManager('Productos.json');

    console.log(manager.getProducts()); // []

    await manager.addProduct('producto prueba', 'Este es un producto prueba', 100, 'img1.jpg', 'abc123', 20);
    await manager.addProduct('producto prueba 2', 'Este es un producto prueba', 200, 'img2.jpg', 'def456', 21);
    await manager.addProduct('producto prueba 3', 'Este es un producto prueba3', 300, 'img3.jpg', 'ghi789', 32);
    await manager.addProduct('producto prueba 4', 'Este es un producto prueba', 400, 'img4.jph', 'abc124', 23);
    await manager.addProduct('producto prueba 5', 'Este es un producto prueba', 500, 'img5.jph', 'abc125', 24);
    await manager.addProduct('producto prueba 6', 'Este es un producto prueba', 600, 'img6.jph', 'abc126', 25);
    await manager.addProduct('producto prueba 7', 'Este es un producto prueba', 700, 'img7.jph', 'abc127', 26);
    await manager.addProduct('producto prueba 8', 'Este es un producto prueba', 800, 'img8.jph', 'abc128', 27);
    await manager.addProduct('producto prueba 9', 'Este es un producto prueba', 900, 'img9.jph', 'abc129', 28);
    await manager.addProduct('producto prueba 10', 'Este es un producto prueba', 1000, 'img10.jph', 'abc1210', 29);
/*     console.log(manager.getProductById(3));
    console.log(manager.getProductById(5)); // Producto no encontrado.

    await manager.updateProduct(1, { price: 250 });
    await manager.deleteProduct(2); */ // Eliminar producto ocultar porque al eliminar un producto, se elimina el id por lo que pasa el id 3 a ser id2 y se eliminan 

    console.log(manager.getProducts());
})();

module.exports = ProductManager;























/* class ProductManager {
    constructor() {
        this.products = [];
        this.lastId = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!(title && description && price && thumbnail && code && stock)) {
            console.error('Todos los campos son obligatorios.');
            return;
        }

        if (this.products.some(p => p.code === code)) {
            console.error('El código de producto ya existe.');
            return;
        }

        this.lastId++;
        const product = {
            id: this.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        console.log('Producto agregado:', product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error('Producto no encontrado.');
        }
        return product;
    }
}

// Pruebas
const manager = new ProductManager();

console.log(manager.getProducts()); // []

manager.addProduct('producto prueba', 'Este es un producto prueba1', 200, 'Sin imagen', 'abc123', 25);
manager.addProduct('producto prueba 2', 'Este es un producto prueba', 600, 'img.jpg', 'def456', 20);
manager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25); //Mensaje producto ya existente

console.log(manager.getProductById(1)); 
console.log(manager.getProductById(5)); // Producto no encontrado. */

