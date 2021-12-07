export class AppController {
  constructor() {}

  hello(test: string) {
    return console.log(test);
  }
}

const test = new AppController;

test.hello("Naruto");