
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)


# Keccak based Password Protection for Static Sites

The functions of ```keccak.js ``` can be used to 


## Installation

1. Simply download keccak.js and add it to your static sites directory (or wherever you have your other .js documents stored)  
2. Add ```<script src="yourlocation/keccack.js" ></script>``` to the html document.
## Usage
1. Follow Installation
2. ```(recommended)``` Simply call the function generateSecureURL() using jQuery (see example).

  
OR

2. Use the function in your own .js document.
4. Use the generated URL to navigate to the fitting document.

## Parameters:
```generateSecureURL(option, username, password, goalDocument, baseUrl)```

#### option (```required```): 
Which structure the generated URL should follow.
```javascript
'UPG' = 'baseUrl/hashedUsername/hashedPassword/goalDocument'
'PUG' = 'baseUrl/hashedPassword/hashedUsername/goalDocument'
'PG' = 'baseUrl/hashedPassword/goalDocument'
'UG' = 'baseUrl/hashedUsername/goalDocument'
'U' = 'baseUrl/hashedUsername/' e.g. can be used if static site defaults to index.html
'P' = 'baseUrl/hashedPassword/' e.g. can be used if static site defaults to index.html
```

#### username (```optional, do not use via option and/ or using ''```):
The Username of the User. (e.g. from an input field)

#### password (```optional, do not use via option and/ or using ''```)
The password of the User. (e.g. from an input field)

#### goalDocument (```optional, do not use via option and/ or using ''```)
The Document at the end of the URL (e.g. 'index.html')

#### baseURL (```required```)
The beginning of the URL, such as your domain  
(e.g. ```'https://example.com'``` will turn into ```'https://example.com/hashedUsername/hashedPassword/goalDocument'```)

## Example
#### HTML with jQuery: 
```#TextBoxUsernameID``` and ```#TextBoxPasswordID``` are both Input boxes.  
  
  Call this e.g. onClick of a login button: 
```HTML
result = generateSecureURL("UPG", $("#TextBoxUsernameID").val(), $("#TextBoxPasswordID").val(), "index.html", "yourDomain.com")
        $.ajax({
          url: result,
          type: 'HEAD',
          error: function()
          {
            // On Failure
          },
          success: function()
          {
            window.location.href = result
          }
        });
```



## Author

- [@FKecac](https://www.github.com/FKecac)


## FAQ

#### Do I need to be able to access my hosting services server config?

There is no server configuration needed, so no.

#### Can I dynamically add new Users?

As far as I know, this is not possible. All new "Users" need to be added through the process described above.

