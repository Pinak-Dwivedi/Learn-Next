"use client";

export default function AComponent(props) {
  // console.log("AComponent");
  return (
    <div className="aComponent">
      {/* A Component is acting as a provider! */}
      {props.children}
    </div>
  );
}
