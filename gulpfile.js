var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var fs = require('fs');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
//var argv = require('yargs').argv;
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');

var less_files = './app/styles/app.less';

gulp.task('less', function () {
    gulp.src(less_files)
            .pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(gulp.dest('./app/styles'));
});

gulp.task('themes', function () {
    return gulp.src('./app/styles/themes/*.less')
            .pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(minifyCSS({keepBreaks: false}))
            .pipe(gulp.dest('./app/styles'));
});

gulp.task('watch', function () {
    gulp.watch(less_files, ['less']);
});

gulp.task('compile', function () {
    return _Functions._compile();
});

gulp.task('devel', function () {
    return _Functions._devel();
});


var _Functions = {
    _compile: function () {
        var self = this;
        
        var folders = this.getFolders('modules');
        var tasks = folders.map(function (folder) {
            return self.modCompile(folder);
        });

        folders = this.getFolders('plugins');
        var plugins = folders.map(function (folder) {
            return self.pluginCompile(folder);
        });

        var target = gulp.src('index.html');
        var sources = gulp.src(['./app/app.js', './app/Modules.js', './app/Plugins.js'], {read: false});

        var injection = target.pipe(inject(sources)).pipe(gulp.dest('./'));

        var sourcesApp = gulp.src([
            './app/module.js',
            './app/controllers/*.js',
            './app/services/*.js',
            './app/directives/*.js'
        ]).pipe(concat('app.js'))
                .pipe(uglify())
                .pipe(gulp.dest('app'));

        return merge(tasks, plugins, injection, sourcesApp);
    },
    _devel: function () {
        var target = gulp.src('index.html');
        var sources = gulp.src([
            './app/module.js',
            './app/controllers/*.js',
            './app/services/*.js',
            './app/directives/*.js',
            './modules/*/*.js',
            './modules/*/*/*.js',
            './plugins/*/*.js',
            './plugins/*/*/*.js'
        ], {read: false});

        return target.pipe(inject(sources)).pipe(gulp.dest('./'));
    },
    modCompile: function (moduleName) {
        var mPath = './modules/' + moduleName;
        gulp.src([
            mPath + '/module.js',
            mPath + '/controllers/*.js',
            mPath + '/controllers/*/*.js',
            mPath + '/services/*.js',
            mPath + '/directives/*.js',
            mPath + '/directives/*/*.js'
        ])
                .pipe(concat(moduleName + '.js'))
                .pipe(uglify())
                .pipe(gulp.dest('modules'));

        return gulp.src(['./modules/*.js'])
                .pipe(concat('Modules.js'))
                .pipe(uglify())
                .pipe(gulp.dest('app'));
    },
    getFolders: function (dir) {
        return fs.readdirSync(dir)
                .filter(function (file) {
                    return fs.statSync(path.join(dir, file)).isDirectory();
                });
    },
    pluginCompile: function (pluginName) {
        var mPath = './plugins/' + pluginName;

        gulp.src([
            mPath + '/plugin.js',
            mPath + '/controllers/*.js',
            mPath + '/services/*.js',
            mPath + '/directives/*.js'
        ])
                .pipe(concat(pluginName + '.js'))
                .pipe(uglify())
                .pipe(gulp.dest('plugins'));

        return gulp.src(['./plugins/*.js'])
                .pipe(concat('Plugins.js'))
                .pipe(uglify())
                .pipe(gulp.dest('app'));
    }
};