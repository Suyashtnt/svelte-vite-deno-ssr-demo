import nested from 'postcss-nested';
import cssnano from 'cssnano';

export default {
    plugins: [
        nested,
        cssnano({
            preset: 'default',
        })
    ]
};