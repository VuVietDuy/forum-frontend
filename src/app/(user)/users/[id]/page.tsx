import React from "react";

export default function page() {
  return (
    <div className="p-6">
      <div className="flex">
        <img className="w-32 h-32 rounded-xl mr-3" src="" alt="" />
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-medium mb-2">Vũ Viết Duy</h2>
          <div>
            <span>Member for 10 months</span>
            <span>Last seen this week</span>
            <span>Visited 78 days, 1 consecutive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
