module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('scriptinject', 'Automatically injects script tags into a page.', function () {
        var htmlText;
        var scriptText;

        var sources = [];
        if (this.data.srcs) {
            var vector = [];
            if (typeof this.data.srcs == 'string') {
                if (this.data.srcs.indexOf("*") != -1) {
                    var aux = grunt.file.expandMapping(this.data.srcs[i], '');
                    for (var i = 0; i < aux.length; i++) {
                        vector[i] = aux[i].dest;
                    }
                } else {
                    vector[0] = this.data.srcs;
                }
            } else {
                var count = 0;
                for (var i = 0; i < this.data.srcs.length; i++) {
                    if (this.data.srcs[i].indexOf("*") != -1) {
                        var aux = grunt.file.expandMapping(this.data.srcs[i], '');
                        for (var j = 0; j < aux.length; j++) {
                            vector[count] = aux[j].dest;
                            count++;
                        }
                    } else {
                        vector[count] = this.data.srcs[i];
                        count++;
                    }
                }
            }

            if (!this.data.without) {
                this.data.without = '';
            }

            for (var i = 0; i < vector.length; i++) {
                sources[i] = vector[i].replace(this.data.without, "");
                grunt.log.ok("source: " + sources[i]);
            }
        } else {
            grunt.log.error('Please specify the sources files to inject into the html.');
            return;
        }

        if (this.data.html) {
            htmlText = grunt.file.read(this.data.html);
            var content = "";
            for (var i = 0; i < sources.length; i++) {
                content += '    <script src="' + sources[i] + '"></script>\n';
            }
            grunt.file.write(this.data.html, htmlText.replace(/\<\!\-\-(\s){0,}scriptinject begin(\s){0,}\-\-\>([\s\S]*?)\<\!\-\-(\s){0,}scriptinject end(\s){0,}\-\-\>/, '<!-- scriptinject begin -->\n' + content + '    <!-- scriptinject end -->'));
            grunt.log.ok('injected'.blue + ' into ' + this.data.html);
        } else {
            grunt.log.error('Please specify a html file to be script tags injected.');
            return;
        }

    });
};