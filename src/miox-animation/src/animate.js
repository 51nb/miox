import onTransitionEnd from './transition';

const animationNames = ['slide', 'push'];
const directionMap = {
    '0': 'direction-none',
    '-1': 'direction-backward',
    '1': 'direction-forward'
};
const times = {
    'push': 300,
    'slide': 300
};

export default class Animate {
    constructor(app, name) {
        this.app = app;
        this.animateName = name || 'push';
        this.time = times[this.animateName] || 300;
    }

    async leave(node) {
        if (!node) return;
        const animationName = this.animateName;
        const direction = directionMap[this.app.history.direction];

        node.classList.add(`page-${animationName}-out`);
        node.classList.add(direction);
        await this.animated(node);
    }

    async enter(node) {
        if (!node) return;
        const animationName = this.animateName;
        const direction = directionMap[this.app.history.direction];

        node.classList.add(`page-${animationName}-in`);
        node.classList.add(direction);
        await this.animated(node);
    }

    async animated(node) {
        await onTransitionEnd(node, this.time, 'animate');
        this.clearAnimationClass(node);
    }

    clearAnimationClass(node) {
        const dirs = Object.keys(directionMap);
        dirs.forEach(key => {
            node.classList.remove(directionMap[key])
        });
        animationNames.forEach(ani => {
            node.classList.remove(`page-${ani}-in`);
            node.classList.remove(`page-${ani}-out`);
        })
    }
}

