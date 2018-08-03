import { src, dest } from 'gulp';
import pump from 'pump';
import { paths, gulpPlugins } from '../config/gulpConfig';

export default function translation( done ) {
	pump(
		[
			src( paths.languages.src ),
			gulpPlugins.sort(),
			gulpPlugins.wpPot({
				domain: paths.config.theme.domain,
				package: paths.config.theme.package,
				bugReport: paths.config.theme.bugs,
				lastTranslator: paths.config.theme.author
			}),
			dest( paths.languages.dest )
		],
		done
	);
}
