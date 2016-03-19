Instructions

The video app looks for variables in the URL. The app will parse the URL and look for specific variables. 

The three variables are the following:

First Name:  fname=
Last Name: lname =
Year: year=

An example URL would be the following:
http://storagecode.com/chiefs/renewal/?fname=john&lname=doe&year=2011

Produces the following variables:
john doe 2011.

This is done in the 'js/jv/screens/welcome.js' file. It then dispatches the varaible to 'js/jv/userVariables.js'. 




What needs to be done / checked:

1. Add two META tags for Facebook. OG:URL and edit the OG:image path to new server.
2. For the users who are season ticket holders, the link will need to be dynamically created with data from the server. 
3. Depending on how you host this, you may have to change the share URL on line 305 in the 'main.js' file. shareURL variable currently pulls the CURRENT URL (which may be the private site). It needs to be changed to the new public page once moved over. 