import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';

const Home = () => (
  <div>
    <Components.Datatable 
      collectionName="Erics" 
    />
  </div>
);
registerComponent({name:'Home', component:Home});

export default Home;
