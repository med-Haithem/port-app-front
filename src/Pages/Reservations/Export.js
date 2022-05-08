import React, { useState } from "react";
import UserDashboard from "../../Components/UserDashboard";
import { Tabs } from "antd";
import CreateExport from "./CreateExport";
import PendingExport from "./PendingExport";
import ConfirmedExport from "./ConfirmedExport";

const { TabPane } = Tabs;
const Export = () => {
  const [tabkey, setTabkey] = useState("1");
  const [reload, setReload] = useState(false);

  const handleChangeTab = (tab, makeReload) => {
    setTabkey(tab);
    if (makeReload) {
      setReload(!reload);
    }
  };

  return (
    <UserDashboard>
      <div>
        <Tabs centered activeKey={tabkey} onChange={handleChangeTab}>
          <TabPane forceRender tab="Confirmed Reservations" key="1">
            <ConfirmedExport />
          </TabPane>
          <TabPane forceRender tab="Pending Reservations" key="2">
            <PendingExport reload={reload} />
          </TabPane>
          <TabPane forceRender tab="Create New Reservation" key="3">
            <CreateExport handleChangeTab={handleChangeTab} />
          </TabPane>
        </Tabs>
      </div>
    </UserDashboard>
  );
};

export default Export;
