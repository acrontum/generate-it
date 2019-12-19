This tool is primarily designed for use over command line.

Here are the available options:
```
Usage: cli [options] <swaggerFile>

Options:
  -V, --version                         output the version number
  -m, --mocked                          If passed, the domains will be configured to return dummy content.
  -o, --output <outputDir>              directory where to put the generated files (defaults to current directory) (default: "/home/carmichael/code/open-source-projects/openapi-nodegen")
  -t, --template <url>                  Full URL to a public git repo, eg github
  --dont-update-tpl-cache               If the given git url is already cached does not attempt to update (default: false)
  --dont-run-comparison-tool            Skips the stub file comparison tool and version cleanup (default: false)
  -v, --verbose                         Outputs verbose logging
  --very-verbose                        Outputs very verbose logging
  -h, --help                            output usage information
```

