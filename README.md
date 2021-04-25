# code2pdf

Print pdf from a list of code files

## Why

Sometimes, there are long projects that is difficult to read on an IDE and you want to
read it closely on a handheld tablet or e-reader device and annotate as you go through the
code.

## How to use

This program takes in a relative list of files from standard input. Such a list
can be generated using `ls` `git ls-files` or `find` commands. Pipe the output
of such commands to code2pdf, and it will create a pdf file in the current
folder. The name of the file can be defined as argument. By default, it creates
a name from current system time.

#### For one-time use:

```shell
git ls-files | npx code2pdf
```

#### Install and use locally

```shell
npm install -g code2pdf
```

```shell
git ls-files | code2pdf
```

### CLI Options

```
Usage: code2pdf [options]

Options:
  -n --name <string>     name of output file (default: "code2pdf_<time>.pdf")
  -f --format <string>   page size format (default: "a4")
  -s, --scale <decimal>  scale factor (default: 0.6)
  -p, --preview          display non-headless chromium with preview (default:
                         false)
  -V, --version          output the version number
  -h, --help             display help for command
```

The format options are:

- Letter: 8.5in x 11in
- Legal: 8.5in x 14in
- Tabloid: 11in x 17in
- Ledger: 17in x 11in
- A0: 33.1in x 46.8in
- A1: 23.4in x 33.1in
- A2: 16.54in x 23.4in
- A3: 11.7in x 16.54in
- A4: 8.27in x 11.7in
- A5: 5.83in x 8.27in
- A6: 4.13in x 5.83in

### Example [example.pdf](https://github.com/vibhavsinha/code2pdf/blob/main/example.pdf)

## How it works

- Readline to read list of files from standard input
- Prismjs to render the syntax-highlighted code from these files
- Puppeteer to create the pdf from generated HTML

## Todo

- Add internal links for function definition using AST
- Internal links for relative file names in quotes
- Links to file on github/gitlab etc.
- Add a TOC in tree format on first page, and a link to the TOC in all pages
- Intelligent sorting based on dependencies
- Support more languages
- Support line-wrapping. Currently, adding `whitespace: pre-wrap` breaks sequence

## License

MIT
