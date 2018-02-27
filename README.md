# What is Happening?

## Installation

```
npm install what-is-happening
```

## Usage

### Github

```
what-is-happening --user jedcn
```

Results will be written to `jedcn.html`.

### Github Enterprise

Assuming github is installed `github.company.com`.

And the user we want to learn about is `jed`.

And you have stored a Personal Access Token in a file at `./ACCESS_TOKEN`.

```
ACCESS_TOKEN=$(cat ACCESS_TOKEN) what-is-happening --user jed --host github.company.com
```

If you need an Access Token, visit your Github Enterprise:

`https://github.company.com/settings/tokens`

The Access Token does not need any particular powers-- it should be created
w/ the no additional permissions.
