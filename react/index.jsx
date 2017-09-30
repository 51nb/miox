import React from 'react';
import Miox from 'miox';
import Engine from 'miox-react';

const app = new Miox();

class Widget extends React.Component {
  render() {
    return <div>hello world<p>adfaf</p></div>;
  }
}

app.set('engine', Engine);

app.use(async ctx => {
  await ctx.render(Widget);
});

export default app.listen();