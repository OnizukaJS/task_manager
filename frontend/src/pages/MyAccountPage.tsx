import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  makeStyles,
  Link,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Link as LinkRouterDom } from "react-router-dom";
import ButtonComponent from "../components/buttons/ButtonComponent";
import EmployeeUpdate from "../models/employeeModels/EmployeeUpdate";
import ProfilePicture from "../components/ProfilePicture";
import LoadingComponent from "../components/LoadingComponent";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";
import {
  PersonOutline as SecurityIcon,
  ComputerOutlined as DevicesIcon,
  BusinessCenterOutlined as OrganizationsIcon,
  SettingsOutlined as SettingsIcon,
  VpnKeyOutlined as SignInsIcon,
  WebAssetOutlined as OfficeAppsIcon,
  CreditCardOutlined as SubscriptionsIcon,
  LockOutlined as PasswordIcon,
  EmailOutlined as EmailIcon,
  PhoneOutlined as PhoneIcon,
  ExploreOutlined as LocationIcon,
} from "@mui/icons-material";
import { useWarningSnackbar } from "../hooks/useErrorSnackbar";
import routes from "../config/routes";

const useStyles = makeStyles((theme: Theme) => ({
  closeSession: {
    position: "absolute",
    right: theme.spacing(1),
  },
  containerEmployeeDetails: {
    position: "relative",
    top: "-2rem",
  },
  containerInfos: {
    display: "flex",
  },
  containerMyAccount: {
    maxWidth: "720px",
    padding: "80px 24px 24px 24px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentMyAccount: {},
  containerMyAccountInfo: {
    backgroundColor: "white",
    margin: theme.spacing(1),
    flex: 1,
    boxShadow:
      "rgb(0 0 0 / 13%) 0px 5.6px 9.6px 0px, rgb(0 0 0 / 11%) 0px 0.3px 0.9px 0px",
  },
  containerMyAccountPage: {
    backgroundColor: "#f8f8f8",
    height: "100%",
    overflow: "auto",
  },
  containerOfficeSubscriptionInfo: {},
  containerPasswordOrganizationsInfo: {},
  containerProfilePicForm: {
    padding: "0 24px",
  },
  containerSecurityDevicesInfo: {
    flexDirection: "column",
    flex: 1,
    margin: "0 8px",
  },
  containerSettingsMySignInsInfo: {},
  containerSignOut: {
    padding: "0 24px",
  },
  descriptions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(7),
  },
  devicesInfo: {
    margin: "8px 0!important",
  },
  employeeJob: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  employeeName: {
    fontSize: "28px",
    marginBottom: theme.spacing(1),
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  icons: {
    fontSize: "60px!important",
    color: "#3c3c3c",
  },
  iconsEmployeeDetails: {
    marginRight: theme.spacing(1),
  },
  links: {
    color: "#0078d4",
    fontWeight: 600,
    marginTop: theme.spacing(2),
    cursor: "pointer",
  },
  Name: {
    display: "flex",
    alignItems: "center",
  },
  maxWidth: {
    width: "100%",
  },
  myAccountCards: {
    backgroundColor: "white",
    flex: 1,
    margin: theme.spacing(1),
    minHeight: "320px",
    boxShadow:
      "rgb(0 0 0 / 13%) 0px 5.6px 9.6px 0px, rgb(0 0 0 / 11%) 0px 0.3px 0.9px 0px",
    padding: "32px 16px",
    textAlign: "center",
  },
  myAccountDetails: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  myAccountInfo: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  MyAccountSecurityDevicesInfo: {
    display: "flex",
  },
  mySignInsInfo: {},
  nameAndSurname: {
    width: "100%",
  },
  officeAppsInfo: {},
  organizationsInfo: {},
  passwordInfo: {},
  profilePicture: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    top: "-3.5rem",
  },
  securityInfo: {
    margin: "8px 0",
  },
  separationLine: {
    border: "1px solid",
  },
  settingsInfo: {},
  signOut: {
    color: "#0078d4",
    cursor: "pointer",
    margin: "12px 0 24px 0",
  },
  subscriptionsInfo: {},
  titleSection: {
    fontSize: "28px",
    marginBottom: theme.spacing(1),
  },
}));

const MyAccountCard = withStyles({})(Box);

interface MyAccountPageProps {
  triggerRefresh: () => void;
  refreshState: number;
  employeeId: string;
}

