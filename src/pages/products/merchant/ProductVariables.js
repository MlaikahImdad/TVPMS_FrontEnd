import { readImg, NoImage } from "src/utils/Utils";
import {UserAvatar} from "src/components/Component";

export const variables = {
    name: "Product",
    id: "id",
    searchableColumns: ["name","productCode","productBarCode","description","category"],
    actions: false,
    create: {
        productCode:"",
        productBarCode:"",
        name:"",
        description:"",
        category:"",
        productImage:"",    
        newDescription:""
    },
    
    api: {
        index: "/ProductSlot",
        create: "/ProductSlot",
        update: "/ProductSlot",
        show: "/productCatalog/{id}",
        delete: "/ProductSlot/{id}",
        productCatalog: "/productCatalog"
    },
    columns: [
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
          cell: (row) => (
            <div className="user-card mt-2 mb-2">
    
              
              <UserAvatar theme="primary" width="40px" height="40px" text={row.name} image={row.productImage? readImg(row.productImage):NoImage}></UserAvatar>
                
              <div className="user-info">
                <span className="tb-lead">
                  {row.name}
                </span>
              </div>
            </div>
          )
        },
        {
          name: "Code",
          selector: (row) => row.productCode,
          sortable: true,
        },
        {
          name: 'Display Name',
          selector: (row) => row.newDescription
        },
        {
          name: "Bar Code",
          selector: (row) => row.productBarCode,
          sortable: true,
        },
        {
          name: "Category",
          selector: (row) => row.category,
          sortable: true,
        }
      ]

}