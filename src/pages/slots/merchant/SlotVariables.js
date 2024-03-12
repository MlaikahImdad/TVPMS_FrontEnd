import { readImg, beautifyDate } from "src/utils/Utils";
import {UserAvatar} from "src/components/Component";

export const variables = {
    name: "Slot",
    id: "slotId",
    searchableColumns: ["slotId","machineCode","slotNo","productId","productCode","productName"],
    actions: false,
    create: {
      slotId: 6,
      machineCode: "",
      slotNo: 0,
      productId: 0,
      productCode: "",
      productName: "",
      descriptipn: "",
      productImage: "",
      capacity: 0,
      salePrice: 0,
      totalRefillCount: 0,
      totalProducttransactionCount: 0,
    },
    
    api: {
        index: "/ProductSlot/GetMachineSlots/{Machineid}",
        create: "/productCatalog",
        update: "/ProductSlot/UpdateSlot",
        show: "/productCatalog/{id}",
        delete: "/productCatalog/{id}",
        machines: "/Machine",
        products: "/ProductSlot",
        refill: "/ProductSlot/MachineSlotfill",
        activateSlot: "/ProductSlot/ActivateSlot",
    },
    columns: [
        {
          name: "#",
          selector: (row) => row.slotNo,
          minWidth: "45px",
          maxWidth: "55px"
        },
        {
          name: "Product",
          selector: (row) => row.productName,
          minWidth: "180px",
          cell: (row) => (
            
            <div className="user-card mt-2 mb-2">
    
              {row.productImage &&
                <UserAvatar theme="primary" width="40px" height="40px" text={row.name} image={readImg(row.productImage)}></UserAvatar>
              }
                  
                <div className="user-info">
                  <span>
                    {row.productName ? row.productCode + ": " + row.productName :"No Product"}
                  </span>
                </div>
            </div>
          )
        },
        {
          name: "Sale Price",
          selector: (row) => "Rs. " + row.salePrice,
          maxWidth: "30px",
          style: {
            color: "green"
          },
          cell: (row) => (
            <b>{"Rs. " + row.salePrice}</b>
          )
        },
        {
          name: "Capacity",
          selector: (row) => row.capacity,
          maxWidth: "30px",
          cell: (row) => (
            <b>{row.capacity}</b>
          )
        },
        
      ]

}