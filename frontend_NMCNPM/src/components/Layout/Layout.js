import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link,Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// home
import HomePage from "../../pages/homepage/home";
// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import TaoNhanKhau from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import CapNhatNhanKhau from "../../pages/sua-nhan-khau";
import EditOne from "../../pages/sua-nhan-khau/subs/sua-nhan-khau";
import TaoKhoanDongGop from "../../pages/dong-gop/tao/index";
import DanhSachKhoanDong from "../../pages/dong-gop/danhsach/danhsach";
import CapNhatKhoanDong from "../../pages/dong-gop/capnhat/capnhat";
import TaoHoKhau from "../../pages/ho-khau/tao";
import DanhSachHoKhau from "../../pages/ho-khau/cap-nhat";
import UpdateOneHoKHau from "../../pages/ho-khau/cap-nhat/subs";
// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();
  const url=useHistory()
  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <div style={{marginBottom:15}}><Button onClick={()=>{
              url.goBack()
            }} variant="contained" color="primary" >Back</Button></div>
            <Switch>
              <Route path="/app/dashboard" component={HomePage} />
  
              {/* <Route path="/app/tables" component={Tables} /> */}
              <Route path="/app/notifications" component={Notifications} />
              
              <Route path="/app/create-nk" component={TaoNhanKhau} />
             
              <Route exact path="/app/edit-nk" component={CapNhatNhanKhau} />
              <Route exact path="/app/edit-nk/:ID" component={EditOne} />
              <Route exact path="/app/create-hk" component={TaoHoKhau}/>
              <Route exact path="/app/create-kdg" component={TaoKhoanDongGop}/>
              <Route exact path="/app/table-kdg" component={DanhSachKhoanDong}/>
              <Route exact path="/app/edit-kdg/:ID" component={CapNhatKhoanDong} />
              <Route exact path="/app/edit-hk" component={DanhSachHoKhau}/>
              <Route exact path="/app/edit-hk/:ID" component={UpdateOneHoKHau}/>
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
