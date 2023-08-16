export class GameMode {
  id;
  title;
  icon;
  weight;
  time;

  drawerComponent = null;

  constructor(game) {
    this.id = game.id
    this.title = game.title
    this.icon = game.icon
    this.time = game.time

    const weight = Number(game.weight)
    this.weight = Number.isNaN(weight) ? 999 : weight
  }

  validate = () => { }

  setDrawerComponent(component) {
    this.drawerComponent = component
  }
}