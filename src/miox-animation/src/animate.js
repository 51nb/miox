import onTransitionEnd from './transition';
const animationNames = ['slide', 'push'];
const directionMap = { '0': 'none', '-1': 'backward', '1': 'forward' };
const times = { 'push': 300, 'slide': 300 };

export default class Animate {
    constructor(app, name) {
        this.app = app;
        this.animateName = name || 'slide';
        this.time = times[this.animateName] || 300;
    }

    async leave(node, name, direction) {
        if (!node) return;
        await this.app.emit('animate:leave:before', node);
        const cls = `page-${name || this.animateName}-out-${directionMap[direction]}`;
        node.classList.add(cls);
        await this.animated(node, cls);
        await this.app.emit('animate:leave:after', node);
    }

    async enter(node, name, direction) {
        if (!node) return;
        await this.app.emit('animate:enter:before', node);
        const cls = `page-${name || this.animateName}-in-${directionMap[direction]}`;
        node.classList.add(cls);
        await this.animated(node, cls);
        await this.app.emit('animate:enter:after', node);
    }

    async animated(node, cls) {
        await onTransitionEnd(node, this.time, 'animate');
        node.classList.remove(cls);
    }
}

