# Buggy Express

Add variable intermittent delay and errors to local express servers.

### Why

I see applications not prepared to handle the bumps on the road that is the information super highway. This simple middleware is an answer for development to introduce those bumps.

### Quick Start

```js
import express from 'express';
import buggy from 'buggy-express';

const app = express();
app.use(buggy({
    delayMaxMS: 1000,
    chanceOfError: .05
}))

app.get('/', (request, response) => response.json({status: true;}));

app.listen(80);
```

The example options above will introduce between 0 and 500ms of delay to every call and and return an error for about 5% of calls.

### Options

| Option        | default |      type |
| ------------- | :-----: | --------: |
| delayMinMS    |    0    |   0-30000 |
| delayMaxMS    |   500   | 0 - 30000 |
| chanceOfError |   .05   |     0 - 1 |

### Build

install
run build
publish
package (cp from root)
readme (cp from root)
index.d.ts (mv from dist)
dist/\*
