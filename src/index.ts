import * as minimist from 'minimist';
import { PelisController } from './controller';

async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === 'add') {
    const peli = {
      id: args.id,
      title: args.title,
      tags: args.tags
    };
    const result = await controller.add(peli);
    console.log(result ? 'Peli agregada' : 'Error al agregar la peli');
  } else if (args._[0] === 'get') {
    const peli = await controller.get({ id: parseInt(args._[1]) });
    console.log(peli);
  } else if (args._[0] === 'search') {
    const searchOptions = { title: args.title, tag: args.tag };
    const pelis = await controller.get({ search: searchOptions });
    console.log(pelis);
  } else {
    const pelis = await controller.get();
    console.log(pelis);
  }
}

main();
