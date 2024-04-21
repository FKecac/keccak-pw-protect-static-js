
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)


# Keccak based Password + Username Protection for Static Sites

The functions of ```keccak.js ``` can be used to create Password + Username Protected Static Sites, such as e.g. Github Pages/ Ionos Deploy Now sites where e.g. .htaccess might not be an option, especially if you cannot access any server configs.


## **Important Pre-Usage Info**
**1. This does not hide any data if directory listing is activated.**  
**2. The Password and/ Username will be visible in the Website-Visitors History.**  
**3. Certain browser versions ( such as e.g. pre-Mozilla69, see [CVE-2019-11730 URIs SOP Bypass](https://bugzilla.mozilla.org/show_bug.cgi?id=1558299&_gl=1*o0kxm2*_ga*MTkwODQzMjgwMS4xNzEzNjIzMzMw*_ga_MQ7767QQQW*MTcxMzcyNTUzMS4xLjEuMTcxMzcyNTg0NS4wLjAuMA..) ) may leak other files in the same directory, allowing an effective bypass.**
**4. It is theoretically bruteforceable by creating a bot that checks every url combination.**
## Installation

1. Simply download keccak.js and add it to your static sites directory (or wherever you have your other .js documents stored)  
2. Add ```<script src="yourlocation/keccack.js" ></script>``` to the html document.
## Usage
1. Follow Installation
2. Create Uername/ Password folder structures (see below under ```'Add Users'```)
3. ```(recommended)``` Simply call the function generateSecureURL() using jQuery (see example).

OR

3. Use the function in your own .js document.
4. e.g. Use the generated URL to navigate to the fitting document/ URL.

## Add Users
#### Example:
To generate a User with the Username ```'Test'``` and the Password ```'cat1234'```:  
1. Use the function ```generateSecureURL('UP', 'Test', 'cat1234', '', 'https://test.com')```
2. Check the developer console: (e.g. "Generated URL: https://test.com/3f0b699d/9058ae25e052bd/") The last part will be your folder structure. Username Hash: ```'3f0b699d'``` Password Hash: ```'9058ae25e052bd'```  
3. Add the folders in the correct structure  
(```Depending on the option you will use, in this case the structure is 'UP' or 'UPG'```):
```
- login.html             <-- whatever your html document with e.g. the login form is called
- keccak.js              <-- example location
- 3f0b699d               <-- folder, the hash of your username               
- | 9058ae25e052bd       <-- folder, the hash of your Password
- | | index.html         <-- e.g. the now protected index.html
```

## Parameters:
```generateSecureURL(option, username, password, goalDocument, baseUrl)```

#### option (```required```): 
Which structure the generated URL should follow.  
U - stands for username, P - stands for password, G - stands for goalDocument
```javascript
'UPG' = 'baseUrl/hashedUsername/hashedPassword/goalDocument'
'PUG' = 'baseUrl/hashedPassword/hashedUsername/goalDocument'
'UP' = 'baseUrl/hashedUsername/hashedPassword/'
'PU' = 'baseUrl/hashedPassword/hashedUsername/'
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

