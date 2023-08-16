export class GameMode {
  id;
  title;
  icon;
  drawerComponent = null;

  constructor(game) {
    this.id = game.id
    this.title = game.title
    this.icon = game.icon
  }

  validate = () => { }

  setDrawerComponent(component) {
    this.drawerComponent = component
  }
}