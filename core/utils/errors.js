module.exports = {
  authRequiredError: {
    error: 'authentication_required',
    code: 401,
    status: 401
  },
  unauthorizedError: {
    error: 'unauthorized',
    code: 403,
    status: 403
  },
  issue:{
    upVote: 'user_already_upvoted'
  },
    modelFiles :
        {
            fileNameInvalid: {
                error: 'invalid_file_name',
                code: 115,
                status: 400
            }
        },
  users: {
    emailExists: {
      error: 'email_already_exists',
      code: 101,
      status: 400
    },
    phoneNumberExists: {
      error: 'phone_number_already_exists',
      code: 102,
      status: 400
    },
    phoneNumberInvalid: {
      error: 'invalid_phone_number',
      code: 103,
      status: 400
    },
    invalidInput: {
      error: 'missing_required_data',
      code: 104,
      status: 400
    },
    notFound: {
      error: 'user_not_found',
      code: 105,
      status: 404
    },
    incorrectCreds: {
      error: 'email_password_incorrect',
      code: 106,
      status: 400
    },
    emailNotFound: {
      error: 'email_not_found',
      code: 107,
      status: 404
    },
    phoneNumberNotFound: {
      error: 'phone_number_not_found',
      code: 108,
      status: 404
    },
    verificationFailed: {
      error: 'verification_failed',
      code: 109,
      status: 400
    },
    notVerified: {
      error: 'user_not_verified',
      code: 110,
      status: 403
    },
    oldPasswordIncorrect: {
      error: 'old_password_incorrect',
      code: 111,
      status: 400
    },
    verificationExpired: {
      error: 'verification_expired',
      code: 112,
      status: 400
    },
    invalidEmail: {
      error: 'invalid_email',
      code: 113,
      status: 400
    }
  },
  missingData: {
    error: 'missing_data',
    code: 114,
    status: 400
  },
    userPackage : {
    //code 190
    notFound : {
        error: 'no such package found',
        code: 190,
        status: 404
    }, update : {
            error: 'unable to update',
            code: 191,
            status: 400
        }
        , create : {
            error: 'unable to create',
            code: 192,
            status: 400
        }
    },
    status : {
        //code 180
        notFound : {
            error: 'no such status found',
            code: 180,
            status: 404
        }, update : {
            error: 'unable to update',
            code: 181,
            status: 400
        }
        , create : {
            error: 'unable to create',
            code: 182,
            status: 400
        }
    },
    extractedData : {
        //code 170
        notFound : {
            error: 'no such extracted Data found',
            code: 170,
            status: 404
        }, update : {
            error: 'unable to update',
            code: 171,
            status: 400
        }
        , create : {
            error: 'unable to create',
            code: 172,
            status: 400
        }
    },
    scrapeRequest :{
        //code 160
        notFound : {
            error: 'no such scraping request found',
            code: 160,
            status: 404
        }, update : {
            error: 'unable to update',
            code: 161,
            status: 400
        }
        , create : {
            error: 'unable to create',
            code: 162,
            status: 400
        },
        types:{
            error: 'unable to get the request types',
            code: 163,
            status: 400
        }
    },
    webScraperConstants:
        {
            //code 150
            notFound : {
                error: 'no such scraping variable found',
                code: 150,
                status: 404
            }, update : {
            error: 'unable to update',
            code: 151,
            status: 400
        }
            , create : {
            error: 'unable to create',
            code: 152,
            status: 400
        }
        }
};
