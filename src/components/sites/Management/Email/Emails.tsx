import React from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import { Iemail } from "../../../../Interfaces/contact";
import CellRenderer from "./CellRenderer";

type EmailsProps = {
    emails: Iemail[];
}

const Emails: React.FC<EmailsProps> = ({ emails }) => {
    return (
        <div className="relative ag-theme-alpine w-[19rem] h-[50rem] pt-24 ml-[5rem] md:w-[50rem] md:ml-[30rem]">
            <AgGridReact
                rowData={emails}
                modules={AllCommunityModules}
                defaultColDef={{
                    flex: 1,
                    editable: false,
                    sortable: true,
                    filter: true,
                }}
                columnDefs={[
                    { field: "title" },
                    { field: "name" },
                    { field: "email", headerName: "Email Address" },
                    { headerName: "", filter: false, sortable: false, editable: false, cellRenderer: CellRenderer }
                ]}
                rowHeight={72}
                headerHeight={42}
            >
            </AgGridReact>
        </div>
    )
}

export default Emails;
