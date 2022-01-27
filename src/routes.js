import DashboardMain from "./components/pages/ClientDashboard/DashboardMain";

export default {
    // Roots
    home:"/",
    Signup_Login:"/SignupLogin",
    AdminSignup:"/SignupLogin/Adminsignup",
    dashboard:"/Dashboard",
    ContactUs:"/SignupLogin/ContactUs",
    //login:"SignupLogin/login",
    


    // Nested Dashboard pages
    //client routing
    Schedule:"/Dashboard/Schedule",
    Update:"/Dashboard/Update",
    View: "/Dashboard/ViewReports",
    updateprofile: "/Dashboard/Updateprofile",

    //Admin routing
    main:"/AdminDash",
    AdminUpdate:"/AdminDash/UpdateReport",
    Report:"/Admin/report",
    UpdateRequest:"/AdminDash/updateAss"
   

    
  };