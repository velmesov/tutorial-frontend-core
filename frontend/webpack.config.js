const path = require('path')
const Autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
    return {
        mode: env.mode,
        context: path.resolve(__dirname, 'src'),
        entry: {
            'contacts': './layout/contacts/index',
            'home': './layout/home/index'
        },
        output: {
            path: path.resolve(__dirname, '../web/dist'),
            filename: 'js/[name].js'
        },
        resolve: {
            extensions: ['.js']
        },
        devtool: env.mode == 'development' ? 'inline-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    Autoprefixer()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    indentWidth: 4,
                                    outputStyle: env.mode == 'development' ? 'expanded' : 'compressed'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            })
        ]
    }
}