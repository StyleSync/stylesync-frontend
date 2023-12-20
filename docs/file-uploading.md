# File uploading

To upload a file you should use official Vercel Blob client uploads docs,
you can find it [here](https://vercel.com/docs/storage/vercel-blob/quickstart#create-a-client-upload-page).

For testing locally you should use [ngrok](https://ngrok.com/) as onUploadCompleted won't trigger in localhost.

After getting ngrok url set it to `NEXTAUTH_URL` enviroment variable
also you need to add ngrok url to Auth0 Allowed Callback URLs and Allowed Logout URLs.

> There is a possibility for upload to work without using steps above, if we don't expect anything in onUploadCompleted
> then we can use localhost.
