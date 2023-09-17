import fs from 'fs'

class ProductManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.objs = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.objs = [];
  }

  async addProduct(obj) {

    this.objs.length === 0 ? obj["id"] = 1 : obj["id"] = this.objs[this.objs.length - 1]["id"] + 1

      this.objs.push(obj)
      await fs.promises.writeFile(this.path, JSON.stringify(this.objs, null, '\t'))
      return true;


  }

  getProducts = () => {
    return this.objs
  }

  getElementById = (id) => {
    let obj = this.objs.find(e => e.id === id)
    return obj
  }


  async updateProduct(id, row, newValue) {

    let i = this.objs.findIndex(element => element.id === id)
    let verifRow;
    i === -1 ? false : verifRow = Object.keys(this.objs[i]).some(e => e === row)


    if (!verifRow || row === 'id') {
      return false
    } else {
      this.objs[i][row] = newValue;
      await fs.promises.writeFile(this.path, JSON.stringify(this.objs, null, '\t'))
      return true;
    }


  }


  async deleteProd(id) {
    let exist = this.objs.some(e => e.id === id)
    if (exist) {
      this.objs = this.objs.filter(e => e.id !== id)
      await fs.promises.writeFile(this.path, JSON.stringify(this.objs, null, '\t'))
      return true;
    } else {
      return false;
    }
  }
}


export default new ProductManager('./products.json')