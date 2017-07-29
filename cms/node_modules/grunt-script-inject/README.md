grunt-script-inject

#Author

Pedro Rocha

# Description

Automatically injects script tags into a page. Nice for auto put script tags in angular apps.

#   Example (gruntfile.js):

    scriptinject: {
        dev: {
            srcs: ['src/frontend/modules/app.js', 'src/frontend/modules/*/*.js', 'src/frontend/modules/*/*/*.js'], //order is important if this sciprt will be concated and minified
            html: 'src/application.html', //file that as the block comment to look for a place to insert the script tags
            without: 'src/' //this script will be used to remove this block of string of script tag file location
        }
    }


# Example of HTML if block:

    <!-- scriptinject begin -->
    //everything here will be replace by all script loaded. You can run this task many times you want.
    <!-- scriptinject end -->
