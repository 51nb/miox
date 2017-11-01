import Engine from './engine';

export default function installer(app) {
  app.set('engine', Engine);
}