This tool is primarily designed to be used over command line.

Here are the available options:
```
Usage: cli [options] <swaggerFile>

Options:
  -V, --version                         output the version number
  -m, --mocked                          If passed, the domains will be configured to return dummy content.
  -o, --output <outputDir>              directory where to put the generated files (defaults to current directory)
  -t, --template <url>                  Full URL to a public git repo, eg github
  --dont-update-tpl-cache               If the given git url is already cached does not attempt to update (default: false)
  --dont-run-comparison-tool            Skips the stub file comparison tool and version cleanup (default: false)
  -$, --variables                       Variables to inject into the template engine eg: -$ httpServiceImport=@/services/HttpService
  -v, --verbose                         Outputs verbose logging
  --very-verbose                        Outputs very verbose logging
  -h, --help                            output usage information
```

To inject many variables into a template just add many -$:
```
generate-it ./ms-item-d_1.0.0.yml -t https://github.com/acrontum/generate-it-typescript-client-to-server.git -$ core=123 -$ other=987
```
