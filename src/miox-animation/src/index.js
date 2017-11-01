import './index.scss';
import Animate from './animate';

export default function Animater(name) {
    return app => app.set('animate', app => new Animate(app, name));
}