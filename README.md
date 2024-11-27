
# MyBlogApp
- This Project is using react-router-dom (V6)-React and Tailwind as frontend , ExpressJs as backend and Mongodb as database 



- In this app, users must log in to create, update, or delete posts, otherwise viewing posts is only accessible to everyone. The login session lasts for one hour, after which users are automatically logged out. The app includes robust error handling on every page to enhance the user experience.


## Deployment

To use this project run on browser

```bash
  https://myblogapp-oq3r.onrender.com/
```

or

To run frontend only
```bash
  cd frontend_react
```
```bash
  npm run dev
```

and

To run backend only
```bash
  cd backend-v2
```
```bash
  npm start
```

## Before Login

- there is no create page
  
![beforeLogin_HomePage](https://github.com/user-attachments/assets/204ad523-006a-4f01-9413-39245691982c)

- update and delete is not available
  
![beforeLogin_DetailPage1](https://github.com/user-attachments/assets/4c5745a0-34ba-4be9-87a8-27b6722708f1)

![loginRegister](https://github.com/user-attachments/assets/250d534b-31bf-4eb3-97c2-978a34a02e77)

## Login Session lasts for one hour

- Login Session lasts for one hour, after that users are automatically logged out.
  
![afterLogin_SaveTime](https://github.com/user-attachments/assets/41b67e95-31a9-4d24-9f5c-41f4134b7e12)

## After Login
![afterLogin_HomePage](https://github.com/user-attachments/assets/6127d30f-628c-4685-bda4-3b4fe3eab3c0)

![createPost](https://github.com/user-attachments/assets/ba6ce68d-af81-4824-9f25-79694687bbda)

![afterLogin_DetailPage](https://github.com/user-attachments/assets/758dd6ae-c2de-4986-9ee3-7be6c6d51ed5)

![afterLogin_UpdatePage](https://github.com/user-attachments/assets/98ceb0c1-8601-48be-a058-0ead42ecc910)

![afterLogin_DeletePost](https://github.com/user-attachments/assets/e6dc08e8-0761-4508-bb18-60473816400d)

## ErrorPage
![ErrorPage](https://github.com/user-attachments/assets/1f1c9bdd-d43e-44f4-8b66-09854b0e800b)