const MyAccountPage = ({
  triggerRefresh,
  refreshState,
  employeeId,
}: MyAccountPageProps) => {
  const classes = useStyles();
  const { showMessage: showWarningMessage } = useWarningSnackbar();

  const [employee, setEmployee] = useState<EmployeeUpdate>();

  const [employeeData, isLoading] = useFetchEmployeeData(
    employeeId,
    refreshState
  );

  useEffect(() => {
    setEmployee({
      ...setEmployee,
      email: employeeData?.email,
      password: employeeData?.password,
      employeeName: employeeData?.employeeName,
      employeeSurname: employeeData?.employeeSurname,
      employeeAge: employeeData?.employeeAge,
      city: employeeData?.city,
    });
  }, [employeeData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();

    fetch(`https://localhost:44358/api/Employees/${employeeData?.employeeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: employee?.email,
        password: employee?.password,
        employeeName: employee?.employeeName,
        employeeSurname: employee?.employeeSurname,
        jobDescription: employee?.jobDescription,
        phoneNumber: employee?.phoneNumber,
        employeeAge: employee?.employeeAge,
        city: employee?.city,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("employee updated" + data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while updating employee"));
  };

  const handleDoesNothing = () => {
    showWarningMessage({ message: "This button does nothing! :)" });
  };

  // return isLoading ? (
  //   <LoadingComponent />
  // ) : (
  return (
    <Box className={classes.containerMyAccountPage}>
      <Box className={classes.containerMyAccount}>
        <Box className={classes.contentMyAccount}>
          <Box className={classes.MyAccountSecurityDevicesInfo}>
            <Box className={classes.containerMyAccountInfo}>
              <MyAccountCard className={classes.myAccountInfo}>
                <Box className={classes.containerProfilePicForm}>
                  <Box className={classes.profilePicture}>
                    <ProfilePicture
                      name={employeeData?.employeeName!}
                      surname={employeeData?.employeeSurname!}
                      height={100}
                      width={100}
                      fontSize={35}
                      border="6px solid white"
                      boxShadow="0px 0px 8px rgb(0 0 0 / 40%)"
                    />
                  </Box>

                  <Box className={classes.containerEmployeeDetails}>
                    <Typography className={classes.employeeName}>
                      {employeeData?.employeeName}{" "}
                      {employeeData?.employeeSurname}
                    </Typography>

                    <Box className={classes.employeeJob}>
                      <Typography>{employeeData?.jobDescription}</Typography>
                    </Box>

                    <Box className={classes.myAccountDetails}>
                      <EmailIcon className={classes.iconsEmployeeDetails} />
                      <Typography>{employeeData?.email}</Typography>
                    </Box>

                    <Box className={classes.myAccountDetails}>
                      <PhoneIcon className={classes.iconsEmployeeDetails} />

                      <Typography>{employeeData?.phoneNumber}</Typography>
                    </Box>

                    <Box className={classes.myAccountDetails}>
                      <LocationIcon className={classes.iconsEmployeeDetails} />
                      <Typography>{employeeData?.city}</Typography>
                    </Box>
                  </Box>

                  <Divider />
                  {/* <form
                    onSubmit={handleSubmit}
                    className={classes.formContainer}
                  >
                    <Box className={classes.Name}>
                      <Box className={classes.nameAndSurname}>
                        <TextField
                          defaultValue={employeeData?.employeeName}
                          name="employeeName"
                          placeholder="Employee Name"
                          onChange={handleChange}
                          className={classes.maxWidth}
                        />
                        <br />
                        <br />
                        <TextField
                          defaultValue={employeeData?.employeeSurname}
                          name="employeeSurname"
                          placeholder="Employee Surname"
                          onChange={handleChange}
                          className={classes.maxWidth}
                        />
                      </Box>
                    </Box>
                    <br />
                    <TextField
                      defaultValue={employeeData?.email}
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      defaultValue={employeeData?.employeeAge}
                      name="employeeAge"
                      placeholder="Age"
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      defaultValue={employeeData?.city}
                      name="city"
                      placeholder="City"
                      onChange={handleChange}
                    />
                    <br />
                    <br />
                    <ButtonComponent
                      type="submit"
                      color="primary"
                      text="Update Profile"
                      variant="contained"
                    />
                  </form> */}
                </Box>

                <Box className={classes.containerSignOut}>
                  <Divider />
                  <Typography className={classes.signOut}>
                    Sign out everywhere
                  </Typography>
                </Box>
              </MyAccountCard>
            </Box>

            <Box
              className={`${classes.containerInfos} ${classes.containerSecurityDevicesInfo}`}
            >
              <MyAccountCard
                className={`${classes.myAccountCards} ${classes.securityInfo}`}
              >
                <Typography className={classes.titleSection}>
                  Security Info
                </Typography>

                <SecurityIcon className={classes.icons} />

                <Typography className={classes.descriptions}>
                  Keep your verification methods and security info up to date.
                </Typography>

                <Link
                  className={classes.links}
                  underline="hover"
                  onClick={handleDoesNothing}
                >{`UPDATE INFO >`}</Link>
              </MyAccountCard>

              <MyAccountCard
                className={`${classes.myAccountCards} ${classes.devicesInfo}`}
              >
                <Typography className={classes.titleSection}>
                  Devices
                </Typography>

                <DevicesIcon className={classes.icons} />

                <Typography className={classes.descriptions}>
                  Disable a lost device and review your connected devices.
                </Typography>

                <Link
                  className={classes.links}
                  underline="hover"
                  onClick={handleDoesNothing}
                >{`MANAGE DEVICES >`}</Link>
              </MyAccountCard>
            </Box>
          </Box>

          <Box
            className={`${classes.containerInfos} ${classes.containerPasswordOrganizationsInfo}`}
          >
            <MyAccountCard
              className={`${classes.myAccountCards} ${classes.passwordInfo}`}
            >
              <Typography className={classes.titleSection}>Password</Typography>

              <PasswordIcon className={classes.icons} />

              <Typography className={classes.descriptions}>
                Make your password stronger, or change it if someone else knows
                it.
              </Typography>

              <LinkRouterDom
                to={routes.updatePassword}
                className={classes.links}
              >
                {`CHANGE PASSWORD >`}
              </LinkRouterDom>
            </MyAccountCard>

            <MyAccountCard
              className={`${classes.myAccountCards} ${classes.organizationsInfo}`}
            >
              <Typography className={classes.titleSection}>
                Organizations
              </Typography>

              <OrganizationsIcon className={classes.icons} />

              <Typography className={classes.descriptions}>
                See all the organizations that you're a part of.
              </Typography>

              <Link
                className={classes.links}
                underline="hover"
                onClick={handleDoesNothing}
              >{`MANAGE ORGANIZATIONS >`}</Link>
            </MyAccountCard>
          </Box>

          <Box
            className={`${classes.containerInfos} ${classes.containerSettingsMySignInsInfo}`}
          >
            <MyAccountCard
              className={`${classes.myAccountCards} ${classes.settingsInfo}`}
            >
              <Typography className={classes.titleSection}>
                Settings & Privacy
              </Typography>

              <SettingsIcon className={classes.icons} />

              <Typography className={classes.descriptions}>
                Personalize your account settings and see how your data is used.
              </Typography>

              <Link
                className={classes.links}
                underline="hover"
                onClick={handleDoesNothing}
              >{`VIEW SETTINGS AND PRIVACY >`}</Link>
            </MyAccountCard>
            <MyAccountCard
              className={`${classes.myAccountCards} ${classes.mySignInsInfo}`}
            >
              <Typography className={classes.titleSection}>
                My Sign-Ins
              </Typography>

              <SignInsIcon className={classes.icons} />

              <Typography className={classes.descriptions}>
                See when and where you’ve signed in and check if anything looks
                unusual.
              </Typography>

              <Link
                className={classes.links}
                underline="hover"
                onClick={handleDoesNothing}
              >{`REVIEW RECENT ACTIVITY >`}</Link>
            </MyAccountCard>
          </Box>

          <Box
            className={`${classes.containerInfos} ${classes.containerOfficeSubscriptionInfo}`}
          >
            <MyAccountCard
              className={`${classes.myAccountCards} ${classes.officeAppsInfo}`}
            >
              <Typography className={classes.titleSection}>
                Offices Apps
              </Typography>

              <OfficeAppsIcon className={classes.icons} />

              <Typography className={classes.descriptions}>
                Install and manage Office applications
              </Typography>

              <Link
                className={classes.links}
                underline="hover"
                onClick={handleDoesNothing}
              >{`MANAGE >`}</Link>
            </MyAccountCard>
            <MyAccountCard
              className={`${classes.myAccountCards} ${classes.subscriptionsInfo}`}
            >
              <Typography className={classes.titleSection}>
                Subscriptions
              </Typography>

              <SubscriptionsIcon className={classes.icons} />

              <Typography className={classes.descriptions}>
                Licenses assigned to you
              </Typography>

              <Link
                className={classes.links}
                underline="hover"
                onClick={handleDoesNothing}
              >{`VIEW >`}</Link>
            </MyAccountCard>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyAccountPage;
