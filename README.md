# Mini Project - Student Management

- react-router-dom
- @type/react-router-dom

/login

- auth /authentication
  login
  sign up/ register
  forget password

/admin: layout

/admin/\*
features/admin/dashboard
features/admin/students

CLICK LOGIN

- Call API to login
- Success -> Redirect ADMIN
- Failed -> Show ERROR

authSaga

LOOP

- if logged in, watch LOGOUT
- else watch LOGIN

handle 2 action: LOGIN, LOGOUT

LOGIN

- call login api to get token + user info
- set token to local storage
- redirect to admin page

LOGOUT

- clear token from local storage
- redirect to login page

authSlice
authSaga

### Handle loading / error in redux saga

- RTK + Thunk: provide a way to await action right on component
  --> Handle loading/error on component easily

- RTK + Saga: doesn't have a way to do so
  --> what to do?

imho, my suggestion:

- LOADING: can based on redux store
- ERROR: eliminate the usage as much as you can

Consideration:

- Trigger error toast from saga
- Consider to call API directly on component instead of going thought saga

### Students

Routing
-/admin/students: listing
-/admin/students/add: add new student
-/admin/students/:student: update student

LISTING

- search by name
- filter by city
- sort by name
- sort by mark

student slice state:

- loading
- list
- filter (page:1, limit: 10 ,...)
- pagination

ADD/EDIT

- React hook form v7
- Yup

ROUTING
-admin/students/add: add new student
-admin/students/:studentId: update a student

Student Form
-Mode: Add/ Edit
-initial values
-Values

- name: TextInput
- age: Number
- gender: radio options
- city: select
- mark: Number
- Validations: all required
  - name: at least two words
  - age >= 18
  - gender: male/ female
  - city: required
  - mark: 0 -> 10
- SubmissionL redirect to student list page after submitting successfully
# manage-student-with-redux-saga
