import React from 'react'
import {useState} from 'react';
import style from '../Register/LoginReg.module.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from './Login';
import SignUp from './SignUp';

const LoginReg = () => {

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={style.container}>
    <Box sx={{ width: '43%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
        className={style.tableLoginReg}  >
          <Tab className={style.tableLoginRegtab} label="LOGIN" {...a11yProps(0)} />
          <Tab  className={style.tableLoginRegtab} label="SIGNUP" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className={style.login}>
       <Login/>
       </div>
      </CustomTabPanel>
      <CustomTabPanel className={style.check} value={value} index={1}>
      <div className={style.signin}>
      <SignUp/>
      </div>
      </CustomTabPanel>
   

    </Box>

    </div>
  );
}



export default LoginReg