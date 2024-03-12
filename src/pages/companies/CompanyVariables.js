
export const variables = {
    name: "Company",
    id: "companyId",
    searchableColumns: ["name","focalPersonDetaills","phoneNumber","websiteUrl"],
    actions: false,
    create: {
        name:"",
        address:"",
        websiteUrl:"",
        phoneNumber:"",
        focalPersonDetaills:"",    
        otherInformation:"",
        location: ""
    },
    
    api: {
        index: "/company",
        create: "/company",
        update: "/company/{id}",
        show: "/company/{id}",
        delete: "/company/{id}"
    },
    columns: [
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
          
        },
        {
          name: "Contact Number",
          selector: (row) => row.phoneNumber,
          sortable: true,
        },
        {
          name: "Focal Person",
          selector: (row) => row.focalPersonDetaills,
          sortable: true,
        },
        {
          name: "Website",
          selector: (row) => row.websiteUrl,
          sortable: true,
        },
      ]

}