'use strict';

angular.module('webScraperCMS.i18n')
    .constant('en', {
        global: {
            userWebsite: 'User Website',
            loadingData: 'Loading data...',
            errorData: 'An error occurred. Please try again.',
            actions: {
                back: 'Go Back'
            },
            languages: {
                english: 'English',
                arabic: 'Arabic'
            },
            fileInput: {
                selectImage: 'Choose..',
                changeImage: 'Change',
                removeImage: 'Remove'
            },
            field: {
                error: {
                    required: 'This field is required!'
                }
            }
            ,
            userPackage: 'User Package',
            Request: 'Add Request',
            Models: 'My Files',
            addModel: 'Add Model File',
            myData: 'My Data',
            myModels: 'My Model Files',
            myRequests: 'My Requests',

        },
        userApp: {
            Home: 'Home',
            About: 'About',
            Services: 'Our Services',
            Contact: 'Contact Us',
            Tutorial: 'Tutorials'
        },
        aside: {
            profile: 'My Profile',
            settings: 'Settings',
            logout: 'Logout',
            fullscreen: 'Fullscreen',
            fold: 'Folded aside',
            themes: 'Theming:',
            nav: {
                dashboard: 'Dashboard',
                maps: 'Maps',
                users: 'Users',
                buses: 'Buses',
                ModelFiles: 'Models',
                stops: 'Stops',
                status: 'Status',
                extractedDataType: 'Extracted Data Types',
                categories: 'Categories'
            }
        },
        login: {
            title: 'Sign in with your account',
            username: 'Username',
            password: 'Password',
            keepMe: 'Keep me signed in',
            submit: 'Login',
            forgotPass: 'Forgot password?',
            authField: 'Username, Email Or phone',
            error: {
                failed: 'Incorrect username or password!',
                notActvive: 'Your account is inactive. Please contact your system admin.'
            }
        },
        dashboard: {
            title: 'Dashboard',
            balance: 'Balance',
            offers: 'Popular Offers',
            products: 'Most Viewed Products',
            activities: 'Activities',
            updated: 'Updated 4 minutes',
            widgets: {
                products: 'Products',
                brands: 'Brands',
                branches: 'Brandches',
                vouchers: 'Vouchers'
            },
            followers: {
                latest: 'Latest Followers',
                visitors: 'Visitors',
                offers: 'Offers Sold'
            }
        }, extracted: {
            listPage: {
                title: 'Extracted Data List',
                noData: 'No Extracted Data  yet.',
                loadingData: 'Loading Data',
                errorData: 'Error while loading data.'
            },
            actions: {
                new: 'New Extracted Data',
                edit: 'Edit',
                save: 'Save',
                addPackage: 'Add New Extracted Data.'
            },
            errors: {
                // 'username.required': 'Username is required',
                // 'firstName.required': 'First name is required',
                // 'lastName.required': 'Last name is required',
                // 'email.required': 'Email is required',
                // 'password.required': 'Password is required',
                // 'password.notMatch': 'Passwords are not match!',
                // formNotValid: 'Please make sure all mandatory fields are filled.',
                saveError: 'An error occurred while adding the Extracted Data. Please try again.',
                // changePassword: 'An error occurred while changing the password. Please try again.',
                // oldNewPassReq: 'Old password and new password are required',
                // noMatch: 'New password does not match the retyped password',
                // oldPassWrong: 'Old password is incorrect'
            },

            length: 'Length',
            'save.success': 'Extracted Data saved successfully'
        },
        userPackage: {
            listPage: {
                title: 'Packages List',
                noData: 'No Packages yet. You can create one by using the button at the top.',
                loadingData: 'Loading Data',
                errorData: 'Error while loading data.'
            },
            actions: {
                new: 'New package',
                edit: 'Edit',
                save: 'Save',
                addPackage: 'Add New package File'
            },
            length: 'Length',
            packageName: 'Package Name',
            totalPrice: 'Total Price',
            maxRecords: 'Max Records',
            'save.success': 'Package saved successfully',
            'remove.success': 'Package removed successfully',
        },
        request: {
            listPage: {
                title: 'Request List',
                noData: 'No Requests yet. You can create one by using the button at the top.',
                loadingData: 'Loading Data',
                errorData: 'Error while loading data.'
            },
            actions: {
                new: 'New Request',
                edit: 'Edit',
                save: 'Save',
                addPackage: 'Add New Request File'
            },
            errors: {
                // 'username.required': 'Username is required',
                // 'firstName.required': 'First name is required',
                // 'lastName.required': 'Last name is required',
                // 'email.required': 'Email is required',
                // 'password.required': 'Password is required',
                // 'password.notMatch': 'Passwords are not match!',
                // formNotValid: 'Please make sure all mandatory fields are filled.',
                saveError: 'An error occurred while adding the request. Please try again.',
                // changePassword: 'An error occurred while changing the password. Please try again.',
                // oldNewPassReq: 'Old password and new password are required',
                // noMatch: 'New password does not match the retyped password',
                // oldPassWrong: 'Old password is incorrect'
            },
            maxRecords: 'Max Records',
            maxItemsPerPage: 'Max Items Per Page',
            length: 'Length',
            'save.success': 'Request saved successfully',
            'remove.success': 'Request removed successfully',
        },
        user: {
            username: 'Username',
            firstName: 'First Name',
            lastName: 'last Name',
            email: 'Email',
            phone: ' phone',
            userPackage: 'Package',
            password: 'Password',
            oldPassword: 'Old Password',
            newPassword: 'New Password',
            rePassword: 'Retype New Password',
            isActive: {
                title: 'Active?',
                true: 'Yes',
                false: 'No'
            },
            listPage: {
                title: 'Users',
                noData: 'No users yet. You can create one by using the button at the top.'
            },
            editPage: {
                myProfile: 'My Profile',
                new: 'New User',
                edit: 'Edit User',
                changePassword: 'Change Password'
            },
            actions: {
                new: 'New User',
                save: 'Save User',
                changePassword: 'Change Password',
                edit: 'Edit page'
            },
            deactivate: {
                title: 'Are You Sure?',
                text: 'Are you sure you want to deactivate {{username}}?',
                success: 'User: {{username}} deactivated successfully',
                error: 'Error in deactivating user!!',
                ok: 'Ok',
                cancel: 'Cancel',
                admin: 'Cannot deactivate Admin user',
                yourself: 'Cannot deactivate yourself'
            },
            activate: {
                title: 'Are You Sure?',
                text: 'Are you sure you want to activate {{username}}?',
                success: 'User: {{username}} activated successfully',
                error: 'Error in activating user!!'
            },
            errors: {
                'username.required': 'Username is required',
                'firstName.required': 'First name is required',
                'lastName.required': 'Last name is required',
                'email.required': 'Email is required',
                'password.required': 'Password is required',
                'password.notMatch': 'Passwords are not match!',
                formNotValid: 'Please make sure all mandatory fields are filled.',
                saveError: 'An error occurred while saving the user. Please try again.',
                changePassword: 'An error occurred while changing the password. Please try again.',
                oldNewPassReq: 'Old password and new password are required',
                noMatch: 'New password does not match the retyped password',
                oldPassWrong: 'Old password is incorrect'
            },
            'changePassword.success': 'Password changed successfully',
            'save.success': 'User saved successfully'
        },
        modelFiles: {
            listPage: {
                title: 'Model Files List',
                noData: 'No files yet. You can create one by using the button at the top.',
                loadingData: 'Loading Data',
                errorData: 'Error while loading data.'
            },
            actions: {
                new: 'New File',
                edit: 'Edit',
                save: 'Save',
                addModelFile: 'Add New Model File'
            },
            desc: 'Description',
            url: 'Url',
            fileName: 'Model Name',
            length: 'Length',
            fileLocation: 'file Location',
            'save.success': 'the model has been saved successfully.',
            'remove.success': 'the model has been remove successfully.',
            'request.success': 'the model has been requested successfully.',
            errors: {

                // 'username.required': 'Username is required',
                // 'firstName.required': 'First name is required',
                // 'lastName.required': 'Last name is required',
                // 'email.required': 'Email is required',
                // 'password.required': 'Password is required',
                required: 'Please Fill Required fields!',
                request: 'error while request, please try again.',
                saveError: 'error while saving.',
                // changePassword: 'An error occurred while changing the password. Please try again.',
                // oldNewPassReq: 'Old password and new password are required',
                browse: 'please select file first!',
                // oldPassWrong: 'Old password is incorrect'
            },
        },
        bus: {
            listPage: {
                title: 'Buses List'
            },
            actions: {
                new: 'New Bus',
                edit: 'Edit',
                save: 'Save',
                addStop: 'Add New Stop',
                addExistStop: 'Add Exist Stop'
            },
            name: 'Bus Name',
            stopsNumber: 'Stops number',
            length: 'Length',
        },
        issue: {
            listPage: {
                title: 'Issue List',
                noData: 'No Isseus yet. You can create one by using the button at the top.'
            }
        },
        stop: {
            listPage: {
                title: 'Stops List'
            },
            actions: {
                edit: 'Edit the list',
                new: 'New'
            },
            editInfo: {
                titel: 'Stop Info'
            },
            name: 'Stop Name',
            lat: 'Lat',
            lng: 'Lng',
            order: 'Order'
        },
        map: {
            name: 'Title',
            image: 'Map Image',
            pois: 'No. POIS',
            poisTitle: 'POIS List',
            overlay: 'Overlay File',
            topLeftGPS: 'Top Left GPS Point',
            bottomRightGPS: 'Bottom Right GPS Point',
            poi: {
                x: 'X',
                y: 'Y',
                label: 'Label',
                url: 'URL',
                is3D: '3D?',
                isImage: 'Image?',
                gpsX: 'GPS X',
                gpsY: 'GPS Y',
                category: 'Category',
                scale: 'Scale',
                rotation: 'Rotation (degrees)'
            },
            listPage: {
                title: 'Maps',
                noData: 'No maps yet. You can create one by using the button at the top.'
            },
            editPage: {
                edit: 'Edit Map',
                new: 'New Map'
            },
            actions: {
                new: 'New Map',
                addMarker: 'New POI',
                selectImage: 'Choose Map Image',
                selectOverlay: 'Choose Overlay Image',
                uploadPOIImage: 'Upload Image',
                selectModelFile: 'Upload Model File',
                save: 'Save Map',
                reset: 'Reset Changes',
                viewOverlay: 'View Overlay Image',
                viewOriginal: 'View Map Image',
                removePOIs: 'Remove POIs'
            },
            errors: {
                chooseImage: 'Choose an image for map before you can add POIs.',
                formNotValid: 'Please make sure all mandatory fields are filled.',
                'name.required': 'Map title is mandatory',
                noPOIs: 'Please enter at least one POI',
                saveError: 'An error occurred while saving the map. Please try again.',
                nameFound: 'Map title already exists.',
                fileUpload: 'An error occurred while uploading the file. Please try again.',
                'topLeftGPS.required': 'Please enter top left GPS point',
                'bottomRightGPS.required': 'Please enter bottom right GPS point',
                'topLeftGPS.coordinates': 'Please make sure you enter the coordinates correctly',
                'bottomRightGPS.coordinates': 'Please make sure you enter the coordinates correctly'
            },
            'save.success': 'Map was saved successfully'
        },
        category: {
            categoryName: 'Category Name',
            listPage: {
                title: 'Categories',
                noData: 'No Categories yet. You can create one by using the button at the top.'
            },
            editPage: {
                edit: 'Edit Category',
                new: 'New Category'
            },
            actions: {
                new: 'New Category',
                save: 'Save Category',
                remove: {
                    title: 'Are you sure?',
                    text: 'Are you sure you want to delete category {{categoryName}}?',
                    ok: 'OK',
                    cancel: 'Cancel',
                    success: 'Category {{categoryName}} was deleted successfully.',
                    error: 'An error occurred while deleting category.',
                    used: 'Category {{categoryName}} is used in other maps'
                }
            },
            errors: {
                formNotValid: 'Please make sure all mandatory fields are filled.',
                'name.required': 'Category name is mandatory',
                saveError: 'An error occurred while saving the category. Please try again.',
                nameFound: 'Category name already exists.'
            },
            'save.success': 'Category was saved successfully'
        },
        status: {
            listPage: {
                title: 'Statuses List',
                noData: 'No statuses yet. You can create one by using the button at the top.',
                loadingData: 'Loading Data',
                errorData: 'Error while loading data.'
            },
            actions: {
                new: 'New Status',
                edit: 'Edit',
                save: 'Save',
                addStatus: 'Add New Status',
                remove: {
                    title: 'Are you sure?',
                    text: 'Are you sure you want to delete status {{statusName}}?',
                    ok: 'OK',
                    cancel: 'Cancel',
                    success: 'Status {{statusName}} was deleted successfully.',
                    error: 'An error occurred while deleting status.'
                }
            },
            statusName: 'Status Name',
            statusMessage: 'Status Message',
            'save.success': 'Status was saved successfully'
        },
        extractedDataTypes: {
            listPage: {
                title: 'Extracted Data Types List',
                noData: 'No data types yet. You can create one by using the button at the top.',
                loadingData: 'Loading Data',
                errorData: 'Error while loading data.'
            },
            actions: {
                new: 'New Data Type',
                edit: 'Edit',
                save: 'Save',
                addDataType: 'Add New DataType',
                remove: {
                    title: 'Are you sure?',
                    text: 'Are you sure you want to delete dataType {{dataTypeName}}?',
                    ok: 'OK',
                    cancel: 'Cancel',
                    success: 'Data type {{dataTypeName}} was deleted successfully.',
                    error: 'An error occurred while deleting data type.'
                }
            },
            dataTypeName: 'Data Type Name',
            'save.success': 'Data type was saved successfully'
        }
    });
