import onTransitionEnd from './transition';

const animationNames = ['slide', 'push'];
const directionMap = {
    '0': 'none',
    '-1': 'backward',
    '1': 'forward'
};
const times = {
    'push': 300,
    'slide': 300
};

export default class Animate {
    constructor(app, name) {
        this.app = app;
        this.animateName = name || 'slide';
        this.time = times[this.animateName] || 300;
    }

    async leave(node) {
        if (!node) return;
        const animationName = this.animateName;
        const direction = directionMap[this.app.history.direction];

        const cls = `page-${animationName}-out-${direction}`
        node.classList.add(cls);
        // console.time('leave')
        await this.animated(node, cls);
        // console.timeEnd('leave')
        console.log(cls)
    }

    async enter(node) {
        if (!node) return;
        const animationName = this.animateName;
        const direction = directionMap[this.app.history.direction];

        const cls = `page-${animationName}-in-${direction}`
        node.classList.add(cls);
        // console.time('start')

        await this.animated(node, cls);
        // console.timeEnd('start');
        console.log(cls)
    }

    async animated(node, cls) {
        console.time('start1')
        await onTransitionEnd(node, this.time, 'animate');
        console.timeEnd('start1')
        this.clearAnimationClass(node, cls);
    }

    clearAnimationClass(node, cls) {
        node.classList.remove(cls);
    }
}

