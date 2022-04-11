const routes = {
  loginPage: "/",
  registrationPage: "/registration",
  tasksList: "/task",
  createTask: "task/create",
  editTask: (id: string): string => `task/${id}/edit`,
  myAccount: "/my-account",
  updatePassword: "/my-account/update-password",
};

export default routes;
