import React from "react";

export const metadata = {
  title: "Capybara Run!",
  description: "2D side-scrolling runner game built with JavaScript and HTML.",
};

const MyGamePage = () => {
  return (
    <main>
      <iframe
        src="/capybara-game/index.html"
        title="Capybara Run!"
        width="100%"
        height="800px"
        style={{ border: "none" }}
      ></iframe>
    </main>
  );
};

export default MyGamePage;
