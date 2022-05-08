import React, { useEffect, useState } from "react";
import UserDashboard from "../../Components/UserDashboard";
import { Tabs } from "antd";
import CreateImport from "./CreateImport";
import ConfirmedImport from "./ConfirmedImport";
import PendingImport from "./PendingImport";
const { TabPane } = Tabs;
const Import = () => {
  const [tabkey, setTabkey] = useState("1");
  const [reload, setReload] = useState(false);

  const handleChangeTab = (tab, makeReload) => {
    setTabkey(tab);
    if (makeReload) {
      console.log("makeReload", makeReload);
      setReload(!reload);
    }
  };

  return (
    <UserDashboard>
      <div>
        <Tabs
          centered={true}
          defaultActiveKey={tabkey}
          onChange={handleChangeTab}
          activeKey={tabkey}
        >
          <TabPane
            reload={reload}
            forceRender
            tab="Confirmed Reservations"
            key="1"
          >
            <ConfirmedImport />
          </TabPane>
          <TabPane forceRender tab="Pending Reservations" key="2">
            <PendingImport reload={reload} />
          </TabPane>
          <TabPane forceRender tab="Create New Reservation" key="3">
            <CreateImport handleChangeTab={handleChangeTab} />
          </TabPane>
        </Tabs>
      </div>
    </UserDashboard>
  );
};

export default Import;
