- Have AWS account
- Search Identity and Access Management (IAM) and create new user with "Programmatic access" and click "Attach existing policies directly" and checkbox "AdministratorAccess" to give serverless full access
- npm install -g serverless 
- set up credentials to connect to your AWS account
  sls config credentials --provider aws --key [your Access key ID] --secret [your 
Secret access key] --profile [your profile name's choice]
also edit your profile name you just gave on line 10 in serverless.yml