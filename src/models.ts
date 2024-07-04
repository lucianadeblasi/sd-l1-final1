import * as jsonfile from 'jsonfile';

type Peli = {
  id: number;
  title: string;
  tags: string[];
};

type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  private filePath = './pelis.json';

  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.filePath);
  }

  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    return pelis.find(peli => peli.id === id) || null;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      const pelis = await this.getAll();
      pelis.push(peli);
      await jsonfile.writeFile(this.filePath, pelis);
      return true;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter(peli => {
      let matches = true;
      if (options.title) {
        matches = matches && peli.title.includes(options.title);
      }
      if (options.tag) {
        matches = matches && peli.tags.includes(options.tag);
      }
      return matches;
    });
  }
}

export { PelisCollection, Peli, SearchOptions };
