# S3 Explorer
This displays the contents of an AWS S3 bucket. To manage this, the following is used:
- **AWS Cognito**, allowing for greater flexibility than keys and IAMs, allowing more than one be used. Without a UI to manage the cognito user-flow however, the flexibility, at this point, is negligible.
- **AWS Lambda**, the S3 sdk is called AWS-side and is used to generate pre-signed download links
- **API Gateway**, we allow Cognito users access to the getway (you can see the flexibility here) which in turn interafaces with lambda
## Setup
### Config Files
In the __/config__ folder, please remove the _.example_ from the 2 config filenames
### S3
In order to access the bucket you must add the following to the ACL config:
```<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```

### Lambda
There is a file __/lambda/index.js__, copy its contents into your lambda instance after you create it, into a file of the same name.
### AWS Cognito
1. Go to AWS Cognito and Click on “Manage your User Pools” and click “Create a User Pool”.
Specify a name for your pool and click “Review Defaults”. Remove password requirements to make life easier
2. Click “Add app client”. Specify a name for your app and __disable the client secret__.
3. Click “Create app client” > “Return to pool details” > “Create pool”. Copy the _Pool Id_ at the top of the page and then click on the apps page. Add the_Pool Id_ and _App client id_ to the __aws.json__ in the config folder.
4. Add a user to your pool, adding _only_ a username and password (all check boxes are disabled). Add these credentials to the __user.json__ config file. The password will automtically change and be set to `bananas` after the first log in. You will have to update the  __user.json__ to reflect this (this unfortunate feature renders the Cognito advantage _negligible_).
### API Gateway
1. Go to API Gateway and create a new API. Select “New API”.
2. On the left, select “Authorizers” and on the top, click “Create” and “Cognito User Pool Authorizer”. Here, select the AWS Cognito pool created above.
3. Go to the “Resources” section on the left. Select the ”Actions” dropdown and create a new GET method.
4. For integration type, choose Lambda. Select the region where your Lambda function exists and type in the name of the Lambda function you created before.
5. click “Method Request”. There, click the edit icon next to “Authorization”. In the dropdown, select your AWS Cognito User Pool.
6.  Select the ”GET” method that you just created in the list and in the dropdown, select “Enable CORS”. In the same “Actions” dropdown, select “Deploy”. Give a deployment stage name and click “Deploy”. Add the API endpoint URL to the __aws.json__ file in the config.
### Install, build & run
You are now ready to try it all out, so go ahead and `npm i && npm start`
### Use
If all the steps have been followed propertly, you can go to http://localhost:3000/*YourBucketName* to see the files
### TODO
Things that I would like to do, to make this tool genuinely useful, are:
- UI for Adding Congito Users, using ReactJS
- Auto upload of lambda script 
- Any other automatable setup steps using the AWS ClI
- Bootstrap / Material UI for the front-end
- Dockerise
### Further Progress
To view further progress on this project, please visit my github page http://v.gd/johnkavanagh where it will be hosted
