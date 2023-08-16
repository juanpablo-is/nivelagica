export class GameMode {
  id;
  title;
  icon;
  weight;
  drawerComponent = null;

  constructor(game) {
    this.id = game.id
    this.title = game.title
    this.icon = game.icon

    const weight = Number(game.weight)
    this.weight = Number.isNaN(weight) ? 999 : weight
  }

  validate = () => { }

  setDrawerComponent(component) {
    this.drawerComponent = component
  }
}