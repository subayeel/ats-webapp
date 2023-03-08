import React, { useState } from "react";
import { Tabs, TabsNav } from "../Jobs.elements";
import { MainContainer } from "../../../../Global";
const ProfileTabs = ({ selectedTab }) => {
  const [activeTab, setActiveTab] = useState("applicationForm");
  //applicationForm,resume,comments,feedBacks,timeline,attachments
  return (
    <Tabs>
      {/* Tab nav */}
      <TabsNav>
        <li
          onClick={() => setActiveTab("applicationForm")}
          className={activeTab === "applicationForm" ? "active" : ""}
        >
          Application Form
        </li>
        <li
          onClick={() => setActiveTab("resume")}
          className={activeTab === "resume" ? "active" : ""}
        >
          Resume
        </li>
        <li
          onClick={() => setActiveTab("comments")}
          className={activeTab === "comments" ? "active" : ""}
        >
          Comments
        </li>
        <li
          onClick={() => setActiveTab("feedBacks")}
          className={activeTab === "feedBacks" ? "active" : ""}
        >
          FeedBacks
        </li>
        <li
          onClick={() => setActiveTab("timeline")}
          className={activeTab === "timeline" ? "active" : ""}
        >
          Timeline
        </li>
        <li
          onClick={() => setActiveTab("attachments")}
          className={activeTab === "attachments" ? "active" : ""}
        >
          Attachments
        </li>
      </TabsNav>
      <TabContent activeTab={activeTab} id="applicationForm">
        applicationForm
      </TabContent>
      <TabContent activeTab={activeTab} id="resume">
        resume
      </TabContent>
      <TabContent activeTab={activeTab} id="comments">
        comments
      </TabContent>
      <TabContent activeTab={activeTab} id="feedBacks">
        feedBacks
      </TabContent>
      <TabContent activeTab={activeTab} id="timeline">
        timeline
      </TabContent>
      <TabContent activeTab={activeTab} id="attachments">
        attachments
      </TabContent>
    </Tabs>
  );
};

function TabContent({ id, activeTab, children }) {
  return activeTab === id ? <MainContainer>{children}</MainContainer> : null;
}
export default ProfileTabs;
