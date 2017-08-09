import { PokedexPage } from './app.po';

describe('pokedex App', () => {
  let page: PokedexPage;

  beforeEach(() => {
    page = new PokedexPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
