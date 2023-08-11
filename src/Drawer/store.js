let toastsCounter = 0;

class Observer {
  subscriber = null;

  constructor() {
    this.subscriber = null;
  }

  subscribe = (subscriber) => {
    this.subscriber = subscriber;

    return () => this.subscriber = null;
  };

  publish = (data) => {
    if (this.subscriber) {
      this.subscriber(data)
    }
  };

  addDrawer = (data) => {
    this.publish(data);
  };

  removeDrawer = () => {
    if (this.subscriber) {
      this.subscriber({ component: null }) //TODO
    }
  }
}

export const DrawerState = new Observer();

const basicDrawer = (e, options) => {
  const id = options?.id || toastsCounter++;
  const element = e && typeof e === 'function' ? e() : e

  DrawerState.addDrawer({
    component: element,
    ...options,
    id,
  });

  return id;
};

export const addDrawer = Object.assign(basicDrawer);