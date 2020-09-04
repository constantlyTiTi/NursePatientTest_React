import React from 'react';

const defaultVal = {nurseSharedId:"",
patient:{},
test:{},
setNurseContext:()=>{}};
export const NurseContext = React.createContext(defaultVal);