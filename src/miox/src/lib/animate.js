/**
 * Created by evio on 2017/8/30.
 */
export default async function renderWebViewWithAnimate(app, prevNode, nextNode) {
  const animate = app.plugin.get('animate');
  const animateName = app.history.animateName;
  const animateDirection = app.history.direction;
  const hasAnimate = app.installed && app.history.session && animate && animate.leave && animate.enter;
  nextNode && nextNode.classList.add('active');
  if (prevNode) {
    prevNode.classList.remove('active');
    prevNode.classList.add('inactive');
  }
  if (hasAnimate) {
    await Promise.all([
      animate.leave(prevNode, animateName, animateDirection),
      animate.enter(nextNode, animateName, animateDirection)
    ]);
  }
  if (prevNode) {
    prevNode.classList.remove('inactive');
  }
}