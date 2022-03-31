## plex-transcoder-filter-injector

This is a small script designed to be dropped in place of `Plex Transcoder`. It will parse the args passed to `Plex Transcoder` and will augment the `filter_complex` (or `vf`) argument with some extra filters, and then forward it onto the original transcoder (hardcoded to be at `Plex Transcoder2` for now).

Written for plex-placebo, but can be used generally.

TODO:
 - [] Take list of filter augmentations from a config file
 - [] Take location of the official transcoder from a config file
