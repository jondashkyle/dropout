# dropout

When interfaces are designed for exhausting your attention and to keep you clicking, going offline is an act both of liberation and luxury. This is a tool of ethical technology which enables you to save pages for offline access and archival.

```
npm install dropout -g
```

## features

- Cleanup a page to showcase only the content
- Static files, no database
- Fuck a platform, this is a tool 🖕🎉

## cli

```
dropout <cmd> [args]

Commands:
  dropout save [url]  save a url

Options:
  --version  Show version number
  --help     Show help
```

## js module

```
var dropout = require('dropout')
```

### `dropout.save(url, {options})`

Save a page!

## options

### `options.fs`

Pass a custom filesystem for saving. Expects `mkdirSync`, `writeFileSync`.

### `options.output`

The output (parent) directory the page directory will be saved to.

### `options.prepend`

Prepend the directory name with a custom [timestamp](https://www.npmjs.com/package/time-stamp). Defaults to `YYMMDD`.

### `options.style`

The CSS for the document. Currently defaults to [Github Markdown CSS](https://github.com/sindresorhus/github-markdown-css).

### `options.template`

A custom template with `{{TITLE}}` and `{{CONTENT}}` tags. The default is currently gnarly.

```
<main class="markdown-body" style="max-width: 888px; margin: 60px auto;"><h1>{{TITLE}}</h1>{{CONTENT}}</main>
```

## todo

- [ ] Save media files (img, youtubedl, etc)
- [ ] Custom CSS
- [ ] Custom HTML template
- [ ] Toggle page cleanup
- [ ] Reading interface
- [ ] Dat sync
- [ ] Beaker Browser app
- [ ] `remove` lib method
- [ ] Add to [Arena](https://are.na) support

## changelog

### October 26th, 2017

First release. Only the save functionality is there. Minimal documentation.