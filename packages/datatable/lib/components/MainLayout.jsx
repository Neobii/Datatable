import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';

const MainLayout = ({children}) => (
  <div>
    <h1>TestCase for datatable</h1>
    <Components.AccountsLoginForm />
      {children}
  </div>
);
registerComponent({name:'MainLayout', component:MainLayout});

export default MainLayout;
