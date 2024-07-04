import { PelisCollection, Peli, SearchOptions } from './models';

class PelisController {
  private collection: PelisCollection;

  constructor() {
    this.collection = new PelisCollection();
  }

  async get(options?: { id?: number; search?: SearchOptions }): Promise<Peli | Peli[]> {
    if (options?.id) {
      return this.collection.getById(options.id);
    }
    if (options?.search) {
      return this.collection.search(options.search);
    }
    return this.collection.getAll();
  }

  async add(peli: Peli): Promise<boolean> {
    return this.collection.add(peli);
  }
}

export { PelisController };
