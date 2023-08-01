import Product from "../model/Product";

class ProductService {
    private subscribers: Function[] = [];
  
    public subscribe(subscriber: Function) {
      this.subscribers.push(subscriber);
    }
  
    public unsubscribe(subscriber: Function) {
      const index = this.subscribers.indexOf(subscriber);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    }
  
    public notify(data: any) {
      this.subscribers.forEach(subscriber => subscriber(data));
    }
  
    public addProduct(product: Product) {
      // добавление продукта
      // ...
      this.notify(product); // уведомить всех подписчиков
    }
  }
  