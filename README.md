# What is Happening?

## Installation

```
npm install what-is-happening
```

## Usage

### Regular Github

```
USER=jedcn what-is-happening
```

Results will be written to `jedcn.html`.

### Github Enterprise

Assuming github is installed `git.company.com`.

And the user we want to learn about is `jed`.

And you have stored a Personal Access Token in a file at `./ACCESS_TOKEN`.

```
USER=jed HOST=git.company.com PATH_PREFIX=api/v3 ACCESS_TOKEN=$(cat ACCESS_TOKEN) what-is-happening
```

If you need an Access Token, visit your Github Enterprise:

`https://github.company.com/settings/tokens`.
