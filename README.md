# What is Happening?

A command line node script that builds a basic HTML report based on Github API
calls.

**This project is not ready for consumption. It's been written very quickly,
and I'm not sure the end result is valuable. Check back later?**

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

Here is what you might get: https://cl.ly/3S441s1o1s2q

### Github Enterprise

Create a file in your home directory named `~/.what-is-happeningrc`.

Add two entries:

```
GITHUB_ENTERPRISE_URL=github.yourcompany.com
ACCESS_TOKEN=<40 character guid>
```

This assumes your github enterprise is located at `github.yourcompany.com`.

And you have previously created a Personal Access Token.

If you do not have an access token and need to create one, you can do so through the web interface of Github Enterprise.

Visit: `https://github.yourcompany.com/settings/tokens`

The Access Token does not need any particular powers-- it should be created
w/ the no additional permissions like so: https://cl.ly/3b1J061I0g0W

Once you have done this, you use the utility in the same way:

```
what-is-happening --user jedcn
```

### Advanced Usage

You can supply additional parameters for running `what-is-happening` with a
JavaScript config file.

This file can contain JavaScript but it needs to assign an object to
`module.exports` like so in this self-documenting example:

```js
module.exports = {
  daysBack: 5,
  eventsFilter: (userEventMap) => {
    // Should this event be included in the analysis?
    //
    // userEventMap is an Immutable Map built around the JSON of the
    // UserActivityEvent returned from Github's API.
    const repoNameForEvent = userEventMap.getIn(['repo', 'name']);
    return repoNameForEvent === 'banderson/inception';
  },
  outputFile: 'inception.html',
  title: 'Inception',
  users: [
    'banderson',
    'jedcn',
  ]
};
```

If you have saved this content into a file named `inception.json`, you can
reference it with the `--config` option:

```
what-is-happening --config inception.json
```
