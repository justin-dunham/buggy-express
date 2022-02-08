import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import {
    uglify
} from 'rollup-plugin-uglify';
import {
    terser
} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';

import packageJSON from './package.json';
const input = './src/index.ts';
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');

export default [
    // CommonJS
    {
        input,
        output: {
            file: minifyExtension(packageJSON.main),
            format: 'cjs',
        },
        plugins: [
            babel({
                exclude: 'node_modules/**',
            }),
            external(),
            resolve(),
            commonjs(),
            uglify(),
            typescript(),
        ],
    },
    // UMD
    {
        input,
        output: {
            file: packageJSON.browser,
            format: 'umd',
            name: 'buggy-express',
        },
        plugins: [
            babel({
                exclude: 'node_modules/**',
            }),
            external(),
            resolve(),
            commonjs(),
            typescript(),
        ],
    },
    {
        input,
        output: {
            file: minifyExtension(packageJSON.browser),
            format: 'umd',
            name: 'buggy-express',

        },
        plugins: [
            babel({
                exclude: 'node_modules/**',
            }),
            external(),
            resolve(),
            commonjs(),
            terser(),
            typescript(),
        ],
    },
    // ES
    {
        input,
        output: {
            file: packageJSON.module,
            format: 'es',
            exports: 'named',
        },
        plugins: [
            babel({
                exclude: 'node_modules/**',
            }),
            external(),
            resolve(),
            commonjs(),
            typescript(),
        ],
    }
];