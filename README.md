# Multi Byte Tag

support surrogate pairs.

### to html
splitter: `\u0020`,`\u3000`, `\t`, `\r\n|\r|\n`

```js
const sampleTxt = `test A: #standard
test B: #not#tag
test C: ###nottag # not tag
test D: #𩸽 surrogate pairs`;
const base = 'example.com/';
MultiByteTag.toHtml(sampleTxt, base);
```

#### result
```html
test A: <a href="example.com/?tag=35.115.116.97.110.100.97.114.100" class="tagitem">#standard</a><br>test B: #not#tag<br>test C: ###nottag # not tag<br>test D: <a href="example.com/?tag=35.171581" class="tagitem">#𩸽</a> surrogate pairs
```

### parse
```js
// #𩸽
const tagStr = '35.171581';
MultiByteTag.parse(tagStr);
```

#### result
```
#𩸽
```
