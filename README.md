# What is Happening?

A command line node script that builds a basic HTML file based on Github API
calls.

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

Here's a [screenshot of `jedcn.html`][output-from-very-basic-beginnings].

[output-from-very-basic-beginnings]: https://cl.ly/2T1o3C2z400d

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

### Multiple Users

You can understand what a "team" of people have been up to by passing
comma-separated values for `--user`:

```
what-is-happening --user jedcn,banderson
```

Results will be written to `jedcn-banderson.html`.

### Focused Repositories

If you know that a "team" of people focus their work on specific repos, you can
ignore work those team members contribute to additional repositories with
`--focus-on-repos`:

```
what-is-happening --user jedcn,banderson --focus-on-repos jedcn/NicknameGenerator,banderson/Inception
```

This would only report on activity associated with `jedcn/NicknameGenerator`
and `banderson/Inception`.
