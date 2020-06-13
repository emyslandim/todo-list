module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/scss/global_variables.scss";`
            },
        }
    }
}