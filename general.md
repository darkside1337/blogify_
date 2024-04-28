### Frontend:

- **React**
- **Tailwind CSS**
- **DaisyUI**
- **React Hot Toast**
- **Formik** + **Yup** for data validation
- **React Quill** for creating posts
- **Axios**

---

### Backend:

- **Express**
- **Nodemon**
- **dotenv**
- **Joi** (mentioned in TRY JOI)

---

### Routes

#### Homepage

- `GET /`

#### Posts

- `GET /posts` - Get all posts
- `GET /posts/:postID` - Get a specific post
- `POST /posts/:postID/comments` - Create a new comment for a specific post
- `DELETE /posts/:postID/comments/:commentID` - Delete a comment from a specific post

#### Authentication

- `POST /auth/signup` - User signup
- `POST /auth/login` - User login

#### Admin

- `GET /admin/dashboard` - View all posts (admin dashboard)
- `POST /admin/posts` - Create a new post
- `GET /admin/posts/:postID` - View a specific post
- `PUT /admin/posts/:postID` - Update a specific post
- `DELETE /admin/posts/:postID` - Delete a specific post
