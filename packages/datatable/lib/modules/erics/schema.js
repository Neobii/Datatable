const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ['guests','members','admin'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['guests','members','admin'],
    onCreate: ({ newDocument, currentUser}) => {
      return new Date();
    }
  },
  lastName: {
    type: String,
    optional: false,
    canRead: ['guests','members','admin'],
    canCreate: ['members','admin'],
    canUpdate: ['members','admin'],
  }
  // userId: {
  //   type: String,
  //   optional: true,
  //   canRead: ['guests'],
  //   resolveAs: {
  //     fieldName: 'user',
  //     type: 'User',
  //     resolver: (movie, args, context) => {
  //       return context.Users.findOne({ _id: movie.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
  //     },
  //     addOriginalField: true
  //   }
  // },
  
};

export default schema;
