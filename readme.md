<h1 align="center">dropout</h1>

<p align="center"><a href="https://www.are.na/emma-rae-norton/big-data-no-thanks"><img align="center" src="https://d2w9rnfcy7mm78.cloudfront.net/989416/large_763dc9142432e03b75e5c9362c12031b.jpg" width="100" height="auto"></a></p>

When interfaces are designed for capturing and exhausting your attention going offline is both an act of liberation and luxury. This is a tool of ethical technology enabling you to save pages for offline access and personal archival.

```
npm install dropout -g

dropout save http://quillette.com/2017/10/22/liberals-turning-internet/
```

## features

- Cleanup a page to showcase only the content
- Static files, no database, so super extendable
- Platforms 🖕, this is a tool 🎉

## usage

You can use either the [command line interface](#cli) or the [module](#module) with js. There are plans for other things, too.

## cli

```
dropout <cmd> [args]

Commands:
  dropout save [url]  save a url

Options:
  --version  Show version number
  --help     Show help
```

## module

```
var dropout = require('dropout')
```

### `dropout.save(url, {options})`

Save a page! Creates an `index.html` for easy viewing, and a `data.json` with some handy meta-data and the parsed content which is used to generate the html.

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

## related

- [`new-work`](https://github.com/s3ththompson/new-work), a CLI tool that automatically checks artists' websites for new work by Seth Thompson.
- [Hardly Everything](http://hardlyeverything.com), an attempt to subvert the traditional feed by substituting activity with user-defined durations of passing time called rests.

## todo

- [ ] Testing
- [ ] Save media files (img, youtubedl, etc)
- [ ] Custom CSS
- [ ] Custom HTML template
- [ ] Toggle page cleanup
- [ ] Reading interface
- [ ] Dat sync
- [ ] Beaker Browser app
- [ ] `remove` lib method
- [ ] Add to [Arena](https://are.na) support

## change log

### 10/26/17

First release. Only the save functionality is there. Minimal documentation.