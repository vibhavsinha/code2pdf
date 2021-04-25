# code2pdf

Print a list of files to a pdf file

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
- Allow more CLI options such as scale factor and pdf format

## License

MIT
