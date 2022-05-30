# Challenge Generator

<!-- START doctoc -->
<!-- END doctoc -->

This CLI generates a challenge folder based on the [challenge-generator-backend API](https://github.com/roeeyn/challenge-generator-backend). The content of the folder is described in the [challenge content](#Challenge-Contents) section.

The usual flow is the following:

```mermaid
graph LR
    A((START)) --> B{Select Type}
    B --> |Custom| E[\Answer all the questions\]
    B --> |Completely Random| F[(Fetch Challenge from the API)]
    E --> F
    F --> G[/Create the Files/]
    G --> H((END))
```

## Getting Started

For further customization, go to the [Advanced Usage](Advanced-Usage) section.

### To get general help

```bash
npx @roeeyn/challenge-generator --help
```

### Generate a challenge selecting each parameter

```bash
npx @roeeyn/challenge-generator
```

### Generate a `python3` challenge

```bash
npx @roeeyn/challenge-generator --programming-language python3 -s
```

### Generate a `javascript` challenge

```bash
npx @roeeyn/challenge-generator --programming-language javascript -s
```

### Generate a `java` challenge

> **WARNING** Even if we can create a challenge for Java, we haven't tested it yet on Jude0 so the submission tools may not work correctly as the testframework and run file are not yet implemented.

```bash
npx @roeeyn/challenge-generator --programming-language java -s
```

## Challenge Contents

The created challenge folder contains the following files:

- [README](README)
- [Index File](Index-File)
- [Test File](Test-File)
- [Test Framework File](Test-Framework-File)
- [Run](Run)

### README

This is the file which contains the challenge description, and some of the examples provided. This is usually provided as a markdown file, so the formatted is done automatically.

### Index File

The index file contains the initial function of the challenge, which should be given to the user directly.

### Test File

This is the file which contains all the unit tests for the challenge. This usually make use of the custom testing framework provided, but see the [Test Framework File](Test-Framework-File) for the details.

### Test Framework File

This file contains our **minified** custom testing framework, to validate that the code uploaded from the user is correct. To see the original framework, see the [templates](src/templates/) folder.

> **WARNING** We have include the most used functions, but there are challenges that contains specific testing for that specific challenge and our test framework may not work on that. **This is not usual**, though.

### Run File

This file contains the execution script to run whenever this challenge is uploaded to Judge0.

## Advanced Usage

We can filter most of the params we want the challenge to contain. These are the following:

| Flag                    | Requires Value? | Description                                                                                   | Example                                  |
| ----------------------- | --------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------- |
| -V, --version           | ❌              | Prints the CLI version                                                                        | `0.0.1`                                  |
| -t, --title             | ✅              | Title regex to search                                                                         | `ort$` e.g. Titles which ends with 'ort' |
| --edabit-id             | ✅              | If you know the value of the edabit id, you can set it directly                               | `6vSZmN66xhMRDX8YT`                      |
| -a, --author            | ✅              | Author regex to search                                                                        | `^M` e.g Author which starts with 'M'    |
| -t, --tags              | ✅              | Tags to serch separated by commas                                                             | `strings,loops`                          |
| -d, --min-difficulty    | ✅              | The minimum difficulty the challenge should have from 0 (easiest) to 5 (hardest)              | `2.5`                                    |
| -q, --min-quality       | ✅              | The minimum quality the challenge should have from 0 (lowest) to 5 (highest)                  | `2.5`                                    |
| --programming-language  | ✅              | The challenge programming language. Only `java`, `javascript`, and `python3` is supported.    | `javascript`                             |
| -s, --skip-confirmation | ❌              | If the confirmation message should be skipped, and if the other parametrs should be discarded | N/A                                      |
| -v, --verbose           | ❌              | Prints debugging information                                                                  | N/A                                      |
| -h, --help              | ❌              | Prints this information                                                                       | N/A                                      |

## Future Roadmap

- Create script to upload files to judge0, maybe brew
- Warn the user if some unexpected element is present in the tests
- Better validate input for friendly error messages
