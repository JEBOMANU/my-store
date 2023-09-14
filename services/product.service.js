const { faker, } = require('@faker-js/faker');
const boom = require ('@hapi/boom');


class ProductService {

  constructor(){
    this.products = [];
    this.generate();
  }


  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({

        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data){ //crear
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;

  }

 find(){ //busqueda
  return new Promise((resolve, reject)=> {
    setTimeout(()=>{
      resolve(this.products);
    }, 5000);
  })

  }

  async findOne(id){ //devuelve un solo elemneto
    const product = this.products.find(item => item.id ===id);
    if (!product){
      throw boom.notFound('producto no found');
    }
    if (product.isBlock){
      throw boom.conflict('producto is block');

    }
    return product;

  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
  if (index === -1) {
    throw boom.notFound('producto no found');
  }
  const product = this.products[index];
  this.products[index] = changes;
  return this.products[index]={
    ...product,
    ...changes
  };
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);//busca la posicion para eliminar
  if (index === -1) {
    throw boom.notFound('producto no found');
  }
  this.products.splice(index, 1);
  return {id};

  }




}

module.exports = ProductService;
