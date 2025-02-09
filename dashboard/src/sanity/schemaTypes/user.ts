export default {
    name:'user',
    type:'document',
    title:'User',
    fields:[
        {
        name: 'userId',
        type: 'string',
        title: 'UserID',
        },
        {
          name: "image",
          type: "image",
          title: "Profile Image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "createDate",
          title: "Created At",
          type: "datetime",
        },
        {
            name: 'name',
            type: 'string',
            title: 'Name',
          },
          {
            name: 'email',
            type: 'string',
            title: 'Email',
          },
          {
            name: 'password',
            type: 'string',
            title: 'Password',
          },
          
          
    ]
}