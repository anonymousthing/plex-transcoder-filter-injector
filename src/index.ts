import { $ } from 'zx';

function getArgs() {
    const args = process.argv.slice(2);

    // Process the `filter_complex` argument if it exists
    const filterComplexIdx = args.indexOf('-filter_complex');
    if (filterComplexIdx !== -1) {
        const filterValueIdx = filterComplexIdx + 1;
        const filterValue = args[filterValueIdx];
        const filters = filterValue.split(';');

        // Insert transform into the first filter stage which is usually spatial transforms
        const regex = new RegExp(/(\[.*?\])(.*?)(\[.*?\])/g);
        const groups = regex.exec(filters[0]);
        if (groups) {
          const newSpatial = groups[1] + groups[2] + ',vflip' + groups[3];
          const newFilters = [
              newSpatial,
              ...filters.slice(1)
          ].join(';');
          args[filterValueIdx] = newFilters;
        }
    } else {
        args.splice(args.length - 1, 0, '-vf');
        args.splice(args.length - 1, 0, 'vflip');
    }
    return args;
}

(async() => {
  try {
    await $`"Plex Transcoder2" ${getArgs()}`;
  } catch (e) {
    await $`echo ${e} > transcode_error.log`;
  }
})();
