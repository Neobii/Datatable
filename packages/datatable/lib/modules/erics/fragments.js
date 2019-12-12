import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment EricsFragment on Eric {
     _id
     createdAt
     lastName
   }
`);
