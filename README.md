## ember-addon-extractor

An ember-cli helper command-line utility. Useful for when you've been working on a big project, and realize you have a lot of good stuff in there that you'd like to use in other future projects and therefore should be made into an ember addon.

## howto use

```bash
cd your-big-ember-project
ember-addon-extractor your-reuseable-thing
```
The extractor will then look through your project for files corresponding to your-reuseable-thing, create a your-reuseable-thing directory in a dir of your choice, and copy the files in.