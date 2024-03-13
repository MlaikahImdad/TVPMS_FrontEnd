
export const variables = {
    name: "User",
    id: "id",
    searchableColumns: ["name","email","phoneNo"],
    actions: false,
    create: {
      name: "",
      email: "",
      password: "",
      role: ""
    },
    
    api: {
        index: "/users",
        create: "/users",
        update: "/users",
        show: "/users/{id}",
        delete: "/users/{id}"
    },
    columns: [
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
        },
        {
          name: "Email",
          selector: (row) => row.email,
          sortable: true,
        },
        {
          name: "Phone Number",
          selector: (row) => row.phoneNumber,
          sortable: true,
        },
        
      ]

}